import React, { useState, useEffect, useRef } from "react";
import Shorten from "./components/Shorten";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Socials from "./components/Socials";
import LocomotiveScroll from "locomotive-scroll";
import ReactModal from "react-modal";
import Navbar from "./components/Navbar";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import Preloader from "./components/Preloader"; // Import Preloader
import gsap from "gsap";
import Support from "./components/Support";

ReactModal.setAppElement("#root");

function App() {
  const [scroll, setScroll] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading
  const containerRef = useRef(null);

  const timeline = gsap.timeline();

  useEffect(() => {
    if (!scroll && containerRef.current) {
      const scrollInstance = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        smartphone: {
          smooth: true, // Enable smooth scrolling on smartphones
        },
        tablet: {
          smooth: true, // Enable smooth scrolling on tablets
        },
      });

      setScroll(scrollInstance);

      return () => {
        scrollInstance.destroy();
      };
    }
  }, [scroll, containerRef]);

  return (
    <>
      {loading ? (
        <>
          <Preloader setLoading={setLoading} />
          <Hero initialLoading={true} timeline={timeline} />
        </>
      ) : (
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            smartphone: {
              smooth: true, // Enable smooth scrolling on smartphones
            },
            tablet: {
              smooth: true, // Enable smooth scrolling on tablets
            },
          }}
          watch={[scroll]}
          containerRef={containerRef}
        >
          <main
            data-scroll-container
            ref={containerRef}
            className={`transition-opacity duration-1000 ease-in-out ${loading ? 'opacity-0' : 'opacity-100'}`}
          >
            <Navbar timeline={timeline} />
            <Hero initialLoading={false} timeline={timeline} />
            <Features />
            <Shorten />
            <Support />
            <Socials scroll={scroll} />
          </main>
        </LocomotiveScrollProvider>
      )}
    </>
  );
}

export default App;