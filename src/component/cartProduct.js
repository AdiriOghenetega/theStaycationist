import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteCartItem, updateCart } from "../redux/productSlice";
import Calendar from "react-calendar";
import { dayOfYear } from "../utility/helper";
import { toast } from "react-hot-toast";

const CartProduct = ({
  id,
  name,
  image,
  category,
  price,
  date,
  state,
  country,
  booked,
}) => {
  const [calenderValue, onChange] = useState(new Date(date.name));
  const [changeDate, setChangeDate] = useState(false);
  const dispatch = useDispatch();

  const sellectedDayOfYear = dayOfYear(calenderValue);

  const formattedDate = calenderValue.toDateString();

  const vat = Math.floor((7.5 / 100) * price);

  let totalPlusVat = Math.floor(parseInt(price) + vat);

  const categoryNames = {
    onebed: "One bedroom apartment",
    twobed: "Two Bedroom Apartment",
    deluxeapartment: "Deluxe Apartment",
  };

  useEffect(() => {
    if (booked?.includes(sellectedDayOfYear)) {
      toast(
        "Apartment already booked for this date,kindly pick a different date"
      );
    } else {
      dispatch(
        updateCart({
          cartId: id,
          date: { name: formattedDate, value: sellectedDayOfYear },
        })
      );
    }
  }, [calenderValue, sellectedDayOfYear]);

  return (
    <div className="bg-slate-200 p-2 md:flex rounded border border-slate-300">
      <div className="p-3 bg-white h-fit rounded overflow-hidden">
        <img src={image} className="h-28 w-full md:w-40 object-cover " />
      </div>
      <div className="flex flex-col gap-1 w-full mt-2 md:w-[80%] md:mt-0 md:ml-4">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600  capitalize md:text-lg md:text-xl">
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
        <p className=" text-slate-500  font-medium ">
          {state}
          {", "}
          {country}
        </p>
        <p className=" font-bold text-base">
          <span className="text-green-500 ">₦</span>
          <span>{price}</span>
        </p>
        <div className="flex flex-col justify-between">
          {changeDate && (
            <div className="bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg md:w-fit p-2 m-2 rounded-lg">
              <Calendar onChange={onChange} value={calenderValue} />
            </div>
          )}
          <div className="md:flex justify-between items-center md:m-2">
            <div className="flex items-center md:w-[400px] m-2">
              <button
                className="w-full max-w-[150px] bg-red-900 hover:bg-red-600 cursor-pointer text-white text-center p-2 rounded"
                onClick={() => setChangeDate((prev) => !prev)}
              >
                {changeDate ? "Close" : "Change Date"}
              </button>
              <h3 className="w-fit text-bold text-slate-900 bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg p-2 rounded ml-2">
                Date : {date.name}
              </h3>
            </div>
            <div className="flex p-2 items-center justify-between font-bold text-slate-700 w-auto ">
              <div className="mr-2 bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg p-2 rounded w-fit ">
                <p className=" w-24">Vat(7.5%) :</p>
                <span className="ml-2">
                  <span className="text-green-500">₦</span>
                  {vat}
                </span>
              </div>
              <div className="bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg p-2 rounded w-fit ">
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
