import React,{useState} from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  deleteCartItem,
  increaseQty,
  decreaseQty,
} from "../redux/productSlice";
import Calendar from "react-calendar";

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
  const [calenderValue, onChange] = useState(new Date());
  const dispatch = useDispatch();

  console.log(calenderValue)

  const categoryNames = {
    onebed: "One bedroom apartment",
    twobed: "Two Bedroom Apartment",
    deluxeapartment: "Deluxe Apartment",
  };

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
        <div className="flex flex-col justify-between ">
          <div className="bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg p-2 m-2 rounded-lg">
            <Calendar onChange={onChange} value={calenderValue} />
          </div>
          <div className="flex justify-between m-2">
          <div className="flex gap-2 md:gap-3 items-center">
            <button
              onClick={() => dispatch(increaseQty(id))}
              className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 "
            >
              <TbPlus />
            </button>
            <p className="font-semibold md:p-1">{qty}</p>
            <button
              onClick={() => dispatch(decreaseQty(id))}
              className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 "
            >
              <TbMinus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <p>Total :</p>
            <p>
              <span className="text-green-500">₦</span>
              {total}
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
