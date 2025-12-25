import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import Loading from "./Loading";
// import {motion} from "framer-motion"
// import ParticlesComponent from "./Particles";
const Background = ({ children }) => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const [load2, setLoad2] = useState(0);

  useEffect(() => {
    const createParticles = () => {
      // Reduced from 15 to 8 particles for faster startup and better performance
      const totalParticles = 8;
      const container = containerRef.current;

      if (!container) return;

      // Create normal particles
      particlesRef.current = Array.from({ length: totalParticles }, (_, index) => {
        const particle = document.createElement("div");

        // Randomize size
        const sizeMultiplier = Math.random() < 0.2 ? 1 : 0.6; // 20% of particles will be larger
        const size = 5 * sizeMultiplier;

        // Randomize color and blur
        const shades = ["bg-blue-200", "bg-gray-200"];
        const blurClass = Math.random() < 0.7 ? "" : "blur-[1px]"; // 30% will be blurred
        const colorClass = shades[Math.floor(Math.random() * shades.length)];

        particle.className = `absolute ${colorClass === "bg-blue-200" ? " " : ""} rounded-full ${colorClass} ${blurClass}`;
        Object.assign(particle.style, {
          width: `${size}px`,
          height: `${size}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        });

        container.appendChild(particle);

        gsap.to(particle, {
          y: gsap.utils.random(-100, 200),
          x: gsap.utils.random(-100, 200),
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
        setLoad2(1);

        return particle;
      });

 
    };

    createParticles();

    return () => {
      particlesRef.current.forEach((particle) => particle.remove());
      particlesRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed !z-[-1] w-full bg-[#00000073]  h-screen overflow-hidden"
      // style={{
      //   background: `
      //     linear-gradient(135deg, rgba(10, 15, 25, 0.5) 0%, rgba(20, 40, 90, 0.5) 50%, rgba(10, 15, 25, 0.5) 100%)
      //   `,
      // }}
    >
      <div className="relative">{children}</div>
    </div>
  );
};

export default Background;