import React, { useState } from "react";
import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import { GoTag } from "react-icons/go";
import { IoMdMore, IoMdRefresh } from "react-icons/io";
import {
  MdCropSquare,
  MdInbox,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { Messages } from "./Messages";
import { Mail } from "./Mail";

const horizontalMail = [
  {
    text: "Primary",
    icon: <MdInbox className="w-3 h-3 md:w-6 md:h-6" />,
  },
  {
    text: "Promotions",
    icon: <GoTag className="w-3 h-3 md:w-6 md:h-6" />,
  },
  {
    text: "Social",
    icon: <FaUserFriends className="w-3 h-3 md:w-6 md:h-6" />,
  },
];

export const Inbox = () => {
  const [mailbottom, setMailBottom] = useState(0);

  return (
    
      <div className="bg-[#ffffff] rounded-xl md:flex-1 h-[90vh] overflow-x-hidden ml-[4rem] md:ml-[0rem]">
        <div className="flex items-center px-4 justify-between sticky top-0 z-10 bg-white">
          <div className="flex items-center  md:gap-4 py-2 md:py-4 text-gray-700">
            <div className="flex items-center rounded-full">
              <div className="hover:bg-gray-100 rounded-md p-2 md:p-3 text-[#7f8084]">
                <MdCropSquare className="w-3 h-3 md:w-6 md:h-6" />
              </div>
              <div className="hover:bg-gray-100 rounded-md p-2 md:p-3 text-[#7f8084]">
                <FaCaretDown className="w-3 h-3 md:w-6 md:h-6" />
              </div>
            </div>
            <div className="hover:bg-gray-100 p-2 md:p-3 rounded-full text-[#7f8084]">
              <IoMdRefresh className="w-3 h-3 md:w-6 md:h-6" />
            </div>
            <div className="hover:bg-gray-100 p-2 md:p-3 rounded-full text-[#7f8084]">
              <IoMdMore className="w-3 h-3 md:w-6 md:h-6" />
            </div>
          </div>
          {/* Left-right arrow */}
          <div className="flex items-center cursor-pointer ">
            <div className="text-[10px] md:text-[14px] ">1-50 of 1000</div>
            <button>
              <MdKeyboardArrowLeft className="w-3 h-3 md:w-6 md:h-6" />
            </button>
            <button>
              <MdKeyboardArrowRight className="w-3 h-3 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
        <div className="flex flex-nowrap overflow-x-auto text-[10px] md:text-[14px]">
          {horizontalMail.map((item, index) => (
            <button
              key={index}
              className={`${
                mailbottom === index
                  ? "border-b-4 border-b-blue-600"
                  : "border-b-4 border-b-transparent"
              } text-gray-700 md:gap-1 ml-2 md:ml-4 flex items-center w-32 md:w-52 hover:bg-gray-100  md:p-4 flex-shrink-1`}
              onClick={() => setMailBottom(index)}
            >
              <div className={`${mailbottom === index ? "text-blue-600" : ""}`}>
                {item.icon}
              </div>
              {item.text}
            </button>
          ))}
        </div>
        <Messages />
      </div>
  );
};
