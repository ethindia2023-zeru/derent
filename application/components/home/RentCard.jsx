import { ethers } from "ethers";
import { MapPin } from "lucide-react";
import Image from "next/image";

export const RentCard = ({ title, image, key, price, address }) => {
  return (
    <div
      key={key}
      className="w-[80%] cursor-pointer hover:scale-105 transition-all duration-300 px-2 py-4 rounded border-[2px] border-[#F1F5F9]"
    >
      <Image className=" mb-5" src={image} alt={key + "Image"} width={300} height={300} />
      <div className="flex justify-between mb-2">
        <div>{title}</div>
        <div>{price && parseFloat(ethers.utils.formatEther(price.toString())).toFixed(2)} ETH</div>
      </div>
      <div className=" text-left flex items-center">
        <MapPin className="mr-2" size={20} />
        {address}
      </div>
    </div>
  );
};
