import "./App.css";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProduct, setCartData } from "./redux/productSlice";
import { loginRedux } from "./redux/userSlice";
import { bannerRedux } from "./redux/bannerSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.product.cartItem);
  const productData = useSelector((state) => state.product.productList);
  const user = localStorage.getItem("user");
  const location = localStorage.getItem("location");

  //reload product on refresh
  useEffect(() => {
   
      (async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/product`, {
          credentials: "include",
        });
        const resData = await res.json();
       
        dispatch(setDataProduct(resData));
        
      })();
    
  }, []);

  //reload user on refresh
  useEffect(() => {
    (async () => {
      const retrievedUser = localStorage.getItem("user");
      if (retrievedUser) {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/user/${JSON.parse(retrievedUser)}`
        );
        const resData = await res.json();
        dispatch(loginRedux(resData));
      }
    })();
  }, []);
  


  //store cart data
  useEffect(() => {
    //store cart data to local storage whenever cart changes
    //first check if there is already a stored cart
    const cartExists = window.localStorage.getItem("cart");
    //remove current cart data if one exists
    if (cartExists) {
      window.localStorage.removeItem("cart");
    }
    //set new cart data
    const data = JSON.stringify(cartData);
    window.localStorage.setItem("cart", data);
    if (user) {
      //send or update user cart database in server
      (async () => {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/updatecart/${JSON.parse(user)}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(cartData),
          }
        );
        const dataRes = await res.json();
      })();
    }
  }, [cartData]);

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
