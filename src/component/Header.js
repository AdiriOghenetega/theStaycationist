import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import { useMediaQuery } from "react-responsive";
import { AiOutlineTwitter,AiFillInstagram,AiFillPhone,AiOutlineUser,AiOutlineShoppingCart,AiOutlineHome } from "react-icons/ai";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };
  const handleLogout = () => {
    console.log(localStorage);
    localStorage.removeItem("user");
    console.log(localStorage);
    dispatch(logoutRedux());
    toast("Logout successfully");
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 bg-white/[0.5] z-50">
      <Tooltip id="my-tooltip" />
      {/* desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10 ">
            <img src={logo} className="h-full bg-transparent" />
          </div>
        </Link>

        <div className="flex items-center ">
          <nav className="text-base md:text-lg hidden md:flex">
            <div className="mr-4">
              <a
                href="https://instagram.com"
                target="_blank" 
                rel="noreferrer"
              >
                <AiFillInstagram color="rgb(224,77,82)" size="27px" />
              </a>
            </div>
            <div className="mr-4">
              <a
                href="https://twitter.com/adiri_tega?t=tYACVBXxcjFscxCVd4dY5w&s=08"
                target="_blank"
                rel="noreferrer"
              >
                <AiOutlineTwitter color="rgb(29,155,240)" size="27px" />
              </a>
            </div>
            <div className="mr-4">
              <a
                href="tel:08142604385"
                target="_blank"
                rel="noreferrer"
              >
                <AiFillPhone color="green" size="27px" />
              </a>
            </div>
            <div className="w-0.5 bg-gray-600 mr-4"></div>
            <div>
              <Link to={""}>
                <AiOutlineHome
                  size="25px"
                  className="text-slate-900 mr-4"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Home"
                  data-tooltip-hidden={isMobile && true}
                />{" "}
              </Link>
            </div>
          </nav>

          <div className="mr-2 text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md text-slate-900">
              {userData.image ? (
                <img
                  src={userData.image}
                  className="h-full w-full"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={userData.firstName}
                  data-tooltip-hidden={isMobile && true}
                />
              ) : (
                <AiOutlineUser
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={
                    userData.firstName ? userData.firstName : "User"
                  }
                  data-tooltip-hidden={isMobile && true}
                  
                />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w-[120px] items-center">
                <Link
                  to={"admin"}
                  className="whitespace-nowrap cursor-pointer px-2"
                >
                  Admin Dashboard
                </Link>

                {userData.firstName ? (
                  <p
                    className="cursor-pointer text-white px-2 bg-red-900"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName}){" "}
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}
                <nav className="text-base md:text-lg grid grid-cols-2 p-2 md:hidden">
                <div className="m-2">
              <a
                href="https://instagram.com"
                target="_blank" 
                rel="noreferrer"
              >
                <AiFillInstagram color="rgb(224,77,82)" size="27px" />
              </a>
            </div>
            <div className="m-2">
              <a
                href="https://twitter.com/adiri_tega?t=tYACVBXxcjFscxCVd4dY5w&s=08"
                target="_blank"
                rel="noreferrer"
              >
                <AiOutlineTwitter color="rgb(29,155,240)" size="27px" />
              </a>
            </div>
            <div className="m-2">
              <a
                href="tel:08142604385"
                target="_blank"
                rel="noreferrer"
              >
                <AiFillPhone color="green" size="27px" />
              </a>
            </div>
            <div className="m-2">
              <Link to={""}>
                <AiOutlineHome
                  size="25px"
                  className="text-slate-900 "
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Home"
                  data-tooltip-hidden={isMobile && true}
                />{" "}
              </Link>
            </div>
                </nav>
              </div>
            )}
          </div>
          <div className={`text-2xl mr-2 text-slate-600 relative`}>
            <Link to={"cart"}>
              <AiOutlineShoppingCart
                data-tooltip-id="my-tooltip"
                className="text-slate-900"
                data-tooltip-content="Cart"
                data-tooltip-hidden={isMobile && true}
                size="25px"
              />
              <div className="absolute -top-1 -right-1 text-white bg-red-900 h-4 w-4 rounded-full m-0 p-0 text-sm flex flex-col justify-center items-center ">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
