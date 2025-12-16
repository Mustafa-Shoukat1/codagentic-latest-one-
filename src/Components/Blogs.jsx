import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CalendarDays , MoveRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import SplitType from "split-type";
import { motion } from "framer-motion";
import axios from 'axios'
import { format } from 'date-fns';

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from 'react-router';

import { Navigation } from 'swiper/modules';



gsap.registerPlugin(ScrollTrigger);


const Blogs = () => {
  const url = import.meta.env.VITE_SERVER;
const navigate = useNavigate();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);
  const [data, setData] = useState([])


  useGSAP(() => {


    const split = new SplitType(titleRef.current, { types: "chars, words" });

    gsap.fromTo(
      split.chars,
      { opacity: 0, y: 10, },
      {
        opacity: 1,
        y: 0,
        duration: 3.6,
        ease: "power3.out",
        stagger: 0.16,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom center",
          scrub: 2,
        },
      }
    );
  }, []);

  const getdata = async () => {


    try {
      const res = await axios.get(`${url}/blog`);
      setData(res.data.post)

    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };
  useEffect(() => {

    getdata()

  }, [])





// const data = [
//   {
//     title: "Exploring the Future of Web Development",
//     image: "https://picsum.photos/600/400?random=1",
//     date: "2025-09-10",
//     discription:
//       "A deep dive into how modern frameworks like Next.js and React are shaping the web of tomorrow."
//   },
//   {
//     title: "The Power of AI in Everyday Life",
//     image: "https://picsum.photos/600/400?random=2",
//     date: "2025-09-12",
//     discription:
//       "From smart assistants to advanced analytics, AI continues to revolutionize how we live and work."
//   },
//   {
//     title: "10 Tips for Writing Cleaner Code",
//     image: "https://picsum.photos/600/400?random=3",
//     date: "2025-09-15",
//     discription:
//       "Practical steps every developer can take to write more maintainable, scalable, and readable code."
//   },
//   {
//     title: "Design Trends to Watch in 2025",
//     image: "https://picsum.photos/600/400?random=4",
//     date: "2025-09-18",
//     discription:
//       "Minimalism, immersive 3D, and bold typography — what to expect in upcoming design trends."
//   },
//   {
//     title: "Optimizing Performance in React Apps",
//     image: "https://picsum.photos/600/400?random=5",
//     date: "2025-09-20",
//     discription:
//       "Learn how to use memoization, lazy loading, and code splitting to make your React apps blazing fast."
//   }
// ];


    
  const handleRedirect = (title) => {
  const encodedTitle = encodeURIComponent(title); // Handles spaces/special characters
  navigate(`/blog/${encodedTitle}`);
  navigate(0)
}

return (
  <div ref={containerRef} className="z-[999] relative min-h-screen">
    <div className="mx-auto flex flex-col my-[15vh] md:my-0 items-center justify-center lg:px-[100px] container md:absolute md:top-1/2 z-[50] md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 space-y-10 text-[white] font-poppins">
      <div className="flex flex-wrap items-center justify-between space-y-20 uppercase xl:p-10">
        <h2 ref={titleRef} className="lg:text-4xl md:text-xl text-lg px-2 text-center md:mx-0 mx-auto">
          <span className="text-green">Featured</span> Blog Posts
        </h2>
      </div>
      
      <div className="w-full">
        <Swiper
          modules={[Navigation]}
          navigation
          loop
          breakpoints={{
            640: {
              navigation: false, 
              slidesPerView: 1,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 35
            }
          }}
        >
          {data.map((data, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="cursor-pointer  py-4 px-2 md:px-0 h-full" onClick={() => handleRedirect(data.title)}>
                <div className="
                  w-full 
                  
                 md:h-[400px]
                 
                  min-w-[320px] 
                  md:w-[320px]
                  mx-auto

                  overflow-hidden 
                  font-Raleway  
                  bg-transparent 
                  rounded-lg
                 
                  transition-all 
                  duration-300 
                  ease-in-out
                  hover:shadow-xl
                  hover:shadow-black/30
                  backdrop-blur-sm
                  flex
                  flex-col
                ">
                  {/* Image Section - Fixed Height */}
                  <motion.div 
                    onClick={() => handleRedirect(data.title)}  
                    className="w-full h-[200px] cursor-pointer overflow-hidden shrink-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: {
                        duration: 2.0,
                        ease: [0.23, 1, 0.32, 1]
                      }
                    }}
                  >
                    <motion.img
                      src={data.image}
                      className="object-cover w-full h-full hover:scale-110 transition-all duration-500 ease-out rounded-t-lg"
                      alt={data.title}
                      initial={{ scale: 1.2 }}
                      whileInView={{ 
                        scale: 1,
                        transition: {
                          duration: 2.4,
                          ease: [0.23, 1, 0.32, 1]
                        }
                      }}
                    />
                  </motion.div>
                  
                  {/* Content Section - Fixed Height with Internal Flexbox */}
                  <div 
                    onClick={() => handleRedirect(data.title)} 
                    className="h-[200px] p-4 flex cursor-pointer flex-col justify-between shrink-0"
                  >
                    {/* Title Container - Fixed Space */}
                    <div className="h-[60px] flex items-start">
                      <motion.h1 
                        className="text-base md:text-lg line-clamp-2 font-medium font-poppins leading-tight hover:text-gray-200 transition-colors duration-200"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ 
                          opacity: 1, 
                          y: 0,
                          transition: {
                              duration: 2.0,
                              delay: 0.2,
                            ease: [0.23, 1, 0.32, 1]
                          }
                        }}
                      >
                        {data.title}
                      </motion.h1>
                    </div>
                    
                    {/* Description Container - Fixed Space */}

                    
                    {/* Bottom Section - Fixed Space */}
                    <div className="h-[20px] flex items-center justify-between">
                      {/* Date */}
                      <motion.div 
                        className="flex items-center"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ 
                          opacity: 1, 
                          y: 0,
                          transition: {
                            duration: 2.0,
                            delay: 0.3,
                            ease: [0.23, 1, 0.32, 1]
                          }
                        }}
                      >
                        <span className="flex items-center gap-2 text-xs text-green font-sans">
                          <CalendarDays className="text-blues" size={12} />
                          {format(new Date(data.date), 'MMM dd yyyy')}
                        </span>
                      </motion.div>
                      
                      {/* Read More Indicator */}

                    </div>
                                        <div className="h-[100px] flex flex-col justify-center">
                      <motion.p 
                        className="text-sm text-gray-300 line-clamp-4 leading-relaxed"
                        initial={{ 
                          opacity: 0, 
                          y: 20,
                          scaleX: 0.95
                        }}
                        whileInView={{ 
                          opacity: 1, 
                          y: 0,
                          scaleX: 1,
                          transition: {
                            duration: 3.2,
                            delay: 0.6,
                            ease: [0.23, 1, 0.32, 1]
                          }
                        }}
                      >
                        {data.discription}
                      </motion.p>
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
);
};

export default Blogs;
