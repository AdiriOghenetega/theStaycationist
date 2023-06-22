import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addCartItem } from "../redux/productSlice";
import { GrPrevious, GrNext } from "react-icons/gr";
import { FaBath, FaBed } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";

const Product = () => {
  const { filterby } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);

  const productDisplay = productData?.filter((el) => el._id === filterby)[0];

  console.log(productDisplay);

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem(productDisplay));
  };

  const handleBuy = () => {
    dispatch(addCartItem(productDisplay));
    navigate("/cart");
  };

  const slideRef = useRef();
  const nextTop = () => {
    slideRef.current.scrollLeft += 200;
  };
  const prevTop = () => {
    slideRef.current.scrollLeft -= 200;
  };

  const categoryNames = {
    onebed: "One bedroom apartment",
    twobed: "Two Bedroom Apartment",
    deluxeapartment: "Deluxe Apartment",
  };

  return (
    <div className="p-2 md:p-4 bg-slate-100">
      <div className="w-full md:max-w-[95%] p-2 md:p-6 m-auto bg-[rgb(255,255,255,.8)]">
        <div className="ml-auto flex">
          <button
            onClick={prevTop}
            className="bg-slate-100 hover:bg-slate-300 text-lg p-1 invisible md:visible"
          >
            <GrPrevious />
          </button>
          <div
            className="flex overflow-scroll scrollbar-none scroll-smooth transition-all"
            ref={slideRef}
          >
            {productDisplay?.images.map((elem, index) => {
              return (
                <div
                  className="min-w-[330px] h-[350px] w-[330px] mx-2"
                  key={index}
                >
                  <img
                    src={elem}
                    className="hover:scale-105 transition-all h-full w-full"
                  />
                </div>
              );
            })}
          </div>
          <button
            onClick={nextTop}
            className="bg-slate-100 hover:bg-slate-300 text-lg p-1 ml-auto invisible md:visible"
          >
            <GrNext />
          </button>
        </div>

        <div className="flex flex-col gap-1 py-5 pl-5 md:pl-0">
          <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
            {productDisplay?.name}
          </h3>
          <p className=" text-slate-500  font-medium text-2xl">
            {categoryNames[productDisplay?.category]}
          </p>
          <p className=" font-bold md:text-2xl">
            <span className="text-green-500 ">₦</span>
            <span>{productDisplay?.price}</span>
          </p>
          <div className="flex md:gap-3">
            <button
              onClick={handleBuy}
              className="bg-red-900 text-slate-100 p-2 mt-2 rounded hover:bg-orange-600 min-w-[100px]"
            >
              Book Now
            </button>
            <button
              onClick={handleAddCartProduct}
              className="bg-red-900 text-slate-100 p-2 mt-2 rounded hover:bg-orange-600 min-w-[100px] ml-2"
            >
              Add To Cart
            </button>
          </div>
          <div className="flex items-center justify-between w-[150px] text-blue-500 mt-2">
            {productDisplay?.rooms} <FaBed size="20px" /> |{" "}
            {productDisplay?.baths} <FaBath size="20px" />
            <BsGridFill size="20px" />
          </div>
          <div>
            <p className="text-slate-600 font-bold text-lg">Description : </p>
            <p className="text-slate-500 font-bold">
              {productDisplay?.description}
            </p>
          </div>
        </div>
      </div>

      <AllProduct
        heading={"Related Listings"}
        selectedCategory={productDisplay?.category}
      />
    </div>
  );
};

export default Product;
