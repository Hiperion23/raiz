import Link from "next/link";
import React, { FC } from "react";
import Image from "next/image";
import { AiOutlineUnorderedList } from "react-icons/ai";
//import {Ratings} from "@/app/utils/Ratings.tsx"

type Props = {
  item: any;
  isProfile?: boolean;
};

const PropertieCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link
      href={
        !isProfile ? `/propertie/${item._id}` : `propertie-access/${item._id}`
      }
    >
      <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
        <div className="w-full h-[200px] overflow-hidden">
          <Image
            src={item.thumbnail?.url}
            width={500}
            height={300}
            objectFit="cover"
            className="rounded w-full h-full object-cover"
            alt=""
          />
        </div>
        <br />
        <h1 className="font-Poppins text-[16px] text-black dark:text-[#fff]">
          {item.name}
        </h1>
        <div className="w-full flex items-center justify-between pt-2">
          <h5 className={`text-black dark:text-[#fff] ${isProfile && "hidden 800px:inline"}`}>
            {item.purchased}comp(modificar)
          </h5>
        </div>
        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex">
            <h3 className="text-black dark:text-[#fff]">
              {item.price === 0 ? "Free" : item.price + "PEN"}
            </h3>
            <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-[#fff]">
              {item.estimatedPrice}PEN
            </h5>
          </div>
          <div className="flex items-center pb-3">
            <AiOutlineUnorderedList size={20} fill="#fff"/>
            <h5 className="pl-2 text-black dark:text-[#fff] ">
              {item.courseData?.length}Visitass
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertieCard;
