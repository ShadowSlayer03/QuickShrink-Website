import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";

const getCustomStyles = () => {
  const width = window.innerWidth;

  if (width < 768) { // Small screens
    return {
      content: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "85vw",
        height: "33vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "10px",
        alignItems: "center",
        gap: "10vw",
        backgroundColor: "#510e9a",
        color: "#fff",
        borderRadius: "20px",
        textAlign: "center",
        fontFamily: "Outfit,sans-serif",
      },
    };
  } else { // Large screens
    return {
      content: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "30vw",
        height: "35vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2vw",
        backgroundColor: "#510e9a",
        color: "#fff",
        borderRadius: "20px",
        textAlign: "center",
        fontFamily: "Outfit,sans-serif",
      },
    };
  }
};

function Modal({ isOpen, onRequestClose, onDelete, action, url }) {
  const encodedUrl = encodeURIComponent(url);
  const [logo1, setLogo1] = useState(false);
  const [logo2, setLogo2] = useState(false);
  const [logo3, setLogo3] = useState(false);
  const [logo4, setLogo4] = useState(false);
  const [logo5, setLogo5] = useState(false);
  const [customStyles, setCustomStyles] = useState(getCustomStyles());

  useEffect(() => {
    const handleResize = () => {
      setCustomStyles(getCustomStyles());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="URL Modal"
      style={customStyles}
    >
      {action === "delete" ? (
        <>
          <div className="text">
            <h2 className="whitespace-nowrap">Are you sure you want to delete this URL?</h2>
            <p>This action cannot be undone.</p>
          </div>
          <div className="buttons flex gap-5">
            <button
              className="px-10 h-12 w-32 border-[#fff] bg-gray-200 text-black"
              onClick={onRequestClose}
            >
              Cancel
            </button>
            <button
              className="px-10 h-12 w-32 border-[#fff] bg-red-500"
              onClick={() => onDelete(url)}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="heading flex justify-between border-b-2 border-slate-400 w-[90%]">
            <h1 className="text-xl mb-3">Share Link</h1>
            <i
              onClick={onRequestClose}
              className="ri-close-line bg-slate-300 px-2 py-1 rounded-[50%] text-black mb-3 cursor-pointer"
            ></i>
          </div>
          <div className="flex flex-col gap-5 w-[90%]">
            <p className="self-start">Share this URL via :</p>
            <div className="icons-container flex justify-between">
              <div className="icon border-1 border-slate-200">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    onMouseEnter={() => setLogo1(true)}
                    onMouseLeave={() => setLogo1(false)}
                    className={`border-2 border-blue-300 rounded-full p-2 transition-all ${
                      logo1 ? "bg-white" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="55px"
                    height="55px"
                  >
                    <path
                      fill={logo1 ? "#0866ff" : "#fff"}
                      d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M37,19h-2c-2.14,0-3,0.5-3,2 v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z"
                    />
                  </svg>
                </a>
              </div>
              <div className="icon border-1 border-slate-200">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    onMouseEnter={() => setLogo2(true)}
                    onMouseLeave={() => setLogo2(false)}
                    className={`border-2 border-blue-300 rounded-full p-2 transition-all ${
                      logo2 ? "bg-white" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="55px"
                    height="55px"
                  >
                    <path
                      fill={logo2 ? "#0f1419" : "#fff"}
                      d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"
                    />
                  </svg>
                </a>
              </div>
              <div className="icon border-1 border-slate-200">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    onMouseEnter={() => setLogo3(true)}
                    onMouseLeave={() => setLogo3(false)}
                    className={`border-2 border-blue-300 rounded-2xl p-2 transition-all ${
                      logo3 ? "bg-white" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="55px"
                    height="55px"
                  >
                    <path
                      fill={logo3 ? "#25D366" : "#fff"}
                      d="M25,2C12.318,2,2,12.318,2,25c0,3.96,1.023,7.854,2.963,11.29L2.037,46.73c-0.096,0.343-0.003,0.711,0.245,0.966 C2.473,47.893,2.733,48,3,48c0.08,0,0.161-0.01,0.24-0.029l10.896-2.699C17.463,47.058,21.21,48,25,48c12.682,0,23-10.318,23-23 S37.682,2,25,2z M36.57,33.116c-0.492,1.362-2.852,2.605-3.986,2.772c-1.018,0.149-2.306,0.213-3.72-0.231 c-0.857-0.27-1.957-0.628-3.366-1.229c-5.923-2.526-9.791-8.415-10.087-8.804C15.116,25.235,13,22.463,13,19.594 s1.525-4.28,2.067-4.864c0.542-0.584,1.181-0.73,1.575-0.73s0.787,0.005,1.132,0.021c0.363,0.018,0.85-0.137,1.329,1.001 c0.492,1.168,1.673,4.037,1.819,4.33c0.148,0.292,0.246,0.633,0.05,1.022c-0.196,0.389-0.294,0.632-0.59,0.973 s-0.62,0.76-0.886,1.022c-0.296,0.291-0.603,0.606-0.259,1.19c0.344,0.584,1.529,2.493,3.285,4.039 c2.255,1.986,4.158,2.602,4.748,2.894c0.59,0.292,0.935,0.243,1.279-0.146c0.344-0.39,1.476-1.703,1.869-2.286 s0.787-0.487,1.329-0.292c0.542,0.194,3.445,1.604,4.035,1.896c0.59,0.292,0.984,0.438,1.132,0.681 C37.062,30.587,37.062,31.755,36.57,33.116z"
                    />
                  </svg>
                </a>
              </div>
              <div className="icon border-1 border-slate-200">
                <a
                  href={`https://www.instagram.com/`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    onMouseEnter={() => setLogo4(true)}
                    onMouseLeave={() => setLogo4(false)}
                    className={`border-2 border-blue-300 rounded-full p-2 transition-all ${
                      logo4 ? "bg-white" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="55px"
                    height="55px"
                  >
                    {" "}
                    <path
                      fill={logo4 ? "#E1306C" : "#fff"}
                      d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"
                    />
                  </svg>
                </a>
              </div>
              <div className="icon border-1 border-slate-200">
                <a
                  href={`https://t.me/share/url?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    onMouseEnter={() => setLogo5(true)}
                    onMouseLeave={() => setLogo5(false)}
                    className={`border-2 border-blue-300 rounded-full p-2 transition-all ${
                      logo5 ? "bg-white" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="55px"
                    height="55px"
                  >
                    <path
                      fill={logo5 ? "#0077b5" : "#fff"}
                      d="M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </ReactModal>
  );
}

export default Modal;