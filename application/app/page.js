"use client";
import Image from "next/image";
import { useState } from "react";
import { search, filter } from "@/assets";
import { houseData } from "@/data";
import { RentCard } from "@/components/home/RentCard";
export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = e => {
    const { name, value } = e.target;
    setSearchTerm(value);
  };

  // a function to handle the search
  const handleSearch = () => {
    // logic for searching a home for rent
    console.log("searching for", searchTerm);
  };
  return (
    <div className="w-full">
      {/* search bar */}
      <div className="relative mx-auto w-fit mb-10">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 cursor-pointer" onClick={handleSearch}>
          <Image src={search} alt="search" height={24} width={24} />
        </div>
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-2 hover:text-gray-700 cursor-pointer rounded-full "
          onClick={handleSearch}
        >
          <Image src={filter} alt="search" height={24} width={24} />
        </div>
        <input
          type="text"
          className="mx-auto pl-12 w-[817px] bg-transparent pr-4 py-2 border border-gray-300 rounded-full outline-none"
          placeholder="Search"
          onKeyDown={e => e.key === "Enter" && handleSearch()}
          onChange={handleInputChange}
        />
      </div>
      {/* rent section */}
      <div className=" mx-5 my-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 place-content-center w-full gap-1">
        {houseData.map(house => (
          <RentCard key={house.key} {...house} />
        ))}
        <div></div>
      </div>
    </div>
  );
}
