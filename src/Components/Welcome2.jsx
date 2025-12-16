import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slowDuration, slowTimeout } from '../animationConfig';
import { MoveRight } from 'lucide-react'
import Word from './Word';
import nohand from '../assets/images/logo_C.png'
// import Logo from "./Logo";
import PartsScene from "./3Dmodel";
const Welcome = ({ togglePlay, startAutoScroll }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [rotate, setRotate] = useState(0);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [style, setStyle] = useState({});

    // const handleMouseMove = (e) => {
    //     const { clientX, clientY } = e;
    //     const centerX = window.innerWidth / 2;
    //     const centerY = window.innerHeight / 2;

    //     const deltaX = (clientX - centerX) / 20;
    //     const deltaY = (clientY - centerY) / 20;

    //     setRotate(deltaX / 2);
    //     setTranslate({ x: deltaX, y: deltaY });
    // };
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;


        const xPercent = (x / rect.width - 0.1) * 2;
        const yPercent = (y / rect.height - 0.1) * 2;

        const rotateX = yPercent * 5;
        const rotateY = -xPercent * 5;

        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        });
    };
    const handleMouseLeave = () => {
        setStyle({
            transform: "perspective(1000px) rotateX(0) rotateY(0)",
            transition: "transform 0.3s ease-out",
        });
    };
    const setToken = (token) => {
        const now = new Date();
        const expiry = now.getTime() + 2 * 60 * 60 * 1000; // 2 hours in milliseconds
      
        const item = {
          token: token,
          expiry: expiry,
        };
      
        localStorage.setItem('authToken', JSON.stringify(item));
      };
        
    const handleStart = () => {
        setIsVisible(false);
        setToken('show')

        setTimeout(() => {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
            document.body.style.height = 'auto';
            document.documentElement.style.height = 'auto';
            document.body.style.touchAction = 'auto';
            document.documentElement.style.touchAction = 'auto';
            togglePlay()
            
            // Trigger smooth scroll to the first section after welcome disappears
            setTimeout(() => {
                const firstSection = document.getElementById('intro');
                if (firstSection) {
                    firstSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Start auto-scroll after a delay
                setTimeout(() => {
                    if (startAutoScroll) {
                        console.log('Welcome: Calling startAutoScroll function');
                        console.log('startAutoScroll function type:', typeof startAutoScroll);
                        startAutoScroll();
                    } else {
                        console.log('Welcome: startAutoScroll function is not available');
                    }
                }, slowTimeout(4000)); // Start auto-scroll 4 seconds after scrolling to first section
            }, slowTimeout(500)); // Small delay to ensure welcome animation completes
        }, slowTimeout(1000));
    };

    useEffect(() => {
        if (isVisible) {
            // Disable scrolling
            setTimeout(() => {
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
                document.body.style.height = '100vh';
                document.documentElement.style.height = '100vh';
                document.body.style.touchAction = 'none';
                document.documentElement.style.touchAction = 'none';
            }, slowTimeout(1000))
        } else {
            // Restore scrolling
            setTimeout(() => {
                document.body.style.overflow = 'auto';
                document.documentElement.style.overflow = 'auto';
                document.body.style.height = 'auto';
                document.documentElement.style.height = 'auto';
                document.body.style.touchAction = 'auto';
                document.documentElement.style.touchAction = 'auto';
            }, slowTimeout(1000)); // Delay matches animation exit duration
        }
    }, [isVisible]);


    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div

                    className=" h-screen w-full absolute space-y-7 top-0 !z-[999] flex flex-col items-center justify-center  bg-[#000b1b]  text-white"
                    initial={{ opacity: 1, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    exit={{ scale: 0.8, opacity: 0, transition: { duration: slowDuration(2) } }}
                    transition={{ duration: slowDuration(1), ease: "easeInOut" }}
                >

                    <div


                        className="flex items-center text-green font-Raleway  justify-center  text-4xl md:text-8xl font-semibold  uppercase "a
                    >

                    <img src="/logo.png" alt="" className="w-[50%] object-cover " />
                    </div>
                    <p className="text-sm md:text-lg font-poppins text-center font-extralight">Smart Solutions & Seamless Automation</p>
                    {/* <Logo /> */}

                    <motion.button
                        initial={{ translateY: 100, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{ duration: slowDuration(0.5), delay: slowDuration(0.2), ease: "easeOut" }}
                        className="px-8 flex group translate-y-32 hover:scale-105 items-center gap-3 py-2 text-lg border transition-all duration-700 ease-in-out !border-green rounded-full hover:bg-gradient-to-tl from-[#00ffffa6] from-10% to-[#2eafff] "
                        whileHover={{ scale: 1.01 }}
                        onClick={handleStart}
                    >
                        Get Started <MoveRight className="group-hover:translate-x-3 transition-all duration-500 ease-in-out" />
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Welcome;