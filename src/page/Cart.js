import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assets/empty-cart.gif";
import { toast } from "react-hot-toast";
import { setCartData } from "../redux/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { HiHomeModern } from "react-icons/hi2";

const Cart = () => {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [guestData, setGuestData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
  });

  const productCartItem = useSelector((state) => state.product.cartItem);

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = localStorage.getItem("location");

  let totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.price),
    0
  );

  //vat = 7.5%
  const totalVat = Math.floor((7.5 / 100) * parseInt(totalPrice));
  totalPrice = Math.floor(parseInt(totalPrice) + parseInt(totalVat));

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setGuestData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlePayment = async () => {
    if (user.mobile || guestData.mobile) {
      setPaymentLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/payment?amount=${totalPrice}&email=${
          user._id ? user.email : guestData.email
        }`
      );

      const data = await res.json();

      const orderRes = await fetch(
        `${process.env.REACT_APP_BASE_URL}/createorder`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            amount: totalPrice,
            userID: user?._id && user._id,
            guest: guestData,
            userType: user?._id ? "registered" : "guest",
            method: "online",
            payment_status: "pending",
            order_status: "pending",
            reference: data?.data?.reference,
            cartData: productCartItem,
            location: location,
          }),
        }
      );

      const orderData = await orderRes.json();
      console.log(orderData);
      setPaymentLoading(false);
      toast("Redirect to payment Gateway...!");
      dispatch(setCartData([]));
      window.location.href = data.data.authorization_url;
    } else {
      toast(
        "Kindly login or provide the required details to continue purchase"
      );
    }
  };

  return (
    <div className="bg-white h-[calc(100vh-4rem)] ">
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-red-900 bg-[rgb(255,255,255,.8)] p-2 rounded max-w-fit">
          Your Cart Items
        </h2>

        {productCartItem[0] ? (
          <div className="my-4 flex flex-col md:flex-row gap-3">
            {/* display cart items  */}
            <div className="w-full max-w-3xl flex flex-col gap-2">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.images[0]}
                    category={el.category}
                    total={el.total}
                    price={el.price}
                    date={el.date}
                    state={el.state}
                    country={el.country}
                    booked={el.booked}
                  />
                );
              })}
            </div>

            {/* total cart item  */}
            <div className="w-full max-w-md  ml-auto bg-[rgb(255,255,255,.8)] p-2 max-h-fit">
              <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full p-2 text-lg border-b">
                <p>Total Vat</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-green-500">₦</span> {totalVat}
                </p>
              </div>
              <div className="flex w-full p-2 text-lg border-b">
                <p>Total Price</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-green-500">₦</span> {totalPrice}
                </p>
              </div>
              {!user?.firstName && (
                <div className="p-6 mb-6">
                  <div className="my-6">
                    <h3>You're not logged in</h3>
                    <Link to={"/login"} className="text-red-900 underline">
                      Log in
                    </Link>
                    <h3>Or kindly provide the details below</h3>
                  </div>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type={"text"}
                    id="firstName"
                    name="firstName"
                    className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                    value={guestData.firstName}
                    onChange={handleOnChange}
                  />

                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type={"text"}
                    id="lastName"
                    name="lastName"
                    className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                    value={guestData.lastName}
                    onChange={handleOnChange}
                  />

                  <label htmlFor="email">Email</label>
                  <input
                    type={"email"}
                    id="email"
                    name="email"
                    className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                    value={guestData.email}
                    onChange={handleOnChange}
                  />

                  <label htmlFor="mobile">Mobile</label>
                  <input
                    type={"mobile"}
                    id="mobile"
                    name="mobile"
                    className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                    value={guestData.mobile}
                    onChange={handleOnChange}
                  />

                  <label htmlFor="email">Address</label>
                  <input
                    type={"text"}
                    id="address"
                    name="address"
                    className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                    value={guestData.address}
                    onChange={handleOnChange}
                  />
                </div>
              )}
              {paymentLoading ? (
                <div className="flex flex-col justify-center items-center mt-2">
                  <HiHomeModern
                    size="25"
                    className="animate-spin text-red-900"
                  />
                </div>
              ) : (
                <button
                  className="bg-red-900 hover:bg-red-600 w-full text-lg font-bold py-2 text-white"
                  onClick={handlePayment}
                >
                  Proceed To Payment
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center flex-col p-4">
              <img
                src={emptyCartImage}
                className="w-full max-w-sm rounded-lg drop-shadow-2xl"
              />
              <p className="text-red-900 text-3xl font-bold mt-4">Empty Cart</p>

              <button
                onClick={() => {
                  navigate("/");
                  window.location.reload();
                }}
                className="w-full max-w-[150px] m-auto  bg-red-900 hover:bg-red-600 cursor-pointer text-white text-center p-2 rounded mt-4"
              >
                Start Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
