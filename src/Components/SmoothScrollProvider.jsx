import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { slowTimeout } from "../animationConfig";

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollProvider = ({ children }) => {
  useGSAP(() => {
    let lenis;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const initLenis = () => {
      lenis = new Lenis({
        lerp: isMobile ? 0.1 : 0.07,
        smoothWheel: true,
        smoothTouch: true,
        wheelMultiplier: isMobile ? 1.2 : 1.5,
        touchMultiplier: isMobile ? 2.5 : 2,
        infinite: false,
        normalizeWheel: true,
        syncTouchLerp: 0.3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchInertiaMultiplier: 3.5,
        gestureOrientation: 'vertical',
        orientation: 'vertical'
      });

      // Improved touch handling
      if (isMobile) {
        let lastTouchY = 0;
        let isScrolling = false;

        const handleTouchMove = (e) => {
          if (!isScrolling) return;
          
          const deltaY = lastTouchY - e.touches[0].clientY;
          lenis.delta = deltaY * 3.5;
          lastTouchY = e.touches[0].clientY;
        };

        const handleTouchStart = (e) => {
          isScrolling = true;
          lastTouchY = e.touches[0].clientY;
          lenis.velocity = 0;
          lenis.direction = Math.sign(lenis.velocity);
        };

        const handleTouchEnd = () => {
          isScrolling = false;
          lenis.velocity *= 4.2;
          setTimeout(() => {
            lenis.velocity = 0;
          }, slowTimeout(2000));
        };

        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        // Cleanup
        return () => {
          window.removeEventListener('touchstart', handleTouchStart);
          window.removeEventListener('touchmove', handleTouchMove);
          window.removeEventListener('touchend', handleTouchEnd);
        };
      }

      // Improved ScrollTrigger sync
      lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
        ScrollTrigger.update();
        gsap.ticker.wake();
      });

      const resizeObserver = new ResizeObserver(() => {
        lenis.resize();
        ScrollTrigger.refresh(true);
      });
      
      resizeObserver.observe(document.documentElement);
      window.addEventListener('orientationchange', () => {
        setTimeout(() => {
          lenis.resize();
          ScrollTrigger.refresh(true);
        }, slowTimeout(500));
      });

      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      // Force refresh after initialization
      setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh(true);
      }, slowTimeout(1000));
    };

    // Initialize after slight delay
    const initTimeout = setTimeout(() => {
      if (document.readyState === "complete") {
        initLenis();
      } else {
        window.addEventListener("load", initLenis);
      }
    }, slowTimeout(500));

    return () => {
      clearTimeout(initTimeout);
      if (lenis) {
        lenis.destroy();
        window.removeEventListener("load", initLenis);
      }
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;