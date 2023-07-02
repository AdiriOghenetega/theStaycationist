import React from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineLocationCity } from "react-icons/md";
import { TiWorld } from "react-icons/ti";
import { FaBath, FaBed } from "react-icons/fa";
import { useSelector } from "react-redux";

const FilterProduct = ({
  selectCategory,
  selectState,
  selectCountry,
  selectRooms,
  selectBaths,
}) => {
  const productData = useSelector((state) => state.product.productList);

  const stateList = [...new Set(productData.map((el) => el.state))];

  const countryList = [...new Set(productData.map((el) => el.country))];

  return (
    <div className="w-[80%] my-2 bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg p-4 rounded-2xl md:flex md:flex-wrap justify-around items-center">
      <div className="flex flex-col items-start">
        <label htmlFor="category" className="flex text-sm">
          <BiCategoryAlt size="20px" className="mr-2 text-red-900" /> Category
        </label>
        <select
          className="bg-slate-200 px-2 py-1 my-1 text-sm rounded w-full sm:w-fit"
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
          className="bg-slate-200 p-1 my-1 rounded w-full sm:w-fit text-sm text-black"
          placeholder="Select Room Type"
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
          className="bg-slate-200 p-1 my-1 rounded w-full sm:w-fit text-sm text-black"
          placeholder="Select Bath Type"
          name="baths"
          onChange={(event) => selectBaths(event.target.value)}
        />
      </div>
      <hr className="m-4" />
      <div className="flex flex-col items-start">
        <label htmlFor="state" className="flex text-sm">
          <MdOutlineLocationCity size="20px" className="mr-2 text-red-900" />
          State
        </label>
        <select
          className="bg-slate-200 px-2 py-1 my-1 text-sm rounded w-full sm:w-fit"
          id="state"
          name="state"
          onChange={(event) => selectState(event.target.value)}
        >
          <option>Select State</option>
          {stateList.map((el, index) => {
            return (
              <option key={index} value={el}>
                {el}
              </option>
            );
          })}
        </select>
      </div>
      <hr className="m-4" />
      <div className="flex flex-col items-start">
        <label htmlFor="country" className="flex text-sm">
          <TiWorld size="20px" className="mr-2 text-red-900" />
          Country
        </label>
        <select
          className="bg-slate-200 px-2 py-1 my-1 text-sm rounded w-full sm:w-fit"
          id="country"
          name="country"
          onChange={(event) => selectCountry(event.target.value)}
        >
          <option>Select country</option>
          {countryList.map((el, index) => {
            return (
              <option key={index} value={el}>
                {el}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default FilterProduct;
