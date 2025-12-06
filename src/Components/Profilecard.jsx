import React, { useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Linkedin, Github } from 'lucide-react';

const textVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    rotateX: 90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    }
  }
};

const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

const Profilecard = ({ title, role, descrp, image, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative  w-full md:w-[350px] lg:w-[440px] !z-[900] md:p-0 py-2 px-[4px] backdrop-blur-xs rounded-lg shadow-xl shadow-black overflow-hidden group"
      initial="hidden"
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.23, 1, 0.32, 1]
        }
      }}
      viewport={{ margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-full md:w-[350px] lg:w-[440px] flex flex-col gap-3 h-auto lg:min-h-[450px] md:px-5 md:py-5 font-poppins lg:space-y-6"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.23, 1, 0.32, 1]
          }
        }}
      >
        <div className='flex items-center justify-center  md:flex-wrap  gap-4 relative'>
          <motion.div
            className="relative cursor-pointer"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1]
              }
            }}
            whileHover={{
              scale: 1.05,
              rotate: 5,
              transition: { duration: 0.3 }
            }}
          >
            <motion.img
              className='rounded-full lg:size-[250px] size-[130px] object-cover object-center relative z-10'
              src={image}
              alt={role}
            />
            <motion.div
              className="absolute inset-0 bg-green/20 rounded-full blur-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{
                scale: 1,
                opacity: 0.4,
                transition: { duration: 0.5 }
              }}
              animate={{
                scale: isHovered ? 1.2 : 1,
                opacity: isHovered ? 0.8 : 0.4
              }}
            />
          </motion.div>

          <motion.div
            className='space-y-2 md:w-full'
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: {
                duration: 0.5,
                delayChildren: 0.2,
                staggerChildren: 0.1
              }
            }}
          >
            {/* <motion.div 
              className="overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.23, 1, 0.32, 1]
                }
              }}
            > */}
            <motion.h2
              className='text-lg md:text-2xl text-green '
              // initial={{ y: 10 }}
              // whileInView={{
              //   y: 0,
              //   transition: {
              //     duration: 0.6,
              //     ease: [0.23, 1, 0.32, 1]
              //   }
              // }}
              dangerouslySetInnerHTML={{ __html: title }}
            />

            {/* </motion.div> */}

            <motion.div
              className='flex gap-2 md:flex-row flex-col items-start md:w-full justify-between pr-7 cursor-pointer'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.23, 1, 0.32, 1]
                }
              }}
            >
              <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.23, 1, 0.32, 1]
                  }
                }}
              >
                <motion.span className="block">
                  {role}
                </motion.span>
              </motion.div>

              <motion.span
                className='flex gap-4'
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    ease: [0.23, 1, 0.32, 1]
                  }
                }}
              >
                <motion.a
                  className='text-green'
                  href="http://linkedin.com/in/mustafashoukat/"
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }
                  }}
                >
                  <Linkedin />
                </motion.a>
                <motion.a
                  className='text-green'
                  href="https://github.com/Mustafa-Shoukat1"
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }
                  }}
                >
                  <Github />
                </motion.a>
              </motion.span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className='space-y-3 overflow-hidden'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.23, 1, 0.32, 1]
            }
          }}
        >
          <motion.p
            className="text-gray-300 text-sm relative"
            dangerouslySetInnerHTML={{ __html: descrp }}
          />
        </motion.div>


      </motion.div>
    </motion.div>
  );
};

export default Profilecard;  