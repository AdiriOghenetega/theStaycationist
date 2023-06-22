import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";
import { HiHomeModern } from "react-icons/hi2";

const AllProduct = ({ heading, selectedCategory }) => {
  const productData = useSelector((state) => state.product.productList);
  let categoryList = [...new Set(productData.map((el) => el.category))];

  //filter data display
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  let relatedProducts = [];
  let relatedCategory = [];
  if (selectedCategory) {
    relatedProducts = productData.filter(
      (el) => el.category.toLowerCase() === selectedCategory.toLowerCase()
    );
    relatedCategory = categoryList.filter(
      (el) => el.toLowerCase() === selectedCategory.toLowerCase()
    );
    categoryList = relatedCategory;
  }

  useEffect(() => {
    if (selectedCategory) {
      setDataFilter(relatedProducts);
    } else {
      setDataFilter(productData);
    }
  }, [productData]);



  const handleFilter = async (filterValues) => {
    const { category, location, rooms, baths } = filterValues;

    let query = ""

    if (category && !location && !rooms && !baths) {
      query = `?category=${category}`
    } else if (category && location && !rooms && !baths) {
      query = `?category=${category}&location=${location}`
    } else if (category && location && rooms && !baths) {
      query = `?category=${category}&location=${location}&rooms=${rooms}`
    } else if (category && location && rooms && baths) {
      query = `?category=${category}&location=${location}&rooms=${rooms}&baths=${baths}`
    }

    console.log(query)

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/queryproduct${query}`);
      const resData = await res.json();
      setDataFilter(resData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(dataFilter);

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className="my-5 flex flex-col w-full items-center">
      <h2 className="font-bold text-3xl text-red-900 mt-4 p-2 rounded w-auto">
        {heading}
      </h2>
      <FilterProduct handleFilter={handleFilter} loading={loading} />
      {dataFilter?.length <= 0 ? (
        <div>
          <h3>No listing match your filter preferences</h3>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center md:gap-4 my-4">
          {dataFilter[0]
            ? dataFilter.map((el) => {
                return (
                  <CardFeature
                    key={el._id}
                    id={el._id}
                    image={el.images[0]}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    location={el.location}
                    description={el.description}
                    baths={el.baths}
                    rooms={el.rooms}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CardFeature loading="Loading..." key={index} />
              ))}
        </div>
      )}
    </div>
  );
};

export default AllProduct;
