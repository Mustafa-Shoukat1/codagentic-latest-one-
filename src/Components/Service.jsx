import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from 'framer-motion'
import { Brain, GitGraph, RefreshCcwDot, Atom, Cpu } from 'lucide-react';
import axios from 'axios'
import { format } from 'date-fns';
import NetworkVisual from "./NetworkVisual";
gsap.registerPlugin(ScrollTrigger);

const Service = ({ data2, leng }) => {
  // const [data, setData] = useState([])
  // const [leng,setLeng] = useState() 
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const url = import.meta.env.VITE_SERVER;

  const serviceContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const services = [
    {
      name: "Generative AI",
      details: "Create smart systems that automate tasks, solve problems, and generate content.",
      bgcolor: "#64B5F6"
    },
    {
      name: "RAG Apps",
      details: "Chat with your confidential and large-scale data on your local environment.",
      bgcolor: "#00c5bb"
    },
    {
      name: "AI Automation",
      details: "Our custom agents automate it all. Be it any industry, any business, or any challenge.",
      bgcolor: "#1BE47F"
    },
    {
      name: "Data Science",
      details: "Automate web scraping to collect targeted data from online sources and analyze it to uncover business insights.",
      bgcolor: "#FFD798"
    },
  ];

  const tagLists = [
    [
      services[0].name.toUpperCase(),
      "Text AI", "AI Write", "AI Blog", "Text2Img", "Text2Vid", "Code AI", "Story AI",
      "Creative AI", "Deep AI", "Summarize", "SEO AI", "Chat AI", "Brand AI",
      "AI Ads", "Email AI", "Script AI", "Social AI", "AI Gen", "AI Art", "AI Assist"
    ],
    [
      services[1].name.toUpperCase(),
      "RAG AI", "Data Chat", "Secure AI", "Fast Search", "Smart Query", "AI Docs",
      "Context AI", "Hybrid AI", "Data AI", "Index AI", "Graph AI", "Private AI",
      "QA Bot", "AI Memory", "Data Link", "AI Sync", "Local AI", "Retrieval",
      "Custom AI", "Smart FAQ"
    ],
    [
      services[2].name.toUpperCase(),
      "Auto AI", "AI Bots", "Task AI", "AI HR", "AI CRM", "AI Mail", "Self-Learn",
      "AI Biz", "AI Plan", "Smart AI", "AI Work", "Auto Data", "Predict AI",
      "AI Notify", "AI Help", "Auto Flow", "AI Sort", "AI Track", "AI Speed", "Biz AI"
    ],
    [
      services[3].name.toUpperCase(),
      "ML Ops", "Data AI", "Scrape AI", "Big Data", "Auto Data", "AI Sort",
      "Data Map", "BI AI", "AI Risk", "Data Flow", "AI Clean", "Smart DB",
      "AI Finance", "AI Forecast", "AI Store", "Data Ops", "AI Stock",
      "Real-Time", "Data Gov", "Market AI"
    ],
  ];

  let sections = leng;

  const mobileSettings = {
    end: `+=${sections * window.innerHeight}`,
  };
  const desktopSettings = {
    end: 'bottom bottom',
  };

  useGSAP(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.Service',
        // pin: true,
        start: "top top",
        scrub: 1,
        snap: {
          snapTo: "labelsDirectional",
          duration: { min: 0.8, max: 1.6 },
          ease: "power1.inOut",
          inertia: false
        },
        ...(isMobile ? mobileSettings : desktopSettings)
      }
    });

    for (let i = 0; i < leng; i++) {
      // Add label for snap points
      tl.addLabel(`section${i}`);

      // Fade out current content and network simultaneously
      tl.to(".service-text h1", {
        opacity: 0,
        y: 15,
        ease: "power2.inOut",
        duration: 1.2
      }, `section${i}`)
        .to(".service-text h2", {
          opacity: 0,
          y: 15,
          ease: "power2.inOut",
          duration: 1.2
        }, `section${i}`)
        .to(".service-text p", {
          opacity: 0,
          y: 15,
          ease: "power2.inOut",
          duration: 1.2
        }, `section${i}`)
        .to('.networks', {
          rotationZ: -15,
          rotationX: -15,
          rotationY: 25,
          scale: 0.95,
          opacity: 0,
          duration: 1.2,
          ease: "power2.inOut"
        }, `section${i}`)

        // Update active index
        .add(() => setActiveIndex(i))

        // Bring in new content - network and text together
        .fromTo('.networks',
          {
            rotationZ: 15,
            rotationX: 15,
            rotationY: -25,
            scale: 0.95,
            opacity: 0
          },
            {
            rotationZ: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            opacity: 1,
            duration: 1.6,
            ease: "power2.out"
          }
        )
        .fromTo([".service-text h1", ".service-text h2", ".service-text p"],
          {
            opacity: 0,
            y: -15
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.6,
            ease: "power2.out",
            stagger: 0.4
          },
          "<"
        );
    }
  }, [leng, isMobile]);

  return (
    <div ref={serviceContainerRef}
      className="h-[100vh] container mx-auto flex items-center !justify-center font-poppins !z-[999] relative overflow-hidden">
      <motion.div
        className="w-full lg:w-[60%]"
      >
        {
          data2.length > 0 &&
          <NetworkVisual styles={'networks'} tags={data2[activeIndex].subServices} radius={240} bgcolor={data2[activeIndex].color} />
        }
      </motion.div>
      <div className="w-full bg-[#00000034] md:bg-transparent lg:static absolute bottom-[5px]  rounded-lg  min-h-[180px] box-border p-2 backdrop-blur-xs md:backdrop-blur-none">
        <h1 className="text-sm md:text-lg text-green">Our Service</h1>
        {
          data2.length > 0 &&
          <div className="service-text space-y-2">
            <h2 className="text-white text-xl lg:text-4xl">{data2[activeIndex].name}</h2>
            <p className="text-green text-lg lg:text-xl md:w-1/2 lg:w-auto leading-relaxed">{data2[activeIndex].description}</p>
          </div>
        }
      </div>
    </div>
  );
};

export default Service;