import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import LazyImage from "./LazyImage";

interface HeroSectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  backgroundImage?: string;
}

const HeroSection = ({
  title = "Discover Stories that Resonate with You",
  description = "Join our community of passionate writers and readers sharing ideas, experiences, and insights across various interests.",
  ctaText = "Join the Community",
  onCtaClick = () => console.log("CTA clicked"),
  backgroundImage = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80",
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-r from-slate-900 to-slate-700 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <LazyImage
          src={backgroundImage}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto text-center">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mb-6 sm:mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 sm:py-4 lg:py-6 text-sm sm:text-base lg:text-lg rounded-full"
            onClick={onCtaClick}
          >
            {ctaText}
          </Button>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-12 sm:h-16 bg-gradient-to-t from-background to-transparent" />

        <motion.div
          className="absolute -bottom-8 sm:-bottom-16 -left-8 sm:-left-16 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 rounded-full bg-primary/20 blur-3xl"
          animate={{
            x: [0, 10, 0],
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -top-8 sm:-top-16 -right-8 sm:-right-16 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 rounded-full bg-secondary/20 blur-3xl"
          animate={{
            x: [0, -10, 0],
            y: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default HeroSection;
