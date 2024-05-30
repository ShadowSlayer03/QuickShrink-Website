import React, { useState, useRef, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import DatePicker from "react-datepicker";
import CustomInput from "./CustomInput";
import axios from "axios";
import { debounce } from "lodash";
import "react-datepicker/dist/react-datepicker.css";

const TableRow = ({ url, setUrls, handleDeleteUrl, handleShareUrl }) => {
  const { originalUrl, shortenedUrl, date, expiryDate } = url;
  const [clicked, setClicked] = useState(false);
  const [expiryState, setExpiryState] = useState(new Date(expiryDate));
  const [slug, setSlug] = useState("");
  const delRef = useRef();
  const shareRef = useRef();

  useEffect(() => {
    if (shortenedUrl) {
      const urlParts = shortenedUrl.split("/");
      const extractedSlug = urlParts[urlParts.length - 1];
      setSlug(extractedSlug);
    }
  }, [shortenedUrl]);

  const normalizeDate = (date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setDate(normalizedDate.getDate() + 1);
    normalizedDate.setUTCHours(0, 0, 0, 0);
    return normalizedDate;
  };

  const updateExpirationDate = async (slug, date) => {
    try {
      const normalizedDate = normalizeDate(date);
      let { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/expiration/${slug}`,
        { expirationDate: normalizedDate }
      );
    } catch (error) {
      console.error("Error updating expiration date", error);
    }
  };

  const debouncedUpdateExpirationDate = useRef(
    debounce((slug, date) => updateExpirationDate(slug, date), 1000)
  ).current;

  useEffect(() => {
    if (expiryState && slug) {
      debouncedUpdateExpirationDate(slug, expiryState);
    }

    setUrls((prev) => {
      return prev.map((item) =>
        item.shortenedUrl === url.shortenedUrl
          ? { ...item, expiryDate: expiryState }
          : item
      );
    });
  }, [expiryState, slug, debouncedUpdateExpirationDate]);

  const handleClick = async () => {
    if (!navigator.clipboard) {
      return "";
    }
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard: ", err);
    }
  };

  const creationDate = new Date(date);

  return (
    <>
      <tr>
        <td className="w-56 md:w-72 p-5 whitespace-nowrap">
          {shortenedUrl}{" "}
          <i
            onClick={handleClick}
            className={`${
              clicked ? "ri-check-fill" : "ri-clipboard-fill"
            } bg-[#451297]/60 rounded-full cursor-pointer border border-transparent p-2 ml-1`}
          ></i>
        </td>
        <td className="w-60 md:w-80 p-5 truncate">{originalUrl}</td>
        <td className="w-32 md:w-44 p-5">
          <QRCodeSVG value={shortenedUrl} size={70} />
        </td>
        <td className="w-48 p-5">{date}</td>
        <td className="w-44 p-5">
          <DatePicker
            selected={
              expiryState instanceof Date && !isNaN(expiryState)
                ? expiryState
                : null
            }
            onChange={(date) => setExpiryState(date)}
            customInput={<CustomInput />}
            dateFormat="MMMM-dd-yyyy"
            minDate={creationDate}
          />
        </td>
        <td className="w-24 p-9 flex items-center justify-center gap-2">
          <i
            onClick={() => handleDeleteUrl(url.shortenedUrl)}
            className="ri-delete-bin-6-fill cursor-pointer bg-[#451297]/60 rounded-full border border-transparent px-3 py-2"
          ></i>
          <i
            onClick={() => handleShareUrl(url.shortenedUrl)}
            className="ri-share-fill cursor-pointer bg-[#451297]/60 rounded-full border border-transparent px-3 py-2"
          ></i>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
