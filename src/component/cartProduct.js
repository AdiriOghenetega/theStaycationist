import React, { useEffect, useState } from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteCartItem, updateCart } from "../redux/productSlice";
import Calendar from "react-calendar";
import { dayOfYear } from "../utility/helper";

const CartProduct = ({ id, name, image, category, price, date }) => {
  const [calenderValue, onChange] = useState(new Date(date.name));
  const [changeDate, setChangeDate] = useState(false);
  const dispatch = useDispatch();

  const sellectedDayOfYear = dayOfYear(calenderValue);

  const formattedDate = calenderValue.toISOString().split("T");

  const vat = (7.5 / 100) * price;

  let totalPlusVat = parseInt(price) + vat;

  const categoryNames = {
    onebed: "One bedroom apartment",
    twobed: "Two Bedroom Apartment",
    deluxeapartment: "Deluxe Apartment",
  };

  useEffect(() => {
    dispatch(
      updateCart({
        cartId: id,
        date: { name: formattedDate[0], value: sellectedDayOfYear },
      })
    );
  }, [calenderValue]);

  return (
    <div className="bg-slate-200 p-2 flex md:gap-4 rounded border border-slate-300">
      <div className="p-3 bg-white h-fit rounded overflow-hidden">
        <img src={image} className="h-28 w-40 object-cover " />
      </div>
      <div className="flex flex-col gap-1 w-full ml-2">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600  capitalize text-lg md:text-xl">
            {name}
          </h3>
          <div
            className="cursor-pointer text-slate-700 hover:text-red-500"
            onClick={() => dispatch(deleteCartItem(id))}
          >
            <AiFillDelete />
          </div>
        </div>
        <p className=" text-slate-500  font-medium ">
          {categoryNames[category]}
        </p>
        <p className=" font-bold text-base">
          <span className="text-green-500 ">₦</span>
          <span>{price}</span>
        </p>
        <div className="flex flex-col justify-between">
          {changeDate && (
            <div className="bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg w-fit p-2 m-2 rounded-lg">
              <Calendar onChange={onChange} value={calenderValue} />
            </div>
          )}
          <div className="flex justify-between items-center m-2">
            <div className="items-center">
              Date : {formattedDate[0]}
              <button
                className="w-full max-w-[150px] m-auto  bg-red-900 hover:bg-red-600 cursor-pointer text-white text-center p-2 rounded mt-4"
                onClick={() => setChangeDate((prev) => !prev)}
              >
                {changeDate ? "Close" : "Change Date"}
              </button>
            </div>
            <div className="flex p-2 items-center gap-2 font-bold text-slate-700">
              <div className="mr-2 bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg p-2 rounded">
                <p>Vat(7.5%) : </p>
                <span className="ml-2">
                  <span className="text-green-500">₦</span>
                  {vat}
                </span>
              </div>
              <div className="bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg p-2 rounded">
                <p>Total :</p>
                <span className="text-green-500 ml-2">₦</span>
                {totalPlusVat}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
