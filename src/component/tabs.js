import React, { useState } from "react";
import Orders from "../component/orders";
import UploadProduct from "../component/uploadproduct";
import UserRole from "../component/userrole";
import DeleteProduct from "../component/deleteproduct";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("first");

  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
  };

  const tabs = [
    {
      label: "Change User Role",
      eventKey: "first",
    },
    {
      label: "Upload Products",
      eventKey: "second",
    },
    {
      label: "Delete Products",
      eventKey: "third",
    },
    {
      label: "Orders",
      eventKey: "fourth",
    },
  ];

  return (
    <div className="flex w-full">
      <div className="w-[15%] p-2 flex flex-col justify-start items-start border-2 ">
        <h1 className="bg-gray-900 text-white text-bold w-full p-4 flex flex-col justify-center items-center mb-4">
          DASHBOARD
        </h1>
        {tabs.map((tab, index) => (
          <button
            onClick={() => handleTabChange(tab.eventKey)}
            key={index}
            className={`border-2 w-full flex flex-col justify-center items-center p-2 ${
              activeTab === tab.eventKey && "bg-red-900 text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="w-[75%] min-h-[calc(100vh-4em)]">
        {activeTab === "first" && <UserRole />}
        {activeTab === "second" && <UploadProduct />}
        {activeTab === "third" && <DeleteProduct />}
        {activeTab === "fourth" && <Orders />}
      </div>
    </div>
  );
};

export default Tabs;
