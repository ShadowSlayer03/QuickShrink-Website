import React from "react";
import SocialsBtn from "./SocialsBtn/SocialsBtn";
import { useLocomotiveScroll } from "react-locomotive-scroll";

const Socials = () => { // Accept the scroll instance as a prop
  const { scroll } = useLocomotiveScroll();

  const handleClick = (targetId, e) => {
    e.preventDefault();
    if (scroll && scroll.scrollTo) {
      scroll.scrollTo(document.getElementById(targetId));
    }
  };

  return (
    <footer data-scroll-section id="socials" className="font-outfit w-[100%] h-[40vh] md:h-[100%] bg-[white] rounded-lg shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-2 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex justify-center items-center mb-4 sm:mb-0 mt-5 md:mt-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/quickshrink_logo.png"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              QuickShrink
            </span>
          </a>
          <div className="ml-20">
            <SocialsBtn />
          </div>
          <ul className="flex flex-wrap items-center justify-center mt-6 md:mt-0 mb-6 text-md font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a onClick={(e) => handleClick("features", e)} href="#" className="hover:text-[#7421fc] me-4 md:me-6">
                Features
              </a>
            </li>
            <li>
              <a onClick={(e) => handleClick("shorten", e)} href="#" className="hover:text-[#7421fc] me-4 md:me-6">
                Shorten
              </a>
            </li>
            <li>
              <a onClick={(e) => handleClick("support", e)} href="#" className="hover:text-[#7421fc] me-4 md:me-6">
                Support
              </a>
            </li>
            <li>
              <a onClick={(e) => handleClick("socials", e)} href="#" className="hover:text-[#7421fc]">
                Socials
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-md text-gray-500 text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a href="/" className="hover:text-[#7421fc] mr-2">
            QuickShrink™
          </a> 
          All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Socials;