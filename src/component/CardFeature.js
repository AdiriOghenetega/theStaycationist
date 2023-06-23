import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";
import { HiHomeModern } from "react-icons/hi2";
import { FaBath, FaBed } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import millify from "millify";

const CardFeature = ({
  image,
  name,
  price,
  category,
  loading,
  id,
  location,
  description,
  rooms,
  baths
}) => {
  const dispatch = useDispatch();


  return (
    <div
      className={`w-full mt-2 min-w-[350px] w-[350px] bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg cursor-pointer flex flex-col ${
        loading && "animate-pulse"
      }`}
    >
      {image ? (
        <>
          <Link
            to={`/product/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-[320px] w-full">
              <img src={image} className="h-full w-full" />
            </div>
            <div className="pb-5 px-4">
              <div className="flex justify-between items-end">
                <h3 className="font-semibold text-slate-600 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
                  {name.substring(0,15)}...
                </h3>
                <p className="text-sm font-bold">
                  <span className="text-green-500">₦</span>
                  <span className="text-slate-500">{millify(price)}</span>
                </p>
              </div>
              <div className="flex items-center justify-between w-[40%] text-blue-500">
                {rooms} <FaBed size="20px" /> | {baths} <FaBath size="20px" />
                <BsGridFill size="20px" />
              </div>
              <p className=" text-slate-900 font-bold">
                {" "}
                <span className="text-slate-500 text-sm">{location}</span>
              </p>

              <p className=" text-slate-900 text-sm font-bold">
                <span className="text-slate-500">{description?.substring(0,35)}...</span>
              </p>
            </div>
          </Link>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p className="animate-spin text-red-900">
            {loading && <HiHomeModern size="25px" />}
          </p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
