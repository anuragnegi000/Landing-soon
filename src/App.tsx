"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import "./index.css";

export default function ComingSoon() {
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const currentDate = new Date(); // Get the current date and time
    const targetDate = new Date(currentDate); // Create a new Date object based on the current date
    targetDate.setDate(currentDate.getDate() + 6); // Add 4 days to the current date

    const updateCountdown = () => {
      const now = new Date();
      const difference = Math.max(targetDate.getTime() - now.getTime(), 0); // Ensure difference is not negative

      const totalHours = Math.floor(difference / (1000 * 60 * 60)); // Total hours remaining
      const hours = totalHours % 24; // Hours after accounting for full days
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setCountdown({ hours, minutes, seconds });
    };

    updateCountdown(); // Initial call to set the countdown immediately
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-12 max-w-4xl mx-auto z-10"
      >
        <div className="flex flex-col items-center gap-6">
          <img
            src="https://i.ibb.co/dGQ933K/live24.png"
            alt="Live24 Logo"
            width={200}
            height={80}
            className="animate-float"
          />
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="text-indigo-100">live24.fun</span>
          </h1>
        </div>

        <CountdownTimer countdown={countdown} />

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="space-y-4 text-xl md:text-2xl"
          >
            <AnimatedText text="Trade on pump.fun" />
            <AnimatedText text="Live stream on live24.fun" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="pt-8"
        ></motion.div>
      </motion.div>
      <Footer />
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-black to-black animate-pulse" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-50 mix-blend-soft-light" />
    </div>
  );
}

function CountdownTimer({
  countdown,
}: {
  countdown: { hours: number; minutes: number; seconds: number };
}) {
  return (
    <div className="flex flex-wrap gap-4 justify-center text-center">
      {Object.entries(countdown).map(([unit, value]) => (
        <motion.div
          key={unit}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2 * Object.keys(countdown).indexOf(unit),
          }}
          className="flex flex-col items-center justify-center text-sm sm:text-base md:text-lg p-2 sm:p-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow w-20 sm:w-24"
        >
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {value}
          </div>
          <div className="text-xs sm:text-sm md:text-base uppercase text-purple-300">
            {unit}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AnimatedText({ text }: { text: string }) {
  return (
    <p className="flex items-center justify-center space-x-2">
      <Sparkles className="text-yellow-400" />
      <span className="text-indigo-600">{text}</span>
    </p>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-4 text-center text-sm text-gray-500">
      © 2024 live24.fun | All rights reserved
    </footer>
  );
}
