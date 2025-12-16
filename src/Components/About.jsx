import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import SplitType from "split-type";
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const textRefs = useRef([]);
  const services = useRef([]);

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const mobileSettings = {
    end: 'bottom bottom',
  };
  const desktopSettings = {
    end: 'bottom bottom',
  };

  const textContent = [
    `Automate <span class="text-[#2eafff]"> Smarter </span>, Scale Faster—<span class="text-[#2eafff]"> AI </span> That Works Seamlessly While You Reach New <span class="text-[#2eafff]"> Heights </span>.`,
    `At <span class="text-[#2eafff]"> CodAgentic </span>, we're fueling your <span class="text-[#2eafff]"> ideas </span> with <span class="text-[#2eafff]"> AI </span> that thinks, learns, and scales alongside Your <span class="text-[#2eafff]"> vision </span>.`,
    `Our <span class="text-[#2eafff]"> mission </span> is to shatter the <span class="text-[#2eafff]"> myth </span> that <span class="text-[#2eafff]"> AI </span> is only for tech giants bringing <span class="text-[#2eafff]"> intelligent </span> Automation to Everyone.`,
  ];

  useGSAP(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.About',
        start: "top top",
        scrub: 1,
        ...(isMobile ? mobileSettings : desktopSettings)
      }
    });

    textContent.forEach((_, index) => {
      const split = new SplitType(textRefs.current[index], { types: "words" });

      gsap.set(split.words, {
        opacity: 0,
        y: 30,
        rotateX: 20,
        scale: 0.9,
        filter: "blur(8px)",
      });

      tl.to(textRefs.current[index], {
        opacity: 1,
        duration: 2.4,
        ease: "power2.out",
        onStart: () => setActiveIndex(index)
      })
      
      tl.to(split.words, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        filter: "blur(0px)",
        stagger: {
          amount: 4.4, 
          from: "start",
          ease: "power2.out"
        },
        duration: 4.4,
        ease: "back.out(1.2)"
      })
      
      tl.to(split.words, {
        opacity: 0,
        y: -20,
        rotateX: -15,
        scale: 0.9,
        filter: "blur(4px)",
        stagger: {
          amount: 2.6,
          from: "end",
          ease: "power2.in"
        },
        duration: 3.6,
        ease: "power2.inOut"
      }, "+=3.0"); 
    });
  }, []);

  return (
    <>
      <div ref={containerRef} className="h-screen relative overflow-hidden">
        <div className="absolute top-0 h-screen flex items-center justify-center">
          {textContent.map((text, index) => (
            <div
              key={index}
              ref={el => (textRefs.current[index] = el)}
              className={`fixed text-center text-3xl lg:text-5xl xl:text-[50px] text-white md:w-[70%] leading-tight transition-opacity ${
                activeIndex === index ? 'opacity-100' : 'opacity-100 pointer-events-none'
              }`}
              dangerouslySetInnerHTML={{ __html: text }}
              style={{
                willChange: 'transform, opacity, filter',
                backfaceVisibility: 'hidden'
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default About;