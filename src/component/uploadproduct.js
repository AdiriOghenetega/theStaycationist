import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsCloudUpload } from "react-icons/bs";
import { HiHomeModern } from "react-icons/hi2";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { useSelector } from "react-redux";

const UploadProduct = () => {
  const user = useSelector((state) => state.user);

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

  const [loading, setLoading] = useState(false);

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
    const data = await ImagetoBase64(e.target.files[0]);

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
      const { name, images, category, price, address, state, country } = data;

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

  return (
    <div>
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
    </div>
  );
};

export default UploadProduct;
