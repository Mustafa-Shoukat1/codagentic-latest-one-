import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { MoveRight } from "lucide-react";

// PERFECT HERO BACKGROUND - EXACT MATCH TO MAIN SITE + MOUSE PARALLAX
// Enhanced 3D Logo with breathing + hover
const AILogo3D = ({ mouseX, mouseY, isHovering }) => {
  const rotateX = useSpring(0, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 25 });
  const scale = useSpring(1, { stiffness: 400, damping: 30 });

  useEffect(() => {
    if (isHovering) {
      rotateY.set((mouseX.get() / window.innerWidth - 0.5) * 30);
      rotateX.set((mouseY.get() / window.innerHeight - 0.5) * -30);
      scale.set(1.12);
    } else {
      rotateX.set(Math.sin(Date.now() * 0.001) * 3);
      rotateY.set(Math.cos(Date.now() * 0.0012) * 4);
      scale.set(1);
    }
  }, [mouseX, mouseY, isHovering, rotateX, rotateY, scale]);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      className="relative"
    >
      {/* Glow layers */}
      {[0, 1, 2].map((i) => (
        <motion.img
          key={i}
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Codagentic%20Logo-9cWJs4szHX70H5JN8onpdaaAX0hqwO.png"
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            filter: `blur(${i * 10}px) brightness(1.8)`,
            opacity: 0.18 - i * 0.06,
          }}
          animate={{ opacity: isHovering ? 0.3 : 0.18 - i * 0.06 }}
        />
      ))}

      <motion.img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Codagentic%20Logo-9cWJs4szHX70H5JN8onpdaaAX0hqwO.png"
        alt="CodAgentic AI Logo"
        className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
        animate={{
          filter: isHovering
            ? "brightness(1.4) saturate(1.6) drop-shadow(0 0 50px rgba(0,191,255,0.9))"
            : "brightness(1.1) saturate(1.2) drop-shadow(0 0 25px rgba(0,191,255,0.5))",
        }}
        transition={{ duration: 1.5 }}
      />
    </motion.div>
  );
};


const Welcome = ({ togglePlay, startAutoScroll }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLogoHovering, setIsLogoHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  }, [mouseX, mouseY]);

  const handleStart = () => {
    setIsVisible(false); // Start exit animation
    
    // Save token for future visits
    localStorage.setItem("authToken", JSON.stringify({ 
      token: "show", 
      expiry: Date.now() + 7200000 
    }));

    // Wait for exit animation to complete, THEN show main site
    setTimeout(() => {
      // CRITICAL: Tell Main.jsx that Welcome is done
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("welcome-completed"));
      }

      // Restore scrolling
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      
      // Start audio
      togglePlay?.();
      
      // Scroll to first section and start auto-scroll
      setTimeout(() => {
        const intro = document.getElementById("intro");
        if (intro) {
          intro.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        
        // Start auto-scroll after smooth scroll completes
        setTimeout(() => {
          startAutoScroll?.();
        }, 4000);
      }, 600);
    }, 1600); // Matches your exit animation duration
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      // Clean up when welcome is hidden
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-black"
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 0.92,
            transition: { duration: 1.6, ease: "easeInOut" }
          }}
        >
          {/* Video Background */}
          <div className="fixed inset-0 -z-20 overflow-hidden">
            <video
              src="/bg4.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-bottom"
              style={{ opacity: 0.9 }}
              ref={(el) => {
                if (el) el.playbackRate = 0.5;
              }}
            />
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          </div>

          {/* Mouse Glow */}
          <motion.div
            className="pointer-events-none fixed inset-0 z-20"
            style={{
              background: `radial-gradient(700px at ${mouseX}px ${mouseY}px, rgba(0,191,255,0.12), transparent 80%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-30 flex flex-col items-center justify-center h-full px-8 text-center max-w-7xl mx-auto">
            {/* Logo */}
            <motion.div
              className="w-80 h-40 md:w-[600px] md:h-64 mb-12"
              onHoverStart={() => setIsLogoHovering(true)}
              onHoverEnd={() => setIsLogoHovering(false)}
              initial={{ y: -120, opacity: 0, rotate: -15 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
            >
              <AILogo3D mouseX={mouseX} mouseY={mouseY} isHovering={isLogoHovering} />
            </motion.div>

            {/* Title & Subtitle */}
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.6, delay: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="h-1 w-64 md:w-96 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />
              <p className="text-lg md:text-2xl text-gray-300 font-light max-w-4xl leading-relaxed">
                Redefining Business Excellence, where AI Meets Business Transformation.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.4, delay: 1.6, ease: "easeOut" }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="mt-20 px-16 py-6 text-xl font-semibold text-white bg-cyan-600/20 backdrop-blur-xl border border-cyan-500/50 rounded-full hover:bg-cyan-600/40 transition-all duration-500 shadow-2xl shadow-cyan-500/40 flex items-center gap-4 group"
            >
              Enter the Future
              <MoveRight className="w-7 h-7 group-hover:translate-x-4 transition-transform duration-500" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Welcome;