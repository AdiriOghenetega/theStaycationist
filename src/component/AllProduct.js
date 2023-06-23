import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";

const AllProduct = ({ heading, selectedCategory, selectedProductId }) => {
  const productData = useSelector((state) => state.product.productList);

  //filter data display
  const [dataFilter, setDataFilter] = useState([]);
  const [selectCategory, setSelectCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState(null);
  const [selectedBaths, setSelectedBaths] = useState(null);

  let relatedProducts = [];
  if (selectedCategory) {
    relatedProducts = productData.filter(
      (el) =>
        el.category.toLowerCase() === selectedCategory.toLowerCase() &&
        el._id !== selectedProductId
    );
  }

  useEffect(() => {
    if (selectedCategory) {
      setDataFilter(relatedProducts);
    } else {
      setDataFilter(productData);
    }
  }, [selectedCategory, selectedProductId]);

  const handleSelectCategory = (value) =>
    setSelectCategory(!value ? null : value);

  const handleSelectLocation = (value) =>
    setSelectedLocation(!value ? null : value);

  const handleSelectRooms = (value) => setSelectedRooms(!value ? null : value);

  const handleSelectBaths = (value) => setSelectedBaths(!value ? null : value);

  const applyFilters = () => {
    let updatedList = productData;

    // category filter
    if (selectCategory) {
      updatedList = updatedList.filter(
        (item) => item.category.toLowerCase() === selectCategory.toLowerCase()
      );
    }

    //location filter
    if (selectedLocation) {
      updatedList = updatedList.filter(
        (item) => item.location.toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    //rooms filter
    if (selectedRooms) {
      updatedList = updatedList.filter((item) => item.rooms === selectedRooms);
    }

    //baths
    if (selectedBaths) {
      updatedList = updatedList.filter((item) => item.baths === selectedBaths);
    }

    setDataFilter(updatedList);
  };

  useEffect(() => {
    !selectedCategory && applyFilters();
  }, [selectedLocation, selectCategory, selectedBaths, selectedRooms]);

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className="my-5 flex flex-col w-full items-center">
      <h2 className="font-bold text-3xl text-red-900 mt-4 p-2 rounded w-auto">
        {heading}
      </h2>
      {!selectedCategory && (
        <FilterProduct
          selectCategory={handleSelectCategory}
          selectLocation={handleSelectLocation}
          selectRooms={handleSelectRooms}
          selectBaths={handleSelectBaths}
        />
      )}
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
