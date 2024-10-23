import React, { useState } from "react";
import { RiInboxFill } from "react-icons/ri";
import { IoMdStar } from "react-icons/io";
import { MdOutlineWatchLater, MdOutlineKeyboardArrowDown, MdOutlineDrafts } from "react-icons/md";
import { TbSend2 } from "react-icons/tb";

const showMoreIcons = [
  { text: "Index", icon: <RiInboxFill className="w-3 h-3 md:w-6 md:h-6"  /> },
  { text: "Starred", icon: <IoMdStar className="w-3 h-3 md:w-6 md:h-6"  /> },
  { text: "Snoozed", icon: <MdOutlineWatchLater className="w-3 h-3 md:w-6 md:h-6"  /> },
  { text: "Sent", icon: <TbSend2 className="w-3 h-3 md:w-6 md:h-6"  /> },
  { text: "Drafts", icon: <MdOutlineDrafts className="w-3 h-3 md:w-6 md:h-6"  /> },
];

export const More = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      <div
        onClick={toggleExpand}
        className="flex items-center gap-4 rounded-full hover:bg-gray-300 p-2 focus:bg-[rgba(211,227,253,1)] text-black cursor-pointer bg-[#f6f8fc]"
      >
        <MdOutlineKeyboardArrowDown size={24} />
        <p className="text-[10px] md:text-[14px]">{isExpanded ? "Less" : `More`}</p>
      </div>

      {isExpanded && (
        <div className="absolute top-full left-0 w-full   z-1 md:bg-[#f6f8fc]">
          {showMoreIcons.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-full hover:bg-gray-300 pr-6 p-2 focus:bg-[rgba(211,227,253,1)] text-black text-[10px] md:text-[14px]"
            >
              {item.icon}
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
