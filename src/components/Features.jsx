import React from "react";
import Box from "./Box";

const Features = () => {
  return (
    <div
      data-scroll-section
      id="features"
      className="font-outfit w-full h-[390vh] md:h-[140vh] bg-[#fdfdfd] flex flex-col items-center justify-start"
    >
      <h3 className="uppercase text-[#7421fc] mt-14">Exciting Features</h3>
      <h2 className="font-lobster tracking-wide text-center text-3xl lg:text-4xl font-semibold mt-5">
        Unlock the Power of Short Links
      </h2>
      <div className="md:container flex flex-col md:flex-row gap-20 mt-14 md:px-52">
        <Box
          heading="Quick URL Shortening"
          text="Quickly turn long URLs into concise, shareable links with QuickShrink's rapid technology. No more waiting —just efficient link management."
          icon="ri-flashlight-fill text-[#7421fc] text-2xl"
        />
        <Box
          heading="Ironclad Security"
          text="Ensuring your peace of mind is our top priority. QuickShrink implements cutting-edge security measures to protect both your links and data."
          icon="ri-lock-fill text-[#7421fc] text-2xl"
        />
        <Box
          heading="Custom URL Generation"
          text="Create custom URLs with your own slug, providing additional control and personalization over your shortened links."
          icon="ri-edit-box-line text-[#7421fc] text-2xl"
        />
      </div>
      <div className="md:container flex flex-col md:flex-row gap-20 mt-14 md:px-52">
        <Box
          heading="Ready-Made QR Codes"
          text="Generate QR codes alongside shortened URLs for easy sharing across platforms, seamlessly blending offline and online interactions."
          icon="ri-qr-code-line text-[#7421fc] text-2xl"
        />
        <Box
          heading="URL Expiration Options"
          text="Set expiration dates for your shortened URLs, providing additional control over access and ensuring link relevance over time."
          icon="ri-time-fill text-[#7421fc] text-2xl"
        />
        <Box
          heading="Seamless Sharing"
          text="Access multiple sharing options like WhatsApp, Email, and more directly after creating a link, ensuring effortless transfer across various platforms."
          icon="ri-share-fill text-[#7421fc] text-2xl"
        />
      </div>
    </div>
  );
};

export default Features;
