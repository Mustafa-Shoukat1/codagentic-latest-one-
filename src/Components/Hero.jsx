import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./InCard";
import { useGSAP } from "@gsap/react";
import Profilecard from "./Profilecard";
import { motion } from "framer-motion";
import { slowDuration, slowTimeout } from "../animationConfig";
import Word from "./Word";
import Believe from "./Believe";
import Client from "./Clients";
import Blogs from "./Blogs";
import Contact from "./Contact";
import Footer from "./Footer";
import About from "./About";
import Service from "./Service";
import axios from "axios";
import SmoothScrollProvider from "./SmoothScrollProvider";

gsap.registerPlugin(ScrollTrigger);

const ScrollFixedAnimation = ({ data, data4 }) => {
  const url = import.meta.env.VITE_SERVER;

  const [activeCard, setActiveCard] = useState(null);
  const [data2, setData] = useState([]);
  const [data3, setData2] = useState([]);
  const [leng, setLeng] = useState();

  // Enhanced reset function
  const resetCardsToInitialState = () => {
    const cards = gsap.utils.toArray(".card");
    cards.forEach((card, index) => {
      gsap.set(card, {
        x: 0,
        y: 0,
        scale: 1,
        // rotate: -3 * index,
        rotateY: 0,
        opacity: 1,
        zIndex: cards.length - index,
        transformOrigin: "center center",
      });
    });
  };

  useGSAP(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Mobile-specific configuration
    const mobileSettings = {
      end: "+=3500",
      touch: {
        type: "touch",
        momentum: true,
      },
    };

    // Desktop-specific configuration
    const desktopSettings = {
      end: 'bottom bottom',
    };

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".About",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      })
      .fromTo(
        ".aboutcount",
        {  display: "none" },
        {  display: "flex" }
      )
 

    // Main cards animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".Indust",
        scrub: true,
        
        start: "top top",
        onEnter: () => {
          // gsap.set(".Incont", { display: "flex" });
          // Reset cards to initial state when entering
          resetCardsToInitialState();
        },
        // onLeave: () => gsap.set(".Incont", { display: "none" }),
        onEnterBack: () => {
          // gsap.set(".Incont", { display: "flex" });
          // Reset cards when scrolling back
          resetCardsToInitialState();
        },
        ...(isMobile ? mobileSettings : desktopSettings),
      },
    });
    tl.to(".aboutcount", { display: 'none',  })
    .fromTo(
      ".Incont",
      { display: "none" },
      { display: "flex",  },
      "-=1.1"
    );

    // ENHANCED CARD ANIMATION
    const cardsTL = gsap.timeline();
    const cards = gsap.utils.toArray(".card");

    cards.forEach((card, index) => {
      gsap.set(card, {
        // rotate: -5 * index,
        boxShadow: "0 0 40px rgba(59, 130, 246, 0.5)",

        rotateY: 0,
        zIndex: cards.length - index,
        x: "0%",
        y: "0%",
        scale: 1,
        opacity: 1,
        transformOrigin: "center center",
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        willChange: "transform",
        transformStyle: "preserve-3d",
      });

      // Enhanced animation with 3D effects and smoother easing
      cardsTL.to(
        card,
        {
          xPercent: isMobile ? 150 : 300,
          yPercent: isMobile ? -30 : -50,
          scale: isMobile ? 0.7 : 0.15,
          // rotate: isMobile ? -25 : -35,
          rotateY: 200, // Add 3D rotation effect
          opacity: 0.6,
          duration: 1.6, // Longer duration for smoother effect
          ease: "power3.inOut", // Smoother easing
          onStart: () => {
            gsap.set(card, { zIndex: 1000 + index });
            // Add subtle glow effect to active card
            gsap.to(card, {
              duration: 0.5,
              // scale:1.05,
              boxShadow: "0 0 40px rgba(59, 130, 246, 0.5)",
              repeat: 1,
              yoyo: true,
            });
          },
          onReverseComplete: () =>
            gsap.set(card, {
              zIndex: cards.length - index,
              xPercent: -50,
              yPercent: -50,
              // rotate: -5 * index,
              rotateY: 0,
              scale: 1,
              opacity: 1,
            }),
        },
        index * 0.35 + 0.5
      ); // Adjusted timing

      // Add wobble effect to the next card
      if (index < cards.length - 1) {
        cardsTL.to(
          cards[index + 1],
          {
            // rotate: -5 * (index + 1) + 5,
            rotateZ: -0,
            rotateX: -2,
            rotateY: 5,
            duration: 1,
            ease: "elastic.out(1, 0.5)", // Elastic easing for wobble
          },
          index * 0.35 + 0.3
        );
      }
    });



    // Add the enhanced animation to main timeline
    tl.add(cardsTL);

    // Service section timeline
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".Service",
          start: "top top",
          end: "top bottom",
          scrub: true,
        },
      })
      .to(".Incont", { display: "none", duration: 0.1, opacity: 0 })
      .fromTo(
        ".servicecount",
        { opacity: 0, display: "none" },
        { opacity: 1, y: 0, duration: 1, display: "flex" }
      );

    // Brains section timeline
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".Brains",
          start: "top top",
          end: "top bottom",
          scrub: true,
        },
      })
      .to(".servicecount", { opacity: 0, display: "none", duration: 0.1 })
      .fromTo(
        ".braincont",
        { opacity: 0, display: "none" },
        { opacity: 1, y: 0, duration: 1, display: "flex" }
      )
      

    // Believe section timeline
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".Belive",
          start: "top top",
          end: "top bottom",
          scrub: true,
        },
      })
      .to(".braincont", { opacity: 0, display: "none", duration: 0.1 })
      .fromTo(
        ".belivecount",
        { opacity: 0, display: "none" },
        { opacity: 1, duration: 2, display: "flex" }
      );

    // Clients Section Timeline
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".Client",
          start: "top top",
          end: "top bottom",
          scrub: true,
        },
      })
      .to(".belivecount", { opacity: 0, display: "none", duration: 0.3 })
      .fromTo(
        ".clientcount",
        { opacity: 0, display: "none" },
        { opacity: 1, duration: 0.3, display: "block" }
      );

    // Blogs Section Timeline
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".Blogs",
          start: "top top",
          end: "top bottom",
          scrub: true,
        },
      })
      .to(".clientcount", { opacity: 0, display: "none", duration: 0.5 })
      .fromTo(
        ".blogcount",
        { opacity: 0, display: "none" },
        { opacity: 1, display: "block", duration: 0.3 }
      );

    // Contact Section Timeline
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".Contact",
          start: "top top",
          end: "top bottom",
          scrub: true,
        },
      })
      .to(".blogcount", { opacity: 0, y: -100, display: "none", duration: 0.1 })
      .fromTo(
        ".contactcount",
        { opacity: 0, scale: 0.8, display: "none" },
        { opacity: 1, scale: 1, duration: 1, display: "flex" }
      );

    // Footer Section Timeline
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".Footer",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      })
      .to(".contactcount", { opacity: 0, display: "none", duration: 0.1 })
      .fromTo(
        ".footercount",
        { opacity: 0, display: "none" },
        { opacity: 1, duration: 0.1, display: "flex" }
      );

    gsap.to(".hero", {
      rotateX: 60,
      scale: 0.4,
      opacity: 0,
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom center",
        scrub: true,
      },
    });
  }, [data]);

  // Card initialization
  useEffect(() => {
    window.scroll(0, 0);

    const initializeCards = () => {
      const cards = document.querySelectorAll(".card");
      if (cards.length === 0) return;

      cards.forEach((card, index) => {
        gsap.set(card, {
          rotate: -5 * index,
          rotateY: 0,
          zIndex: cards.length - index,
          x: "0%",
          y: "0%",
          scale: 1,
          opacity: 1,
          transformOrigin: "center center",
          position: "absolute",
          top: "50%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
          willChange: "transform",
          transformStyle: "preserve-3d",
        });
      });
    };

    const timer = setTimeout(initializeCards, slowTimeout(200));

    const handleLoad = () => {
      setTimeout(initializeCards, slowTimeout(200));
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, [data]);

  const getdata = async () => {
    try {
      const res = await axios.get(`${url}/service`);
      setData(res.data.service);
      setLeng(res.data.service.length);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  };

  const getdata2 = async () => {
    try {
      const res = await axios.get(`${url}/review`);
      setData2(res.data.review);
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  useEffect(() => {
    getdata();
    getdata2();
  }, []);

  return (
    <div className="relative masterspacer">
      {/* Fixed Container */}
      <div className="hero h-screen w-full flex-col items-center justify-center flex text-white">
        <div className="">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: slowDuration(0.5), duration: slowDuration(0.6) }}
            className="text-5xl text-center flex  items-center  justify-center gap-2 font-poppins lg:text-7xl leading-tight tracking-wide"
          >
            <h1 className="drtitle flex items-center  justify-center gap-4 flex-wrap">
              Dream it,{" "}
              <span className="text-green">
                <span className="border-b-1 flex items-center gap-4 font-poppins">
                  We Will <Word>AI</Word> it
                </span>
              </span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: slowDuration(0.5), duration: slowDuration(0.6) }}
            className="mt-2 lg:mt-4 drtitle font-Raleway text-center translate-y-14 text-sm px-4 md:text-lg lg:text-xl font-light text-gray-200"
          >
            Redefining Business Excellence, where AI Meets Business
            Transformation.
          </motion.p>
        </div>
      </div>

      <div className="fixed top-1/2 w-full h-screen lg:overflow-hidden overflow-auto left-1/2 text-white -translate-x-1/2 -translate-y-1/2">
        <div className="aboutcount  flex items-center justify-center h-screen ">
          <motion.p
            initial={{ y: 200 }}
            whileInView={{ y: 0 }}
            className="text-green text-2xl lg:text-4xl absolute top-[15vh] lg:top-[5vh] left-1/2 -translate-x-1/2"
          >
            Who we are
          </motion.p>
            <About />
        </div>

        <div className="Incont absolute top-0 left-0 w-full h-screen">
          <div className="container z-[900] mx-auto flex lg:flex-row flex-col-reverse items-center pb-[5vh] md:pb-0 lg:pb-[5vh]  justify-between md:justify-around h-full">
            <motion.h1
              initial={{ y: -50, rotateX: 60, opacity: 0 }}
              whileInView={{ y: 0, rotateX: 0, opacity: 1 }}
              transition={{ duration: slowDuration(0.4) }}
              className="Intitle text-2xl px-2 text-center md:text-2xl lg:text-5xl md:w-1/2"
            >
              AI <span className="text-green">Solutions</span> Across <br />{" "}
              Every <span className="text-green">Sectors</span>
            </motion.h1>

              <div
                className="relative w-full h-[70%]  lg:h-auto lg:w-1/2"
                style={{ perspective: "1000px" }}
              >
                {data.map((data, index) => (
                  <Card
                    key={index}
                    index={index}
                    title={data.title}
                    des={data.des}
                    list={data.list}
                    list2={data.list2}
                    className="card"
                  />
                ))}
              </div>
          </div>
        </div>

        {/* Other sections remain unchanged */}
        <div className="servicecount opacity-0 absolute top-0 left-0 w-full h-screen flex items-center justify-center">
            <Service data2={data2} leng={leng} />
        </div>

        <div className="braincont md:py-0 py-6 opacity-0 absolute top-0 left-0 overflow-auto w-full flex !z-[900] h-screen items-center justify-center">
          <div className="container mx-auto space-y-5 mb-0 px-4 md:px-0 lg:px-[100px] !z-[900]">
            <div className="font-Raleway flex md:flex-nowrap lg:flex-wrap flex-wrap gap-2 items-center justify-center  font-semibold text-center text-lg md:text-xl lg:text-3xl text-white leading-relaxed uppercase xl:w-3/4 w-full mx-auto">
              Meet the <span className="text-green font-Raleway">Brains</span>{" "}
              behind the{" "}
              <span className="text-green flex overflow-hidden items-center justify-center gap-2 font-Raleway">
                <span className="text-white font-Raleway">Innovation</span> at{" "}
                <Word>CODAGENTIC</Word>
              </span>
            </div>
            <div className="flex gap-6 lg:gap-10 md:gap-2 items-center justify-around md:justify-center md:flex-nowrap flex-wrap">
              {data4.length >= 2 && (
                <>
                  <Profilecard
                    title={data4[0].title}
                    role={data4[0].role}
                    image={data4[0].image}
                    descrp={data4[0].descrp}
                  />
                  <Profilecard
                    title={data4[1].title}
                    role={data4[1].role}
                    image={data4[1].image}
                    descrp={data4[1].descrp}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="belivecount opacity-0 absolute top-0 left-0 w-full h-screen flex items-center justify-center">
          <Believe />
        </div>

        <div className="clientcount opacity-0 absolute top-0 left-0 w-full">
          <Client data={data3} />
        </div>

        <div className="blogcount opacity-0 absolute top-0 left-0 w-full">
          <Blogs />
        </div>

        <div className="contactcount opacity-0 absolute top-0 left-0 w-full">
          <Contact />
        </div>

        <div className="footercount opacity-0 absolute top-0 left-0 w-full h-screen flex items-center justify-center">
          <Footer />
        </div>
      </div>

      {/* Scroll Triggers */}
      <div id="intro" className="About  h-[500vh] md:h-[500vh] lg:h-[1000vh] "></div>
      <div id="industries" className="Indust   h-[700vh] md:h-[800vh] lg:h-[1000vh]"></div>
      <div id="service" className="Service  h-[600vh] md:h-[1000vh] w-full"></div>
      <div id="about" className="Brains h-[200vh]  md:h-[300vh] lg:h-[400vh] w-full"></div>
      <div className="Belive md:h-[200vh] h-[300vh]  w-full"></div>
      <div className="Client h-[150vh]  md:h-[300vh] lg:h-[400vh]  w-full"></div>
      <div id="blogs" className="Blogs  h-[200vh] md:h-[300vh] lg:h-[400vh] w-full"></div>
      <div id="contact" className="Contact h-[400vh]  md:h-[400vh] w-full"></div>
      <div className="Footer h-[300vh] md:h-[400vh]  w-full"></div>
    </div>
  );
};

export default ScrollFixedAnimation;
