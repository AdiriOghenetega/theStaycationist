import React from "react";
import Orders from "../component/orders";
import UploadProduct from "../component/uploadproduct";
import UserRole from "../component/userrole";
import DeleteProduct from "../component/deleteproduct";


const Admin = () => {

  return (
    <div className="p-4 bg-white">
      <UserRole />
      <hr className="m-4" />
      <UploadProduct />
      <hr className="m-4" />
      <DeleteProduct />
      <hr className="m-4" />
      <Orders />
    </div>
  );
};

export default Admin;
