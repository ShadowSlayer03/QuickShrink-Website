import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import { useGSAP } from "@gsap/react";

const Hero = ({ timeline, initialLoading }) => {
  const { scroll } = useLocomotiveScroll();
  const homeHeading = useRef();
  const shrinkBtn = useRef();

  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);
  const text1 = useRef();
  const text2 = useRef();
  const text3 = useRef();

  const textEffect = (setHovered) => {
    setHovered(true);
    setTimeout(() => {
      setHovered(false);
    }, 1000);
  };

  useGSAP(() => {
    gsap.set(homeHeading.current, {
      x: -500,
      opacity: 0,
    });

    timeline
      .to(homeHeading.current, {
        x: 0, // Start from the right
        opacity: 1,
        duration: 1,
        delay: 0.1,
        ease: "power2.out",
      })
      .to(
        homeHeading.current,
        {
          scaleX: 0.5, // Compress the heading from left to right
          duration: 0.5,
          ease: "power2.out",
        },
        "+=0.1"
      )
      .to(homeHeading.current, {
        scaleX: 1, // Bounce back to original position
        duration: 0.5,
        ease: "bounce.out",
      })
      .from("h2 span, .commas", {
        y: 50,
        opacity: 0,
        duration: 0.5,
      })
      .from(shrinkBtn.current, {
        y: 50,
        opacity: 0,
        duration: 0.5,
      })
      .call(() => textEffect(setHovered1))
      .call(() => textEffect(setHovered2))
      .call(() => textEffect(setHovered3));
  }, [timeline]);

  useEffect(() => {
    let spanChildren = text1.current?.querySelectorAll("span");
    if (hovered1) {
      gsap.to(spanChildren, {
        y: "-110%",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(spanChildren, {
        y: "0%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [hovered1]);

  useEffect(() => {
    let spanChildren = text2.current?.querySelectorAll("span");
    if (hovered2) {
      gsap.to(spanChildren, {
        y: "-110%",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(spanChildren, {
        y: "0%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [hovered2]);

  useEffect(() => {
    let spanChildren = text3.current?.querySelectorAll("span");
    if (hovered3) {
      gsap.to(spanChildren, {
        y: "-110%",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(spanChildren, {
        y: "0%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [hovered3]);

  const handleClickShorten = () => {
    scroll.scrollTo(document.getElementById("shorten"));
  };

  return (
    <div
      id="home"
      className="w-full h-[100vh] relative z-0 bg-hero-abstract bg-center bg-cover flex flex-col gap-6 items-center justify-center"
    >
      {initialLoading ? (
        <></>
      ) : (
        <>
          <h1
            ref={homeHeading}
            className="text-white text-6xl sm:text-8xl lg:text-9xl font-lobster"
          >
            QuickShrink
          </h1>
          <div className="flex gap-1">
            <h2
              ref={text1}
              onMouseEnter={() => setHovered1(true)}
              onMouseLeave={() => setHovered1(false)}
              className="h-7 md:h-[1.6vw] flex flex-col overflow-hidden leading-6 font-outfit text-white text-xl"
            >
              <span>Simplify</span>
              <span>Simplify</span>
            </h2>
            <span className="commas text-white text-xl font-outfit">,</span>
            <h2
              ref={text2}
              onMouseEnter={() => setHovered2(true)}
              onMouseLeave={() => setHovered2(false)}
              className="h-7 md:h-[1.6vw] flex flex-col overflow-hidden leading-6 font-outfit text-white text-xl"
            >
              <span>Shorten</span>
              <span>Shorten</span>
            </h2>
            <span className="commas text-white text-xl font-outfit">,</span>
            <h2
              ref={text3}
              onMouseEnter={() => setHovered3(true)}
              onMouseLeave={() => setHovered3(false)}
              className="h-7 md:h-[1.6vw] flex flex-col overflow-hidden leading-6 font-outfit text-white text-xl"
            >
              <span>Share</span>
              <span>Share</span>
            </h2>
          </div>
          <button
            ref={shrinkBtn}
            className="light font-outfit text-white bg-[#7421fc] shadow-lg px-2 md:px-4 py-2 rounded-md text-sm md:text-base"
            onClick={handleClickShorten}
          >
            Shrink Now
          </button>
        </>
      )}
    </div>
  );
};

export default Hero;
