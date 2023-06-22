import React, { useState } from "react";
import { HiHomeModern } from "react-icons/hi2";
import { HiLocationMarker } from "react-icons/hi";
import { BiFilter, BiCategoryAlt } from "react-icons/bi";
import { FaBath, FaBed } from "react-icons/fa";

const FilterProduct = ({
 handleFilter,
 loading
}) => {
  //state to store filtered values
  const [filterValues, setFilterValues] = useState({
    category: "",
    rooms: "",
    baths: "",
    location: "",
  });

  

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFilterValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

  };

  return (
    <div className="w-[90%] my-2 bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg p-4 rounded-2xl flex flex-wrap items-center">
      <div className="flex flex-col items-start">
        <label htmlFor="category" className="flex text-sm">
          <BiCategoryAlt size="20px" className="mr-2 text-red-900" /> Category
        </label>
        <select
          className="bg-slate-200 px-2 py-1 my-1 text-sm"
          id="category"
          name="category"
          onChange={handleOnChange}
          value={filterValues.category}
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
          className="bg-slate-200 p-1 my-1"
          name="rooms"
          onChange={handleOnChange}
          value={filterValues.rooms}
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
          className="bg-slate-200 p-1 my-1"
          name="baths"
          onChange={handleOnChange}
          value={filterValues.baths}
        />
      </div>
      <hr className="m-4" />
      <div className="flex flex-col items-start">
        <label htmlFor="location" className="flex text-sm">
          <HiLocationMarker size="20px" className="mr-2 text-red-900" />
          Location
        </label>
        <input
          type={"text"}
          value={filterValues.location}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="location"
          onChange={handleOnChange}
        />
      </div>
      {loading ? (
        <div className="flex flex-col justify-center items-center">
          <HiHomeModern size="25" className="animate-spin text-red-900" />
        </div>
      ) : (
        <button
          className="bg-red-900 hover:bg-red-700 text-white font-medium p-6 rounded h-[20px] drop-shadow ml-auto flex justify-center items-center"
          onClick={()=>handleFilter(filterValues)}
        >
          <BiFilter size="20px" className="mr-2" /> Filter
        </button>
      )}
    </div>
  );
};

export default FilterProduct;
