import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { motion } from 'framer-motion';
import { slowDuration, slowTimeout } from '../animationConfig';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { 
      id: 'hero', 
      label: 'Home', 
      elementSelector: '#hero'
    },
    { 
      id: 'about', 
      label: 'Who We Are', 
      elementSelector: '#about'
    },
    { 
      id: 'industries', 
      label: 'Industries', 
      elementSelector: '#industries'
    },
    { 
      id: 'services',
      label: 'Services', 
      elementSelector: '#services'
    },
    { 
      id: 'team',
      label: 'Team', 
      elementSelector: '#team'
    },
    { 
      id: 'believe', 
      label: 'Believe', 
      elementSelector: '#believe'
    },
    { 
      id: 'clients',
      label: 'Clients', 
      elementSelector: '#clients'
    },
    { 
      id: 'blogs', 
      label: 'Blogs', 
      elementSelector: '#blogs'
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      elementSelector: '#contact'
    }
  ];

  useEffect(() => {
    // Create ScrollTrigger for each section using the trigger classes from Hero.jsx
    const triggerConfigs = [
      { id: 'hero', trigger: '.hero', start: "top 80%", end: "bottom 20%" },
      { id: 'about', trigger: '.About', start: "top 60%", end: "bottom 40%" },
      { id: 'industries', trigger: '.Indust', start: "top 60%", end: "bottom 40%" },
      { id: 'services', trigger: '.Service', start: "top 60%", end: "bottom 40%" },
      { id: 'team', trigger: '.Brains', start: "top 60%", end: "bottom 40%" },
      { id: 'believe', trigger: '.Belive', start: "top 60%", end: "bottom 40%" },
      { id: 'clients', trigger: '.Client', start: "top 60%", end: "bottom 40%" },
      { id: 'blogs', trigger: '.Blogs', start: "top 60%", end: "bottom 40%" },
      { id: 'contact', trigger: '.Contact', start: "top 60%", end: "bottom 40%" }
    ];

    triggerConfigs.forEach(({ id, trigger, start, end }) => {
      ScrollTrigger.create({
        trigger: trigger,
        start: start,
        end: end,
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
        markers: false
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.onEnter) {
          trigger.kill();
        }
      });
    };
  }, []);

  const handleNavigation = (id, elementSelector) => {
    console.log(`Navigating to ${id} using element ${elementSelector}`);
    
    // Kill any ongoing scroll animations
    gsap.killTweensOf(window);
    
    let scrollPosition = 0;
    
    if (elementSelector === '#hero') {
      scrollPosition = 0;
    } else {
      // First try to find by ID, if not found, try by matching class name
      let element = document.querySelector(elementSelector);
      
      // Fallback for sections that might have different ID vs class mapping
      if (!element) {
        const classMapping = {
          '#services': '.Service',
          '#team': '.Brains', 
          '#believe': '.Belive',
          '#clients': '.Client',
          '#blogs': '.Blogs',
          '#contact': '.Contact',
          '#about': '.About',
          '#industries': '.Indust'
        };
        
        const fallbackSelector = classMapping[elementSelector];
        if (fallbackSelector) {
          element = document.querySelector(fallbackSelector);
          console.log(`Using fallback selector ${fallbackSelector} for ${elementSelector}`);
        }
      }
      
      if (element) {
        scrollPosition = element.offsetTop;
        console.log(`Found element ${elementSelector} at position ${scrollPosition}`);
      } else {
        console.log(`Element ${elementSelector} not found`);
        return;
      }
    }
    
    // Set active section immediately
    setActiveSection(id);
    
    // Use GSAP to scroll
    gsap.to(window, {
      duration: 1.5,
      scrollTo: scrollPosition,
      ease: "power2.inOut",
      onComplete: () => {
        console.log(`Scrolled to ${scrollPosition} for ${id}`);
        // Refresh ScrollTrigger after scroll
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, slowTimeout(100));
      }
    });

    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[9999] md:hidden bg-black/20 backdrop-blur-lg p-2 rounded-lg"
      >
        <div className="w-6 h-5 relative flex flex-col justify-between">
          <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Desktop Navigation */}
      <nav className="fixed right-10 top-1/2 -translate-y-1/2 z-[9999] hidden md:block">
        <motion.ul 
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: slowDuration(0.5), delay: slowDuration(0.2) }}
        >
          {sections.map(({ id, label, elementSelector }) => (
            <motion.li 
              key={id}
              whileHover={{ x: -10 }}
              transition={{ duration: slowDuration(0.2) }}
            >
              <button
                onClick={() => handleNavigation(id, elementSelector)}
                className={`relative group flex items-center gap-2 ${
                  activeSection === id ? 'text-green' : 'text-white'
                }`}
              >
                <span className={`w-8 h-[2px] ${
                  activeSection === id ? 'bg-green' : 'bg-white'
                } group-hover:w-12 transition-all duration-300`} />
                <span className="text-sm uppercase tracking-wider font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {label}
                </span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      {/* Mobile Navigation */}
      <motion.nav
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed top-0 right-0 bottom-0 w-64 bg-black/95 backdrop-blur-xl z-[9998] md:hidden"
      >
        <ul className="flex flex-col gap-4 p-8 mt-20">
          {sections.map(({ id, label, elementSelector }) => (
            <li key={id}>
              <button
                onClick={() => handleNavigation(id, elementSelector)}
                className={`w-full text-left py-2 relative ${
                  activeSection === id ? 'text-green' : 'text-white'
                }`}
              >
                <span className={`absolute left-0 bottom-0 h-[2px] ${
                  activeSection === id ? 'w-full bg-green' : 'w-0 bg-white'
                } transition-all duration-300`} />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
};

export default Navigation;