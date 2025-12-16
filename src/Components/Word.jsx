import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { slowDuration } from "../animationConfig";

const DURATION = slowDuration(0.8);
const STAGGER = slowDuration(0.35);
const DELAY = slowDuration(8); // scaled delay between animation cycles

const Word = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px" }); // Detects viewport entry
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let interval;
    if (isInView) {
      setAnimate(true);
      interval = setInterval(() => {
        setAnimate((prev) => !prev); // Toggle animation to restart it
      }, (DURATION + STAGGER * children.length) * 1000 + DELAY * 1000); // Animation duration + delay
    } else {
      clearInterval(interval);
      setAnimate(false);
    }

    return () => clearInterval(interval);
  }, [isInView, children.length]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={animate ? "animated" : "initial"}
      className="relative block uppercase  overflow-hidden whitespace-nowrap"
      style={{ lineHeight: 0.75 }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              animated: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="!absolute  !inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              animated: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default Word;
