import React from "react";
import { Link } from "react-router-dom";

const Success = () => {

  return (
    <div>
      <div className="bg-green-200 w-full max-w-md m-auto h-36 flex justify-center items-center font-semibold text-lg mt-6">
        <p>Payment was Successfully</p>
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
