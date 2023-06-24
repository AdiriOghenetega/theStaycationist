import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { BsCloudUpload } from "react-icons/bs";
import {HiHomeModern} from "react-icons/hi2"
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOrderData, setDataProduct } from "../redux/productSlice";
import { GrPrevious, GrNext } from "react-icons/gr";


const Admin = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    address: "",
    state: "",
    country: "",
    rooms: "",
    baths: "",
    images: [],
  });

  console.log(data.images);

  const [loading, setLoading] = useState(false);

  const [orderLoading, setOrderLoading] = useState(false);

  const [roleLoading, setRoleLoading] = useState(false);

  const [loadingProductDelete, setLoadingProductDelete] = useState(false);

  const [deleteProductList, setDeleteProductList] = useState([]);

  const [location, setLocation] = useState("");

  const [count, setCount] = useState(0);

  const [roleData, setRoleData] = useState({
    user_email: "",
    role: "",
  });

  const [productData, setProductData] = useState([]);

  const orderList = useSelector((state) => state.product.orderList);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

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

  //fetch orders
  useEffect(() => {
    (async () => {
      try {
        setOrderLoading(true);
        const fetchOrders = await fetch(
          `${process.env.REACT_APP_BASE_URL}/getorders`
        );
        const res = await fetchOrders.json();

        if (res) {
          res.data && dispatch(setOrderData(res.data));
          res.message && toast(res.message);
          setOrderLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const deleteOptions = productData.map((el) => {
    return { label: el.name, value: el._id };
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    console.log("upload called");
    const data = await ImagetoBase64(e.target.files[0]);

    console.log(data);

    setData((prev) => {
      return {
        ...prev,
        images: [...prev.images, data],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    if (user?._id) {
      const { name, images, category, price, address,state,country } = data;

      if (name && images && category && price && address && state && country) {
        try {
          setLoading(true);
          const fetchData = await fetch(
            `${process.env.REACT_APP_BASE_URL}/uploadProduct/${user?._id}`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );

          const fetchRes = await fetchData.json();

          console.log(fetchRes);
          toast(fetchRes.message);
          setLoading(false);

          setData(() => {
            return {
              name: "",
              category: "",
              price: "",
              description: "",
              address: "",
              state: "",
              country: "",
              rooms: "",
              baths: "",
              images: [],
            };
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        toast("Enter required Fields");
      }
    } else {
      toast("only admins can perform this action");
    }
  };

  const handleUpdate = (e) => {
    const { value } = e.target;
    setLocation(value);
  };

  const prevOrder = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  const nextOrder = () => {
    if (count < orderList?.length - 1) {
      setCount((prev) => prev + 1);
    }
  };

  const updateOrderStatus = async () => {
    try {
      setOrderLoading(true);
      const updateOrders = await fetch(
        `${process.env.REACT_APP_BASE_URL}/updateorder?order_id=${orderList[count]._id}&user_id=${user._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ orderStatus: "Delivered" }),
        }
      );
      const res = await updateOrders.json();

      if (res) {
        res.data && dispatch(setOrderData(res.data));
        setOrderLoading(false);
        res.message && toast(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrderList = async () => {
    try {
      if (user?._id) {
        setOrderLoading(true);
        const deleteOrder = await fetch(
          `${process.env.REACT_APP_BASE_URL}/deleteall/${user?._id}`,
          {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(orderList),
          }
        );
        const res = await deleteOrder.json();

        if (res) {
          res.data && dispatch(setDataProduct(res.data));
          setOrderLoading(false);
          res.message && toast(res.message);
          setTimeout(() => {
            window.location.reload(true);
          }, 1000);
        }
      } else {
        toast("only admins can perform this action");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteOrder = async () => {
    try {
      setOrderLoading(true);
      const deleteOrder = await fetch(
        `${process.env.REACT_APP_BASE_URL}/deleteone?order_id=${orderList[count]._id}&user_id=${user._id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(orderList),
        }
      );
      const res = await deleteOrder.json();

      if (res) {
        res.data && dispatch(setOrderData(res.data));
        setOrderLoading(false);
        res.message && toast(res.message);
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoleChange = (e) => {
    const { name, value } = e.target;

    setRoleData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleRoleSubmit = async () => {
    try {
      setRoleLoading(true);
      const updateOrders = await fetch(
        `${process.env.REACT_APP_BASE_URL}/changeuserrole/${user._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(roleData),
        }
      );
      const res = await updateOrders.json();

      if (res) {
        toast(res.message);
        setRoleLoading(false);
        setRoleData({
          user_email: "",
          role: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        res.data && dispatch(setOrderData(res.data));
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
    <div className="p-4 bg-white">
      <div className="m-auto w-full max-w-[80%] shadow flex flex-col p-3 bg-white/70">
        <label htmlFor="user_email">User Email</label>
        <input
          type={"text"}
          id="user_email"
          name="user_email"
          className="bg-slate-200 p-1 my-1"
          onChange={handleRoleChange}
          value={roleData.user_email}
        />
        <label htmlFor="role">Change User Role</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="role"
          name="role"
          onChange={handleRoleChange}
          value={roleData.role}
        >
          <option>Select Role</option>
          <option value={"admin"}>admin</option>
          <option value={"user"}>user</option>
        </select>
        {roleLoading ? (
          <div className="flex flex-col justify-center items-center mt-4">
            <HiHomeModern size="25" className="animate-spin text-red-900" />
          </div>
        ) : (
          <button
            className="bg-red-900 hover:bg-red-700 text-white w-fit font-medium p-2 rounded my-2 drop-shadow m-auto"
            onClick={handleRoleSubmit}
          >
            Change User Role
          </button>
        )}
      </div>
      <hr className="m-4" />
      <form
        className="m-auto w-full max-w-[80%] shadow flex flex-col p-3 bg-white/70"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type={"text"}
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="category"
          name="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option>Select Category</option>
          <option value={"onebed"}>One Bedroom Apartment</option>
          <option value={"twobed"}>Two Bedroom Apartment</option>
          <option value={"deluxeapartment"}>Deluxe Apartment</option>
        </select>

        <label htmlFor="image">
          Image
          <div className="h-48 w-full bg-slate-200 relative rounded flex-col items-center justify-center cursor-pointer overflow-hidden">
            <div className="flex flex-wrap overflow-hidden">
              {data.images.length > 0 &&
                data.images.map((elem, index) => {
                  return (
                    <div key={index}>
                      <img src={elem} className="h-[90px] w-[90px]" />
                    </div>
                  );
                })}
            </div>
            <div className="text-5xl absolute top-[40%] left-[47%]">
              <BsCloudUpload />
            </div>

            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>

        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type={"text"}
          className="bg-slate-200 p-1 my-1"
          name="price"
          onChange={handleOnChange}
          value={data.price}
        />
        <label htmlFor="rooms" className="my-1">
          Rooms
        </label>
        <input
          type={"text"}
          className="bg-slate-200 p-1 my-1"
          name="rooms"
          onChange={handleOnChange}
          value={data.rooms}
        />
        <label htmlFor="baths" className="my-1">
          Baths
        </label>
        <input
          type={"text"}
          className="bg-slate-200 p-1 my-1"
          name="baths"
          onChange={handleOnChange}
          value={data.baths}
        />

        <label htmlFor="address">Address</label>
        <input
          type={"text"}
          value={data.address}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="address"
          onChange={handleOnChange}
        />

        <label htmlFor="state">State</label>
        <input
          type={"text"}
          value={data.state}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="state"
          onChange={handleOnChange}
        />

        <label htmlFor="country">Country</label>
        <input
          type={"text"}
          value={data.country}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="country"
          onChange={handleOnChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          value={data.description}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="description"
          onChange={handleOnChange}
        ></textarea>

        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <HiHomeModern size="25" className="animate-spin text-red-900" />
          </div>
        ) : (
          <button className="bg-red-900 hover:bg-red-700 text-white font-medium p-2 w-fit rounded my-2 drop-shadow m-auto">
            Save
          </button>
        )}
      </form>
      <hr className="m-4" />
      <div className="m-auto w-full max-w-[80%] shadow flex flex-col p-3 bg-white/70 ">
        <label htmlFor="updateProducts">Delete Product/Products</label>
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
      <hr className="m-4" />
      <div className="m-auto w-full max-w-[80%] shadow flex flex-col p-3 bg-white/70">
        <label htmlFor="updateProducts">Update Products</label>
        <select
          id="updateProducts"
          className="bg-slate-200 p-1 my-1"
          onChange={handleUpdate}
          name="updateProducts"
        >
          <option>Select Location</option>
          <option>Abuloma</option>
          <option>Rumuodara</option>
          <option>Phrc</option>
        </select>
        <button
          className="bg-red-900 hover:bg-red-700 text-white w-fit font-medium p-2 rounded my-2 drop-shadow m-auto"
          onClick={() => navigate(`/admin/${location}`)}
        >
          GO
        </button>
      </div>
      <hr className="m-4" />
      <div className="m-auto w-full max-w-[95%] md:max-w-[80%] shadow flex flex-col p-3 bg-white/70">
        <h2>Order List</h2>
        <div className="flex justify-between items-center">
          <button
            className="w-fit bg-red-900 hover:bg-red-700 cursor-pointer text-white text-left p-2 rounded mt-4"
            onClick={() => window.location.reload(true)}
          >
            Refresh Order-List
          </button>
          <button
            className="w-fit bg-red-900 hover:bg-red-700 cursor-pointer text-white text-left p-2 rounded ml-4 mt-4"
            onClick={deleteOrderList}
          >
            Delete Order-List
          </button>
          <div className="ml-auto flex gap-4">
            <h2 className="ml-2 md:ml-0">
              {orderList?.length > 0 ? count + 1 : count} of {orderList?.length}
            </h2>
            <button
              onClick={prevOrder}
              className={`bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded ${
                count <= 0 && "pointer-events-none opacity-20"
              }`}
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextOrder}
              className={`bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded ${
                count >= orderList?.length - 1 &&
                "pointer-events-none opacity-20"
              }`}
            >
              <GrNext />
            </button>
          </div>
        </div>
        {orderList?.length ? (
          <div
            key={orderList[count]?._id}
            className="m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-200/70"
          >
            <h2 className="text-bold text-red-900">Customer Details : </h2>
            <div className="m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              <p className="text-sm">
                Customer Name :{" "}
                {orderList[count]?.user?.firstName
                  ? orderList[count]?.user?.firstName +
                    " " +
                    orderList[count]?.user?.lastName
                  : orderList[count]?.guest?.firstName +
                    " " +
                    orderList[count]?.guest?.lastName}
              </p>
              <p className="text-sm">
                Customer Mobile :{" "}
                {orderList[count]?.user?.mobile
                  ? orderList[count]?.user?.mobile
                  : orderList[count]?.guest?.mobile}
              </p>
              <p className="text-sm">
                Customer Address :{" "}
                {orderList[count]?.user?.address
                  ? orderList[count]?.user?.address
                  : orderList[count]?.guest?.address}
              </p>
            </div>
            <h2 className="text-bold mt-2 text-red-900">Cart Items : </h2>
            {orderList[count]?.cart?.map((elem) => {
              return (
                <div
                  key={elem._id}
                  className="m-auto w-full mt-2 shadow flex flex-col p-3 bg-slate-300/70"
                >
                  <p className="text-sm">Product Name : {elem?.name}</p>
                  <p className="text-sm">Product Price : {elem.price}</p>
                  <p className="text-sm">Product Quantity : {elem.qty}</p>
                </div>
              );
            })}
            <h2 className="text-bold mt-2 text-red-900">Other Details : </h2>
            <h2 className="text-bold m-auto w-full mt-2 shadow flex flex-col p-3 bg-slate-300/70">
              Total Amount : {orderList[count]?.amount}
            </h2>
            <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              Payment Method : {orderList[count]?.paymentMethod}
            </h2>
            <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              Payment Status : {orderList[count]?.paymentStatus}
            </h2>
            <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              Order Time : {orderList[count]?.createdAt}
            </h2>
            <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              Order Reference : {orderList[count]?.transactionReference}
            </h2>
            <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              Order Location : {orderList[count]?.location}
            </h2>
            <div>
              <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
                Order Status : {orderList[count]?.orderStatus}
              </h2>
              {orderLoading ? (
                <div className="flex flex-col justify-center items-center mt-2">
                  <HiHomeModern
                    size="25"
                    className="animate-spin text-red-900"
                  />
                </div>
              ) : (
                orderList[count]?.orderStatus !== "Delivered" && (
                  <button
                    className="bg-red-900 hover:bg-red-700 text-white font-medium p-2 w-fit rounded my-2 drop-shadow m-auto"
                    onClick={updateOrderStatus}
                  >
                    Mark Order Delivered
                  </button>
                )
              )}
              <button
                className="bg-red-900 hover:bg-red-700 text-white font-medium p-2 w-fit rounded ml-2 my-2 drop-shadow m-auto"
                onClick={DeleteOrder}
              >
                Delete Order
              </button>
            </div>
          </div>
        ) : orderLoading ? (
          <div className="flex flex-col justify-center items-center">
            <HiHomeModern size="25" className="animate-spin text-red-900" />
          </div>
        ) : (
          <h2 className="text-bold mt-2 text-red-900">
            You have no orders at the moment
          </h2>
        )}
      </div>
    </div>
  );
};

export default Admin;
