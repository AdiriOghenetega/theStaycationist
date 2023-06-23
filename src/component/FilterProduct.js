import React from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { FaBath, FaBed } from "react-icons/fa";

const FilterProduct = ({
  selectCategory,
  selectLocation,
  selectRooms,
  selectBaths,
}) => {
  return (
    <div className="w-[80%] my-2 bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg p-4 rounded-2xl flex flex-wrap justify-around items-center">
      <div className="flex flex-col items-start">
        <label htmlFor="category" className="flex text-sm">
          <BiCategoryAlt size="20px" className="mr-2 text-red-900" /> Category
        </label>
        <select
          className="bg-slate-200 px-2 py-1 my-1 text-sm rounded"
          id="category"
          name="category"
          onChange={(event) => selectCategory(event.target.value)}
        >
          <option>Select Apartment Category</option>
          <option value={"onebed"}>One Bedroom Apartment</option>
          <option value={"twobed"}>Two Bedroom Apartment</option>
          <option value={"deluxeapartment"}>Deluxe Apartment</option>
        </select>
      </div>
      <hr className="m-4" />
      <div className="flex flex-col items-start">
        <label htmlFor="rooms" className="flex text-sm">
          <FaBed size="20px" className="mr-2 text-red-900" />
          Rooms
        </label>
        <input
          type={"text"}
          className="bg-slate-200 p-1 my-1 rounded"
          name="rooms"
          onChange={(event) => selectRooms(event.target.value)}
        />
      </div>
      <hr className="m-4" />
      <div className="flex flex-col items-start">
        <label htmlFor="baths" className="flex text-sm">
          <FaBath size="20px" className="mr-2 text-red-900" />
          Baths
        </label>
        <input
          type={"text"}
          className="bg-slate-200 p-1 my-1 rounded"
          name="baths"
          onChange={(event) => selectBaths(event.target.value)}
        />
      </div>
      <hr className="m-4" />
      <div className="flex flex-col items-start">
        <label htmlFor="location" className="flex text-sm">
          Location
        </label>
        <select
          className="bg-slate-200 px-2 py-1 my-1 text-sm rounded"
          id="location"
          name="location"
          onChange={(event) => selectLocation(event.target.value)}
        >
          <option>Select location</option>
          <option value={"lagos"}>Lagos</option>
          <option value={"abuja"}>Abuja</option>
        </select>
      </div>
    </div>
  );
};

export default FilterProduct;
