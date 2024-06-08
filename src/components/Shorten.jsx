import React, { useEffect, useState, useRef } from "react";
import TableRow from "./TableRow";
import Loader from "./Loader/Loader";
import Modal from "./Modal";
import axios from "axios";

const Shorten = () => {
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);
  const [openAdv, setOpenAdv] = useState();
  const [customURL, setCustomURL] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [urls, setUrls] = useState([]);
  const [modalURL, setModalURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const initialRender = useRef(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [action, setAction] = useState("");

  useEffect(() => {
    const fetchAndValidateUrls = async () => {
      let userUrls = localStorage.getItem("urls");
      if (userUrls) {
        userUrls = JSON.parse(userUrls);
        try {
          const { data: apiUrls } = await axios.get(
            `${import.meta.env.VITE_API_URL}/urls`
          );
          const validUrls = userUrls.filter((url) => {
            const newUrl = new URL(url.shortenedUrl);
            return apiUrls.some(
              (apiUrl) => apiUrl.slug === newUrl.pathname.split("/").pop()
            );
          });
          setUrls(validUrls);
          localStorage.setItem("urls", JSON.stringify(validUrls));
        } catch (error) {
          console.error("Error checking URLs:", error);
        }
      }
    };

    fetchAndValidateUrls();
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      localStorage.setItem("urls", JSON.stringify(urls));
    }
  }, [urls]);

  const confirmDelete = (urlToDelete) => {
    setUrls(urls.filter((u) => u.shortenedUrl !== urlToDelete));
    setModalIsOpen(false);
  };

  const handleClick = async () => {
    if (!navigator.clipboard) {
      return "";
    }
    try {
      const text = await navigator.clipboard.readText();
      setInputVal(text);
      setClick(true);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  const handleLeave = () => {
    setHover(false);
    setClick(false);
  };

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "Invalid Date";
    }
    let day = date.getDate();
    let month = date.toLocaleString("default", { month: "short" });
    let year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const handleShrink = async () => {
    if (inputVal.length === 0) {
      setError("Please Provide Input!");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    // Check if the URL is already shortened
    const urlExists = urls.some((url) => url.originalUrl === inputVal);
    if (urlExists) {
      setError("URL Already Shortened!");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    setLoading(true);

    let apiData = {};

    try {
      let config = { url: inputVal };
      if (customURL) {
        config = { originalURL: inputVal };
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/custom/${customURL}`,
          config
        );
        apiData = data;
      } else {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/shorten`,
          config
        );
        apiData = data;
      }

      let date = new Date();
      let formattedDate = formatDate(date);

      let formattedExpiry = "N/A";
      if (apiData.expiryDate) {
        const expiryDate = new Date(apiData.expiryDate);
        if (!isNaN(expiryDate.getTime())) {
          formattedExpiry = formatDate(expiryDate);
        }
      }

      setUrls([
        ...urls,
        {
          originalUrl: inputVal,
          shortenedUrl: apiData.short
            ? apiData.short
            : `https://qshrink.fun/${apiData.slug}`,
          date: formattedDate,
          expiryDate: formattedExpiry,
        },
      ]);
    } catch (error) {
      console.error("Error during URL shortening:", error);
      setError("Sorry! URL Could Not be Shortened due to some Error!");
      setTimeout(() => {
        setError("");
      }, 2000);
    }

    setLoading(false);
  };

  const handleDeleteUrl = (url) => {
    setModalURL(url);
    setAction("delete");
    setModalIsOpen(true);
  };

  const handleShareUrl = (url) => {
    setModalURL(url);
    setAction("share");
    setModalIsOpen(true);
  };

  return (
    <div
      data-scroll-section
      id="shorten"
      className="w-full h-[165vh] md:h-[150vh] flex flex-col items-center relative"
    >
      <div className="pt-20 text-center">
        <p className="uppercase text-blue-300 mt-5">Get Started Now</p>
        <h1 className="text-white font-lobster text-3xl lg:text-4xl font-semibold mt-3">
          Shorten Your Links with Ease
        </h1>
      </div>
      <div className="mt-40 w-[85%] md:w-[40%] flex items-center gap-2 border-2 border-blue-500 rounded-full font-outfit">
        <i
          id="paste"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={handleLeave}
          onClick={handleClick}
          className={`${
            hover && !click
              ? "ri-clipboard-line"
              : click
              ? "ri-check-line"
              : "ri-links-line"
          } text-[#7421fc] bg-white text-base md:text-xl px-6 py-1 h-full w-16 rounded-full flex items-center justify-center`}
        ></i>
        <input
          id="url"
          type="text"
          className="w-[33vw] md:w-[80%] bg-transparent text-white h-full border-none outline-none px-4 py-2 text-base md:text-lg"
          onChange={(e) => {
            setError(false);
            setInputVal(e.target.value);
          }}
          value={inputVal}
        />
        <button
          onClick={handleShrink}
          className="text-center bg-[#7421fc] text-white p-2 whitespace-nowrap rounded-4xl text-sm md:text-base"
        >
          Shrink Now!
        </button>
      </div>
      {error != "" && (
        <h4 className="text-red-500 text-lg font-outfit mt-[3vw]">{error}</h4>
      )}
      <div className="mt-7 text-white font-outfit flex items-center">
        <h3
          onClick={() => setOpenAdv((prev) => !prev)}
          className="text-base md:text-lg cursor-pointer"
        >
          Advanced
        </h3>
        {!openAdv ? (
          <i
            onClick={() => setOpenAdv((prev) => !prev)}
            className="ri-arrow-right-s-line ml-2 text-lg cursor-pointer"
          ></i>
        ) : (
          <i
            onClick={() => setOpenAdv((prev) => !prev)}
            className="ri-arrow-down-s-line ml-2 text-lg cursor-pointer"
          ></i>
        )}
      </div>
      {openAdv && (
        <div className="font-outfit flex items-center text-white gap-4 mt-4">
          <label htmlFor="custom slug">Custom URL:</label>
          <input
            onChange={(e) => setCustomURL(e.target.value)}
            className="w-[51vw] md:w-[13vw] border-2 border-[#0866ff] outline-none rounded-3xl px-2 md:px-3 py-2 bg-transparent"
            type="text"
            placeholder="Enter custom URL string"
          ></input>
        </div>
      )}
      <div className="w-[87%] mt-[10vh] rounded-lg relative overflow-auto md:overflow-visible">
        <table id="urls" className="w-full table-fixed overflow-visible">
          <thead className="url-list bg-[#451297]/60 py-[3vh] px-[4vh] rounded-t-xl font-outfit text-white">
            <tr>
              <th className="w-56 md:w-72 h-15 p-5">Shortened Url</th>
              <th className="w-60 md:w-80 h-15 p-5">Original Url</th>
              <th className="w-32 md:w-44 h-15 p-5">QR Code</th>
              <th className="w-48 h-15 p-5">Date of Creation</th>
              <th className="w-44 h-15 p-5">Date of Expiration</th>
              <th className="w-24 h-15 p-5">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[#64c3ff]/30 py-[3vh] px-[4vh] text-[#f6f4ff] text-sm font-outfit overflow-visible">
            {loading ? (
              <tr className="relative">
                <td></td>
                <td></td>
                <Loader />
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ) : urls?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-base md:text-[1.1vw] p-10">
                  No URLs to Show!
                </td>
              </tr>
            ) : (
              urls.map((url, index) => {
                return (
                  <TableRow
                    key={index}
                    url={url}
                    setUrls={setUrls}
                    handleDeleteUrl={handleDeleteUrl}
                    handleShareUrl={handleShareUrl}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          onDelete={confirmDelete}
          action={action}
          url={modalURL}
        />
      )}
    </div>
  );
};

export default Shorten;
