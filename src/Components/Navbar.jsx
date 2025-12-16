import React, { useEffect, useState } from "react";
// import logo from "";
import { motion, AnimatePresence } from "framer-motion";
import { slowDuration, slowTimeout, POLL_INTERVAL } from "../animationConfig";
import SoundWave from "./SoundWave";
import {
  House,
  Handshake,
  Boxes,
  Factory,
  Newspaper,
  Headset,
} from "lucide-react";

const Navbar = ({

  disabled = false,
  isAutoScrolling,
  startAutoScroll,
  stopAutoScroll,
  restartAutoScroll,
}) => {
  const [selectedOption, setSelectedOption] = useState("intro");
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setaLastScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  

  const sections = [
    "intro",
    "industries",
    "service",
    "about",
    "blogs",
    "contact",
  ];

  useEffect(() => {
    const observers = [];
    const options = { threshold: 0.1 };

    sections.forEach((section) => {
      const target = document.getElementById(section);
      if (target) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isScrolling) {
              setSelectedOption(section);
            }
          });
        }, options);
        observer.observe(target);
        observers.push(observer);
      }
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [isScrolling,sections,selectedOption]);

  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    setIsScrolling(true);
    if (sectionId === "intro") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setSelectedOption(sectionId);
      setTimeout(() => {
        setIsScrolling(false);
      }, slowTimeout(800));
      return;
    }
    if (sectionId === "service") {
      const additionalScroll = window.innerHeight * 1.4;
      const initialScroll = window.pageYOffset;
      const sectionTop = section.getBoundingClientRect().top + initialScroll;
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
      setSelectedOption(sectionId);
      const checkScroll = setInterval(() => {
        if (Math.abs(window.pageYOffset - sectionTop) < 10) {
          clearInterval(checkScroll);
          window.scrollTo({
            top: sectionTop + additionalScroll,
            behavior: "smooth",
          });
          setTimeout(() => {
            setIsScrolling(false);
          }, slowTimeout(1000));
        }
      }, POLL_INTERVAL);
      setTimeout(() => {
        clearInterval(checkScroll);
        setIsScrolling(false);
      }, slowTimeout(5000));
    } else   if (sectionId === "industries") {
      const additionalScroll = window.innerHeight * 2.5;
      const initialScroll = window.pageYOffset;
      const sectionTop = section.getBoundingClientRect().top + initialScroll;
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
      setSelectedOption(sectionId);
      const checkScroll = setInterval(() => {
       if (Math.abs(window.pageYOffset - sectionTop) < 10) {
          clearInterval(checkScroll);
          window.scrollTo({
            top: sectionTop + additionalScroll,
            behavior: "smooth",
          });
          setTimeout(() => {
            setIsScrolling(false);
          }, slowTimeout(1000));
        }
      }, POLL_INTERVAL);
      setTimeout(() => {
        clearInterval(checkScroll);
        setIsScrolling(false);
      }, slowTimeout(5000));
    }  
    else {
      section.scrollIntoView({ behavior: "smooth" });
      setSelectedOption(sectionId);
      setTimeout(() => {
        setIsScrolling(false);
      }, slowTimeout(800));
    }
  };

  return (
    <AnimatePresence mode="wait">
      {/* Logo and SoundWave Container */}
      <motion.div
        key="logo-soundwave"
        animate={{ y: isAutoScrolling ? -100 : 0 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 20,
          duration: slowDuration(0.3),
        }}
        className="relative md:fixed top-2 left-0 z-[999] flex items-center justify-between w-full px-2 md:px-10"
      >
        <a href="/" className="w-[180px] text-white text-3xl lg:w-[250px]">
          <img className="object-cover" src={"/logo.png"} alt="logo" />
                {/* <h1>{isScrolling ? "Scrolling..." : "Not scrolling"}</h1> */}

        </a>
        <div className="flex items-center gap-4">
          {/* <SoundWave isPlaying={isPlaying} togglePlay={togglePlay} /> */}
        </div>
      </motion.div>

      {/* Navigation List */}

      {/* {!isAutoScrolling ? ( */}
        <motion.ul
          animate={{ x: isAutoScrolling ? -100 : 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 20,
            duration: slowDuration(0.3),
          }}
          key="nav-list"
          className={`hidden ${
            disabled ? "lg:hidden" : "lg:flex lg:flex-col"
          } py-[10px] px-[15px] shadow-sm shadow-black backdrop-blur-lg fixed gap-3 rounded-lg z-[999] top-[50%] -translate-y-1/2 left-5`}
        >
          {sections.map((section) => (
            <motion.li
              key={section}
              onClick={() => handleNavClick(section)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-[12px] text-center !border-green !border-[1px] shadow-sm shadow-green flex items-center justify-center rounded-full text-sm cursor-pointer uppercase hover:bg-green hover:text-white transition-all duration-75 ${
                selectedOption === section
                  ? "text-gray-100 bg-green"
                  : "text-[white]"
              }`}
            >
              {section === "intro" ? (
                <House size={18} />
              ) : section === "service" ? (
                <Boxes size={18} />
              ) : section === "about" ? (
                <Handshake size={18} />
              ) : section === "industries" ? (
                <Factory size={18} />
              ) : section === "blogs" ? (
                <Newspaper size={18} />
              ) : section === "contact" ? (
                <Headset size={18} />
              ) : (
                "test"
              )}
            </motion.li>
          ))}
        </motion.ul>
      {/* ) : (
        ""
      )} */}
    </AnimatePresence>
  );
};

export default Navbar;
