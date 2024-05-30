/*
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import axios from "axios";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Preloader = ({ setLoading }) => {
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    if (progress === 100) {
      const tl = gsap.timeline();
      tl.to("#overlay", {
        y: -800,
        duration: 1.2,
        opacity: 0,
        delay: 0.1,
        onComplete: () => setLoading(false),
      });
    } else {
      gsap.to("#count", {
        fontSize: `${100 - (progress / 100) * 60}px`, //Decrease font size from 100px to 40px
        duration: 0.4,
      });
    }
  }, [progress]);

  useEffect(() => {
    const incrementProgress = () => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const nextProgress = prev + Math.floor(Math.random() * 20) + 5; //Increased range for faster progress
          if (nextProgress >= 80) {
            clearInterval(interval);
            checkApiStatus();
          }
          return Math.min(nextProgress, 80);
        });
      }, 500); //Reduced interval time for faster updates
    };

    const checkApiStatus = async () => {
      try {
        let { data } = await axios.get(
          "https://qshrink.fun/api/healthcheck"
        );
        console.log("API data:", data);
        if (data.status === 200) {
          setProgress(100);
        }
      } catch (error) {
        console.error("API error:", error);
      }
    };

    incrementProgress();
  }, [setLoading]);

  return (
    <div
      id="overlay"
      className="fixed inset-0 flex items-center justify-center bg-[#370c5f] z-50"
    >
      <div
        id="count"
        className="text-center font-outfit uppercase text-white text-[100px] font-bold"
      >
        {progress}%
      </div>
    </div>
  );
};

export default Preloader;
*/

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import axios from "axios";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Preloader = ({ setLoading }) => {
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    if (progress === 100) {
      const tl = gsap.timeline();
      tl.to("#overlay", {
        y: -800,
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => setLoading(false),
      });
    } else {
      gsap.to("#count", {
        fontSize: `${100 - (progress / 100) * 60}px`, // Decrease font size from 100px to 40px
        duration: 0.4,
      });
      gsap.to("#progress-bar", {
        width: `${100 - progress}%`, // Decrease width from 100% to 0%
        duration: 1,
      });
    }
  }, [progress]);

  useEffect(() => {
    const incrementProgress = () => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const nextProgress = prev + Math.floor(Math.random() * 20) + 5; // Increased range for faster progress
          if (nextProgress >= 80) {
            clearInterval(interval);
            checkApiStatus();
          }
          return Math.min(nextProgress, 80);
        });
      }, 500); // Reduced interval time for faster updates
    };

    const checkApiStatus = async () => {
      try {
        let { data } = await axios.get(
          "https://qshrink.fun/api/healthcheck"
        );
        console.log("API data:", data);
        if (data.status === 200) {
          setProgress(100);
        }
      } catch (error) {
        console.error("API error:", error);
      }
    };

    incrementProgress();

  }, [setLoading]);

  return (
    <div
      id="overlay"
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#370c5f] z-50"
    >
      <div
        id="count"
        className="text-center font-outfit uppercase text-white text-[100px] font-bold"
      >
        {progress}%
      </div>
      <div id="progress-bar-wrapper" className="w-[80%] h-2 bg-transparent mt-10 flex justify-center items-center">
        <div id="progress-bar" className="h-full bg-[#2600dc]" style={{ width: `${100 - progress}%` }}></div>
      </div>
    </div>
  );
};

export default Preloader;