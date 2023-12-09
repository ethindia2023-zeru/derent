"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
const page = () => {
  const [formData, setFormData] = useState({
    title:"",
    address: "",
    rent: "",
    advance: "",
    securityDeposit: "",
    isAuction:false,
    image: null,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    setFormData(prevData => ({ ...prevData, image: file }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., send data to server)
    console.log("Form submitted:", formData);
  };
  const handleRadio=(e)=>{
    const {value,name}=e.target;
    if(value==="for_rent"){
      setFormData(prevData=>({...prevData,isAuction:false}));
    }
    else{
      setFormData(prevData=>({...prevData,isAuction:true}));
    }
  }
  return (
    <div className="max-w-md mx-auto my-8 bg-white p-6 rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="cityState" className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="cityState" className="block text-gray-700 text-sm font-bold mb-2">
              Rent
            </label>
            <input
              type="text"
              id="rent"
              name="rent"
              placeholder="rent"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address:
          </label>
          <textarea
            id="address"
            name="address"
            placeholder="address"
            value={formData.address}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border rounded-md"
            required
          ></textarea>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">

          <div>
            <label htmlFor="financials" className="block text-gray-700 text-sm font-bold mb-2">
              Security Deposit
            </label>
            <input
              type="text"
              id="secuirtyDeposit"
              name="securityDeposit"
              placeholder="deposit"
              value={formData.securityDeposit}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="financials" className="block text-gray-700 text-sm font-bold mb-2">
              Advance:
            </label>
            <input
              type="text"
              id="advance"
              name="advance"
              placeholder="advance"
              value={formData.advance}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        {/* for the radio button */}
        <div className="max-w-md  bg-white p-6 rounded-md shadow-md">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Listing Type:
      </label>

      <div className="mt-2">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-blue-500"
            name="listing_type"
            value="for_rent"
            onClick={handleRadio}
            defaultChecked
          />
          <span className="ml-2">For Rent</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="radio"
            className="form-radio text-blue-500"
            name="listing_type"
            onClick={handleRadio}
            value="auction"
          />
          <span className="ml-2">Auction</span>
        </label>
      </div>
    </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2"
          />
        </div>

        <Button
          type="submit"
          className=" flex justify-center mx-auto "
        >
          Post
        </Button>
      </form>
    </div>
  );
};

export default page;
