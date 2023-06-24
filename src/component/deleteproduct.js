import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { HiHomeModern } from "react-icons/hi2";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

const DeleteProduct = () => {
    
  const [loading, setLoading] = useState(false);

  const [loadingProductDelete, setLoadingProductDelete] = useState(false);

  const [deleteProductList, setDeleteProductList] = useState([]);

  const [productData, setProductData] = useState([]);

  const user = useSelector((state) => state.user);

  const deleteOptions = productData.map((el) => {
    return { label: el.name, value: el._id };
  });

  //fetch product
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/product`, {
          credentials: "include",
        });
        const resData = await res.json();
        setProductData(resData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleDeleteSelect = (selected) => {
    setDeleteProductList(selected);
  };

  const handleProductDelete = async () => {
    try {
      setLoadingProductDelete(true);
      const deleteProduct = await fetch(
        `${process.env.REACT_APP_BASE_URL}/deleteproduct/${user?._id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(deleteProductList),
        }
      );
      const res = await deleteProduct.json();

      if (res) {
        setLoadingProductDelete(false);
        res.message && toast(res.message);
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="m-auto w-full max-w-[80%] shadow flex flex-col p-3 bg-white/70 ">
        <label htmlFor="updateProducts">Delete Product/Products</label>
        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <HiHomeModern size="25" className="animate-spin text-red-900" />
          </div>
        ) : (
          <Select
            defaultValue={deleteProductList}
            value={deleteProductList}
            onChange={handleDeleteSelect}
            options={deleteOptions}
            isMulti
            id="updateProducts"
            closeMenuOnSelect={false}
            allowSelectAll={true}
          />
        )}
        {loadingProductDelete ? (
          <div className="flex flex-col justify-center items-center">
            <HiHomeModern size="25" className="animate-spin text-red-900" />
          </div>
        ) : (
          <button
            className="bg-red-900 hover:bg-red-700 text-white text-lg font-medium p-1 rounded my-2 drop-shadow max-w-fit m-auto"
            onClick={handleProductDelete}
          >
            Delete Selected products
          </button>
        )}
      </div>
    </div>
  );
};

export default DeleteProduct;
