import React from "react";

const Box = ({heading,text,icon}) => {
  return (
    <div className="h-80 w-80 md:w-96 flex flex-col items-center justify-center gap-6 rounded-lg px-10 py-3 shadow-xl">
      <div className="bg-[#f6f4ff] flex items-center justify-center p-2 rounded-md h-10 w-10">
        <i className={icon}></i>
      </div>
      <h2 className="text-lg font-bold">{heading}</h2>
      <h4 className="text-center font-light">
        {text}
      </h4>
    </div>
  );
};

export default Box;
