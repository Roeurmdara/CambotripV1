"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Feature {
  step: string;
  title?: string;
  content: string;
  image: string;
}

interface FeatureStepsProps {
  features: Feature[];
  className?: string;
  title?: string;
  autoPlayInterval?: number;
  imageHeight?: string;
}

export function FeatureSteps({
  features,
  className,
  autoPlayInterval = 3000,
  imageHeight = "h-[400px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100));
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress, features.length, autoPlayInterval]);

  return (
    <div className={cn("w-full", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Left side - Steps */}
          <div className="order-2 md:order-1 space-y-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-6 cursor-pointer group"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.4 }}
                transition={{ duration: 0.5 }}
                onClick={() => {
                  setCurrentFeature(index);
                  setProgress(0);
                }}
              >
                {/* Step number */}
                <div className="flex-shrink-0">
                  <motion.div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300",
                      index === currentFeature
                        ? "bg-black dark:bg-white border-black dark:border-white text-white dark:text-black"
                        : "bg-white dark:bg-black border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-300 group-hover:border-gray-400 dark:group-hover:border-gray-400"
                    )}
                    animate={{ scale: index === currentFeature ? 1.05 : 1 }}
                  >
                    {index < currentFeature ? (
                      <span className="text-lg">✓</span>
                    ) : (
                      <span className="text-sm font-light">{index + 1}</span>
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-300 font-light mb-2">
                    {feature.step}
                  </p>
                  <h3 className="text-2xl font-light text-black dark:text-white mb-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300 font-light leading-relaxed">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right side - Image */}
          <div className={`order-1 md:order-2 relative overflow-hidden bg-gray-200 dark:bg-gray-800 ${imageHeight}`}>
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.title || feature.step}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
