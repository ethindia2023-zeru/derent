import { location } from "@/assets"
import Image from "next/image"

export const RentCard = ({image,key,price,bhk,city,state}) => {

  return (
    <div className="w-[80%] cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-slate-600 px-2 py-4 rounded">
    <Image
        className=" mb-5"
        src={image}
        alt={key+"Image"}
        width={300}
        height={300}
    />
    <div className="flex justify-between mb-2">
        <div>
            Title
        </div>
        <div>
            {price}
        </div>
    </div>
    <div className=" text-left flex items-center">
    <Image   src={location} alt={key} width={16}/>
    {city}
    </div>
    </div>
  )
}

