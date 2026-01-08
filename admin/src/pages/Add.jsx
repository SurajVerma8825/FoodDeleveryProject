import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { categories, url } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const URLBACKEND = url;
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    category: "",
    productPrice: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let Data = new FormData();
    Data.append("name", formData.productName);
    Data.append("description", formData.productDescription);
    Data.append("category", formData.category);
    Data.append("price", Number(formData.productPrice));
    Data.append("image", image);

    try {
      const response = await axios.post(`${URLBACKEND}/food/add`, Data);
      if (response.status === 200) {
        setFormData({
          productName: "",
          productDescription: "",
          category: "",
          productPrice: "",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        console.error("Failed to add food:", response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding food:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[70%]  ml-[5vw] mt-[20px]  font-poppins text-black font-medium">
      <h1 className="text-3xl pb-6 pt-4 text-primary text-center">
        Add Food Details Here
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col  items-center gap-4"
      >
        <div className="w-[60%]">
          <p>Upload Image</p>
          <label
            htmlFor="image"
            className="flex items-center w-full cursor-pointer border-2 py-2 rounded-lg bg-[#f0e4f2] mt-2"
          >
            <CloudUploadIcon className="text-gray-400 ml-2" fontSize="small" />

            <p className="text-gray-400 ml-2">Upload Image</p>
            <input
              type="file"
              id="image"
              name="image"
              placeholder="Upload Images"
              required
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <img
            src={image ? URL.createObjectURL(image) : ""}
            alt=""
            className="mt-2 rounded-xl "
          />
        </div>
        <div className="w-[60%]">
          <p>Product Name</p>
          <label
            htmlFor="productName"
            className="flex items-center w-full border-2 rounded-lg bg-[#f0e4f2] mt-2"
          >
            <PostAddIcon className="text-gray-400 ml-2" />
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              placeholder="Product Name"
              required
              className="bg-transparent outline-none ml-2 py-2  w-full"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="w-[60%]">
          <p> Product Description </p>
          <label
            htmlFor="productDescription"
            className="flex items-center w-full border-2 rounded-lg bg-[#f0e4f2] mt-2"
          >
            <textarea
              type="text"
              id="productDescription"
              name="productDescription"
              value={formData.productDescription}
              rows={4}
              placeholder="Write Content Here ..."
              required
              className="bg-transparent resize-none outline-none ml-2   w-full"
              onChange={handleChange}
            ></textarea>
          </label>
        </div>
        <div className="flex justify-between  items-center gap-8 w-[60%]">
          <div className="w-1/2  ">
            <p>Product Category</p>

            <select
              name="category"
              id=""
              value={formData.category}
              onChange={handleChange}
              className="flex items-center w-full border-2 rounded-lg bg-[#f0e4f2] mt-2 py-2 outline-none text-[#9d9d9d] px-2"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <p> Product Price </p>
            <label
              htmlFor="productPrice"
              className="flex items-center w-full border-2 rounded-lg bg-[#f0e4f2] mt-2"
            >
              <CurrencyRupeeIcon
                className="text-gray-400 ml-2"
                fontSize="small"
              />
              <input
                type="number"
                id="productPrice"
                name="productPrice"
                placeholder=" Product Price"
                value={formData.productPrice}
                required
                className="bg-transparent outline-none  py-2  w-full"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <div className="w-[60%]  mt-4 flex justify-center ">
          <button
            disabled={loading}
            type="submit"
            className="before:ease relative  px-6 mb-4   h-[40px] overflow-hidden rounded-xl bg-[#9c28b1] font-poppins text-white font-medium shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-[#9c28b1] hover:before:-translate-x-80"
          >
            {loading ? "Please wait..." : "Add Food Detail"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
