import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { motion } from "framer-motion"
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Believe = () => {
  const textRef = useRef(null);

  useGSAP(() => {
    const textContent =
      "We believe AI should be for everyone turning ideas into reality with seamless automation and intelligent innovation.";

    textRef.current.innerHTML = textContent
      .split(" ")
      .map((word) => `<span class="inline-block ${word == 'believe' || word == 'AI' || word == 'ideas' || word == 'believe' || word == 'reality' || word == 'intelligent' || word == 'automation' ? '!text-green uppercase font-light font-poppins' : ''} ">${word}</span>`)
      .join(" ");

    const wordElements = textRef.current.querySelectorAll("span");

    // Set initial state with softer properties
    gsap.set(wordElements, {
      opacity: 0,
      scale: 0.6,
      y: 20,
      filter: "blur(4px)"
    });

    gsap.to(wordElements, {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 5.0,
      ease: "back.out(1.2)", // Much softer ease
      stagger: {
        amount: 4.0, // Much slower stagger timing
        ease: "power2.out"
      },
      scrollTrigger: {
        trigger: '.Belive',
        start: "top center+=10",
        toggleActions: "play reverse play reverse",
        end: "bottom center",
        scrub: 1,
      },
    });

  }, []);

  return (
    <div className="flex items-center justify-center flex-col py-5 space-y-16 min-h-screen md:my-[50vh] px-4 lg:px-0 my-[10vh]">
      <p className="font-poppins text-center text-green text-2xl xl:w-3/4 mx-auto">
        What We Believe?
      </p>
      <div className="text-3xl lg:text-4xl w-full text-center lg:w-[70%] font-Raleway text-white xl:w-3/4 mx-auto">
        <p 
          ref={textRef} 
          className="leading-normal md:leading-[80px] flex flex-wrap gap-2 md:gap-5 items-center justify-center"
          style={{ willChange: 'transform, opacity, filter' }}
        ></p>
      </div>
    </div>
  );
};

export default Believe;