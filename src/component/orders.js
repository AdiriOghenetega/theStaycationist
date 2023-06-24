import React, { useState, useEffect } from "react";
import { HiHomeModern } from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setOrderData, setDataProduct } from "../redux/productSlice";
import { GrPrevious, GrNext } from "react-icons/gr";

const Orders = () => {
  const [orderLoading, setOrderLoading] = useState(false);
  const [count, setCount] = useState(0);

  const orderList = useSelector((state) => state.product.orderList);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

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

  return (
    <div>
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
                  <p className="text-sm"> Name : {elem?.name}</p>
                  <p className="text-sm"> Price : {elem.price}</p>
                  <p className="text-sm"> Booked Date : {elem.date.name}</p>
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

export default Orders;
