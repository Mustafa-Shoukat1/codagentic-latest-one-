import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slowDuration, slowInterval } from "../animationConfig";
import Welcome from "./Welcome";
import Word from './Word'
const DualLoader = ({ load1 = 0, togglePlay }) => {
  const [showTopLoader, setShowTopLoader] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scroll(0, 0);
    // document.body.style.overflow = 'hidden';
    // document.documentElement.style.overflow = 'hidden';
    // document.body.style.height = '100vh';
    // document.documentElement.style.height = '100vh';
    // document.body.style.touchAction = 'none';
    // document.documentElement.style.touchAction = 'none';

    setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 10;
      });
    }, slowInterval(500));


  }, [load1]);



  return (
    <AnimatePresence>

      <motion.div

        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, transition: { duration: slowDuration(0.1) } }}
        transition={{ duration: slowDuration(1), ease: "easeInOut" }}
        className="absolute inset-0 bg-[#00327c2d] backdrop-blur-2xl flex-col h-screen flex items-center justify-center text-white text-4xl !z-[1000]">
        <motion.img

          exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
          transition={{ duration: slowDuration(0.5), ease: "easeInOut" }}
          src="/loader2.gif"
          className="opacity-80"
          alt="Loading..."
        />

        <span className="text-green text-3xl py-2 font-Raleway">
          <Word>Loading</Word>
        </span>
        <div className="w-3/4 h-[4px] translate-y-40 bg-white rounded-full overflow-hidden mt-4">
          <motion.div
            className="h-full bg-green rounded-full "
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: slowDuration(0.5), ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </ AnimatePresence>

  );
};

export default DualLoader;