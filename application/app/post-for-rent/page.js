"use client";
import { useState } from "react";

const page = () => {
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    address: "",
    rent: "",
    advance: "",
    securityDeposit: "",
    waitingPeriodSecurityDeposit: "",
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

  return (
    <div className="max-w-md mx-auto my-8 bg-white p-6 rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="cityState" className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="cityState" className="block text-gray-700 text-sm font-bold mb-2">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="state"
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

        <div className="mb-4 grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="financials" className="block text-gray-700 text-sm font-bold mb-2">
              Rent
            </label>
            <input
              type="text"
              id="rent"
              name="rent"
              placeholder="rent"
              value={formData.rent}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
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
            <label className="block text-gray-700 text-sm font-bold mb-2">Waiting Period :</label>
            <input
              type="number"
              id="waitingPeriodSecurityDeposit"
              name="waitingPeriodSecurityDeposit"
              placeholder="WaitingPeriodSecurityDeposit"
              value={formData.waitingPeriodSecurityDeposit}
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

        <button
          type="submit"
          className="bg-blue-500 flex justify-center mx-auto text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default page;
