import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUp, Copyright } from "lucide-react";
import Word from "./Word";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const circle = useRef(null);
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".Footer",
        start: "top 90%",
        end: "top 40%",
        scrub: 1,
      },
    });

    tl.from(".heading", {
      translateY: 80,
      opacity: 0,
      duration: 2.4,
      ease: "power2.out"
    });
  }, []);
  const handleClick = () => {

    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });

  };
  return (
    <div
      ref={container}
      className="relative w-full h-full     overflow-hidden flex justify-center items-start"
    >
      <button
        onClick={() => { handleClick() }}
        title="Go to Contact Page"
        className="upbtn absolute cursor-pointer  bottom-1/3  md:bottom-16 animate-bounce -translate-x-1/2 left-1/2 bg-green backdrop-blur-3xl p-3 rounded-full text-white  z-[100]"
      >
        <ArrowUp />
      </button>

      <div className="upbtn  flex items-center justify-around gap-2 absolute md:bg-transparent   flex-wrap bottom-0   w-[96%] rounded-t-3xl  p-5    text-white  z-[100]">
        <p className="flex items-center flex-wrap gap-2 justify-center">
          <Copyright className="text-green" size={14} />{" "}
          <span className="text-green">2025 CODAGENTIC</span>{" "}
          <span className="text-sm ">All Rights Reserved.</span>
          <span><span className="text-xs text-green">CEO-FOUNDER</span> MUSTAFA SHOUKAT</span>

        </p>
        {/* <div className="flex items-center gap-3 justify-center flex-wrap ">

          <p className="text-xs text-green "> Designed by </p>
          <a
            href="https://www.linkedin.com/in/maryam-fatima-rajput-91538925a/"
            target="_blank"
            className="flex items-center flex-wrap gap-2 hover:border-b pb-[1px] transition-all duration-300 ease-in-out  cursor-pointer  !border-green"
          >
            <Word>Maryam</Word> <Word>Fatima</Word>{" "}
            <span className="text-xs">From CODAGENTIC</span>
          </a>
        </div> */}
      </div>

      <div
        ref={circle}
        className="   uppercase flex  items-center  md:items-start p-20 text-white justify-center size-[100vw]"
      >
        <div className="heading text-3xl space-y-3 lg:text-6xl  text-center tracking-wider md:translate-y-[200px]">
          <h1>Let's Work Together</h1>
          <p className="text-xl text-green">And Build Future</p>
        </div>
        <video
          autoPlay
          preload="auto"
          loop
          muted
          playsInline
          className="absolute h-screen w-full brightness-50 object-cover top-0 left-0 z-[-10]"
        >
          <source src="/bg-high2.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
};

export default Footer;
