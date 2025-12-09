import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import axios from 'axios'
import { CalendarDays } from "lucide-react";
import { format } from 'date-fns';
import Navbar from '../Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from 'react-router';

import { Navigation } from 'swiper/modules';
const BlogPost = () => {
  const navigate = useNavigate();

  const url = import.meta.env.VITE_SERVER;
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title || '');
  const [data, setData] = useState([])
  
  const [post, setPost] = useState({ title: 'Loading...', discription: 'Loading...', author:'', image: 'Loading...', content: 'Loading...' });

  const getdata = (title) => {
    if (!title) return;
    axios.post(`${url}/Tblog`, { title })
      .then((res) => {
        if (res.data.post) {
          setPost(res.data.post);
        } else {
          setPost({ title: "Post not found", content: "Sorry, this blog post doesn't exist." });
        }
      })
      .catch((err) => {
        console.log(err);
        setPost({ title: "Error loading post", content: "Something went wrong." });
      });
  };
  const getdata2 = async () => {
    try {
      const res = await axios.get(`${url}/blog`);
      console.log("All blogs response:", res.data); // Check this!

      // Safe extraction
      setData(res.data.posts || res.data.post || res.data.data || res.data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setData([]);
    }
  };
  useEffect(() => {
    if (decodedTitle) {
      getdata(decodedTitle);
      getdata2();
    }
  }, [decodedTitle]);
  const handleRedirect = (title) => {
    const encodedTitle = encodeURIComponent(title); // Handles spaces/special characters
    navigate(`/blog/${encodedTitle}`);
  }
  return (
    <>
      <Navbar disabled={true} />

      <div className="container text-white flex justify-center md:px-0 px-2  py-16 mx-auto">
        <div className="mx-auto space-y-10 w-full lg:w-[750px]  ">
          {/*Post Title */}
          <h1 className='md:text-5xl text-3xl  font-Raleway font-semibold '>{post.title}</h1>
          {/* Name and Profile  */}
          <hr className='text-gray-700' />

          <div className='my-5 flex items-center gap-6'>
            <div className='space-y-4  '>
              <span className='flex items-center gap-2 '><span className="text-gray-400">Published on </span> <CalendarDays className='text-blue-400' /> {post.date ? format(new Date(post.date), 'MMM dd yyyy') : ''}</span>
              <span className='font-mono text-lg ' ><span className='text-gray-400'>By </span>{post.author} </span> <br />

            </div>

          </div>
          <hr className='text-gray-700' />
          <article className='' dangerouslySetInnerHTML={{ __html: post.content }}></article>
          <hr className='text-gray-700' />
          <h3 className='text-xl'>Explore More:</h3>
          <div className="w-full    py-2  mx-auto md:px-0 px-2">


            <Swiper
              modules={[Navigation]}
              navigation
              loop
              breakpoints={{

                640: {
                  navigation: false,
                  slidesPerView: 1,
                  spaceBetween: 10
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 10
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 20
                },
                1280: {
                  slidesPerView: 2,
                  spaceBetween: 10
                }
              }}
            >
              {data.map((data, index) => (
                <SwiperSlide key={index}>


                  <div className=' ' onClick={() => handleRedirect(data.title)}>
                    <div className=' md:px-2  w-full h-full font-Raleway  bg-transparent '>
                      <div
                        className=' cursor-grab shadow-md shadow-black flex  flex-col items-center md:justify-around justify-center gap-4 backdrop-blur-sm'


                      >

                        <div onClick={() => handleRedirect(data.title)} className='w-full h-[210px] overflow-hidden'>
                          <img
                            src={data.image}
                            className='object-cover w-full h-full hover:scale-125 transition-all duration-300 ease-in-out rounded-t-lg'
                            alt={data.title}
                          />
                        </div>
                        <div onClick={() => handleRedirect(data.title)} className='space-y-1 w-full  px-4 pb-4'>
                          <h1 className='text-xl line-clamp-2 font-medium font-Raleway'>{data.title}</h1>
                          <div className='flex w-full items-center justify-between text-gray-300 font-normal'>
                            <span className='flex items-center gap-2 text-sm text-green font-sans'>
                              <CalendarDays className='text-blues' size={14} />
                              {format(new Date(data.date), 'MMM dd yyyy')}
                            </span>
                          </div>
                          <p className='text-sm text-gray-300 line-clamp-3'>{data.discription}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </SwiperSlide>




              ))}
            </Swiper>
          </div>

        </div>
      </div>
    </>

  )
}

export default BlogPost
