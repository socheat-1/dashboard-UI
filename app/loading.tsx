
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { domAnimation, LazyMotion, motion } from "framer-motion";

export default function GlobalLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
   <LazyMotion features={domAnimation}>
      <div className='fixed inset-0 z-[1000] flex items-center justify-center dark:bg-gray-900 bg-white/70 backdrop-blur-md'>
        <div className="relative inline-flex justify-center items-center w-[120px] h-[120px]">
          <motion.div
            animate={{ scale: [1, 0.9, 0.9, 1, 1], opacity: [1, 0.48, 0.48, 1, 1] }}
            transition={{ duration: 2, repeatDelay: 1, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex"
          >
            {/* Replace with your logo */}
            <h1 className="font-bold">LOGO</h1>
            {/* <img src="/assets/images/logo/osrf-logo.png" className="w-[64px] h-[64px]" alt="" /> */}
          </motion.div>

          <motion.div
            animate={{
              scale: [1.6, 1, 1, 1.6, 1.6],
              rotate: [270, 0, 0, 270, 270],
              opacity: [0.25, 1, 1, 1, 0.25],
              borderRadius: ['25%', '25%', '50%', '50%', '25%'],
            }}
            transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
            className="absolute w-[calc(100%-20px)] h-[calc(100%-20px)] border-[3px] border-[#5f74fe]"
          />

          <motion.div
            animate={{
              scale: [1, 1.2, 1.2, 1, 1],
              rotate: [0, 270, 270, 0, 0],
              opacity: [1, 0.25, 0.25, 0.25, 1],
              borderRadius: ['25%', '25%', '50%', '50%', '25%'],
            }}
            transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
            className="absolute w-full h-full border-[8px] border-[#5f74fe]"
          />
        </div>
      </div>
    </LazyMotion>
  );
}
