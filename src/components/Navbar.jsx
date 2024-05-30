import { useGSAP } from "@gsap/react";
import React, { useEffect, useState, useRef } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";

const Navbar = ({ timeline }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scroll } = useLocomotiveScroll();
  const menuRef = useRef(null);

  useGSAP(() => {
    timeline.from("#logo-container", {
      y: -200,
      duration: 1,
      delay: 0.2,
      opacity: 0,
    });
    timeline.from("#hamburger, #bookmarks li", {
      y: -200,
      duration: 0.8,
      delay: 0.1,
      stagger: 0.3,
      ease: "power3.inOut"
    });
  }, [timeline]);

  useEffect(() => {
    if (!scroll) return;

    const handleScroll = (instance) => {
      if (instance.scroll.y > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    scroll.on("scroll", handleScroll);

    // Clean up the event listener
    return () => scroll.off("scroll", handleScroll);
  }, [scroll]);

  const handleClickShorten = () => {
    scroll.scrollTo(document.getElementById("shorten"));
  };

  const handleClickHome = () => {
    scroll.scrollTo(document.getElementById("home"));
  };

  const handleClickFeatures = () => {
    scroll.scrollTo(document.getElementById("features"));
  };

  const handleClickSupport = () => {
    scroll.scrollTo(document.getElementById("support"));
  };

  const handleClickSocials = () => {
    scroll.scrollTo(document.getElementById("socials"));
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className={`w-[100vw] md:w-full font-outfit flex items-center justify-between px-6 py-2 fixed z-10 transition-all ${
        isScrolled
          ? "bg-[#7231d6]/40 backdrop-blur-md text-white"
          : "bg-black/40 text-white"
      }`}
    >
      <div
        id="logo-container"
        onClick={handleClickHome}
        className="flex gap-2 items-center bg-transparent"
      >
        <img
          src="/quickshrink_logo_nobg.png"
          alt="QuickShrink Logo"
          className="h-12"
        />
        <h2 className="text-lg">QuickShrink</h2>
      </div>
      <div className="md:hidden">
        <div id="hamburger" onClick={toggleMenu} className="text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </div>
      </div>
      <ul
        id="bookmarks"
        ref={menuRef}
        className={`absolute top-16 right-5 bg-white text-black p-4 rounded-lg shadow-lg transition-all ${
          isMenuOpen ? "block" : "hidden"
        } md:flex md:static md:bg-transparent md:text-white md:p-0 md:shadow-none md:flex-row md:items-center md:gap-4`}
      >
        <li
          className={`cursor-pointer text-base ${
            isScrolled ? "hover:text-black" : "hover:text-[#7231d6]"
          }`}
          onClick={handleClickFeatures}
        >
          Features
        </li>
        <li
          className={`cursor-pointer text-base ${
            isScrolled ? "hover:text-black" : "hover:text-[#7231d6]"
          }`}
          onClick={handleClickShorten}
        >
          Shorten
        </li>
        <li
          className={`cursor-pointer text-base ${
            isScrolled ? "hover:text-black" : "hover:text-[#7231d6]"
          }`}
          onClick={handleClickSupport}
        >
          Support
        </li>
        <li
          className={`cursor-pointer text-base ${
            isScrolled ? "hover:text-black" : "hover:text-[#7231d6]"
          }`}
          onClick={handleClickSocials}
        >
          Socials
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;