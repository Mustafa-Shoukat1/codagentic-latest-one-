import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import SplitType from "split-type";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";



gsap.registerPlugin(ScrollTrigger);

const Clients = ({data}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);
  useGSAP(() => {


    const split = new SplitType(titleRef.current, { types: "chars, words" });

    gsap.fromTo(
      split.chars,
      { opacity: 0, y: 50, },
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



  const Card = ({ role, name, des, styles, index }) => {
    return (
      <div className="py-4 px-2 ">

        <motion.div
          ref={(el) => (cardRefs.current[index] = el)}
          transition={{ duration: 3.0, delay: index * 0.6 }}
          // Add 'card' class for CSS targeting
          className={` ${styles} relative flex-col mx-auto md:h-[300px] lg:h-[400px] pb-2 rounded-3xl  w-full h-full font-Raleway  cursor-grab shadow-md shadow-black  flex   items-center md:justify-around justify-center gap-4 backdrop-blur-sm  `}
        >
          {/* <div className="relative  overflow-hidden  rounded-full size-[200px]    ">
            <img className='    hover:scale-110 transition-all duration-500 ease-in-out  rounded-full size-full object-cover  object-center ' src={img} alt={name} />
          </div> */}
          <div className="space-y-2 px-4 ">
            <div className="text-center w-full space-y-2">
              <motion.h4 
                className="text-2xl font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 2.0,
                    ease: [0.23, 1, 0.32, 1]
                  }
                }}
              >
                {name}
              </motion.h4>
              <motion.h5 
                className="text-green text-sm"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 2.0,
                    delay: 0.35,
                    ease: [0.23, 1, 0.32, 1]
                  }
                }}
              >
                {role}
              </motion.h5>
            </div>

            <div className="text-center space-y-4">
              <motion.p
                initial={{ 
                  opacity: 0,
                  y: 20,
                  scaleX: 0.95,
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
                className="border-l border-r pl-1 !border-green py-4 text-lg leading-relaxed text-gray-300"
              >
                {des}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>

    );
  };

 
  // const data = [

  //   {
  //     role: "CTO, HealthTech Inc",
  //     name: "John Smith",
  //     img: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',

  //     des: "The AI solutions provided by the team have transformed our healthcare operations, leading to improved patient outcomes and significant cost savings.",


  //   },
  //   {
  //     role: "Operations Director, ManufacturePro",
  //     name: "Michael Chen",
  //     img: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',

  //     des: "The predictive maintenance solution has dramatically reduced our downtime and improved overall operational efficiency.",


  //   }
  //   , {
  //     role: "Head of Innovation, FinanceCore",
  //     name: "Sarah Johnson",
  //     img: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',


  //     des: "Their AI-powered fraud detection system has saved us millions and provides unmatched accuracy in real-time transaction monitoring.",


  //   },
  //   {
  //     role: "Operations Director, ManufacturePro",
  //     name: "Michael Chen",
  //     img: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',

  //     des: "The predictive maintenance solution has dramatically reduced our downtime and improved overall operational efficiency.",


  //   },


  // ]

  return (
    <div ref={containerRef} className="relative  min-h-screen">
      <div className=" mx-auto flex flex-col my-[15vh] md:my-0   items-center justify-center  lg:px-10 container md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2  space-y-10 text-[white] font-poppins">
        <div className="flex flex-wrap items-center  justify-between space-y-20 uppercase xl:p-10">
          <h2 ref={titleRef} className="lg:text-4xl md:text-xl text-lg px-2 text-center     md:mx-0 mx-auto ">
            Partnered with the <span className="text-green ">boldest names</span> in the game
          </h2>
          {/* <p className="xl:w-1/5 lg:w-1/5 text-center md:text-right">
          </p> */}
        </div>
        <div className="w-full     mx-auto px-2">


          <Swiper
            // modules={[Navigation]}
            // navigation
            loop
            // spaceBetween={-1}
            breakpoints={{

              640: {
                slidesPerView: 1,
                spaceBetween: 10
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 10
              },    
              1280: {
                slidesPerView: 3,
                spaceBetween: 10
              }
            }}
          >
            {data.map((dat, index) => (
              <SwiperSlide key={index}>


                <Card
                  key={index}
                  index={index}
                  // img={dat.img}
                  role={dat.role}
                  name={dat.name}
                  des={dat.description

                  }
                />
              </SwiperSlide>




            ))}
          </Swiper>
        </div>


      </div>
    </div>
  );
};

export default Clients;
