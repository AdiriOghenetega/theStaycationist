import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";
import accomodations from "../assets/accomodations.png";

const Menu = () => {
  const productData = useSelector((state) => state.product.productList);

  const topPicks = productData.filter((el) => el.topSeller === true);

  const loading = new Array(10).fill(null);

  const slideRef = useRef();
  const nextTop = () => {
    slideRef.current.scrollLeft += 200;
  };
  const prevTop = () => {
    slideRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4 bg-slate-100">
      <div className="w-full md:h-[600px] my-4 bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg py-5 px-4 rounded-lg md:flex justify-around relative">
        <div className="w-full md:w-[63%] max-h-[600px] my-4 bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg py-5 px-4 rounded-lg ">
          <div className="h-full overflow-hidden w-full relative">
            <img
              src={
                "https://images.unsplash.com/photo-1484301548518-d0e0a5db0fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fGFwYXJ0bWVudHMlMjBpbnRlcmlvciUyMGdyYXl8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60"
              }
              className="h-full w-full"
            />
          </div>
        </div>
        <div className="w-full md:w-[35%] max-h-[600px] my-4 bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg py-5 px-4 rounded-lg overflow-hidden relative">
          <div className="h-full overflow-hidden w-full relative">
            <img
              src={accomodations}
              className="h-full w-full overflow-hidden relative"
            />
          </div>
        </div>
      </div>
      <div className="w-[100%] md:flex my-4 md:my-0">
        <div className="w-full md:w-[60%] bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg py-5 px-4 rounded-lg">
          <div className="max-h-fit">
            <div className="flex w-full items-center">
              <h2 className="font-bold text-2xl text-red-900 mb-4 p-2 rounded">
                Top Listers
              </h2>
              <div className="ml-auto flex">
                <button
                  onClick={prevTop}
                  className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
                >
                  <GrPrevious />
                </button>
                <button
                  onClick={nextTop}
                  className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded ml-2"
                >
                  <GrNext />
                </button>
              </div>
            </div>
            <div
              className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
              ref={slideRef}
            >
              {topPicks[0]
                ? topPicks.map((el) => {
                    return (
                      <CardFeature
                        key={el._id + "Top"}
                        id={el._id}
                        name={el.name}
                        category={el.category}
                        price={el.price}
                        image={el.images[0]}
                        state={el.state}
                        country={el.country}
                        rooms={el.rooms}
                        baths={el.baths}
                        description={el.description}
                      />
                    );
                  })
                : loading.map((el, index) => (
                    <CardFeature loading="Loading..." key={index} />
                  ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-[40%] my-4 md:my-0 bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg py-5 px-4 rounded-lg md:ml-4">
          <div className="h-[530px] overflow-hidden w-full">
            <img
              src={
                "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwYXJ0bWVudHMlMjBiZWRyb29tJTIwZ3JheXxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              }
              className="h-full w-full"
            />
          </div>
        </div>
      </div>

      <AllProduct heading={"Listings"} />
    </div>
  );
};

export default Menu;
