// src/components/Profilecard.jsx
import React from 'react';
import { Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Profilecard = ({ title, role, descrp, image, linkedin, github }) => {
  return (
    <motion.div
      className="relative w-full max-w-md mx-auto bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ on: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="p-8 text-center space-y-6">
        {/* Profile Image */}
        <motion.div
          className="relative mx-auto w-48 h-48"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={image || 'https://placehold.co/400x400?text=Founder'}
            alt={role}
            className="w-full h-full rounded-full object-cover border-4 border-green/40 shadow-xl"
          />
          <div className="absolute inset-0 rounded-full bg-green/20 blur-2xl -z-10 animate-pulse" />
        </motion.div>

        {/* Name */}
        <h3
          className="text-3xl font-bold text-white"
          dangerouslySetInnerHTML={{ __html: title || 'Name' }}
        />

        {/* Role */}
        <p className="text-xl text-green font-medium">{role || 'Role'}</p>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
          {descrp || 'No description available.'}
        </p>

        {/* Social Links - Only show if link exists */}
        <div className="flex justify-center gap-8 pt-4">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green hover:text-white transition-all hover:scale-125"
            >
              <Linkedin size={32} strokeWidth={2} />
            </a>
          )}

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green hover:text-white transition-all hover:scale-125"
            >
              <Github size={32} strokeWidth={2} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profilecard;