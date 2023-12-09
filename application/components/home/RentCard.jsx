import { location } from "@/assets";
import Image from "next/image";

export const RentCard = ({ title, image, key, price, address }) => {
  return (
    <div className="w-[80%] cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-slate-600 px-2 py-4 rounded">
      <Image className=" mb-5" src={image} alt={key + "Image"} width={300} height={300} />
      <div className="flex justify-between mb-2 mx-3">
        <div>{price}</div>
        <div>{bhk}bhk</div>
      </div>
      <Image className=" mx-3 inline-block" src={location} alt={key} width={20} />
      {city}, {state}
    </div>
  );
};
