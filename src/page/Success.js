import React from "react";
import { Link } from "react-router-dom";
import success from "../assets/success.gif"

const Success = () => {

  return (
    <div>
      <div className="bg-green-200 w-fit p-[50px] md:p-[100px] rounded-xl m-auto h-auto flex flex-col justify-center items-center font-semibold text-lg mt-6">
      <div>
        <img src={success} alt="success" className="h-[150px] w-[150px]"  />
      </div>
        <p className="w-full">Payment was Successful</p>
      </div>
      <div className="flex flex-col justify-center items-center">
      <Link to={`/`}>
        <button className="w-fit m-auto bg-red-900 hover:bg-red-600 cursor-pointer text-white text-center p-2 rounded mt-4">
          Continue Shopping
        </button>
      </Link>
      </div>
    </div>
  );
};

export default Success;
