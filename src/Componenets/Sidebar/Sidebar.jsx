import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { MdOutlineDrafts, MdOutlineWatchLater } from "react-icons/md";
import { RiInboxFill } from "react-icons/ri";
import { TbSend2 } from "react-icons/tb";
import { More } from "./More";
import { useDispatch } from "react-redux";
import { setopen } from "../../redux/slice";

const sideBarIcons = [
  { text: "Index", icon: <RiInboxFill className="w-3 h-3 md:w-6 md:h-6" /> },
  { text: "Starred", icon: <IoMdStar className="w-3 h-3 md:w-6 md:h-6" /> },
  { text: "Snoozed", icon: <MdOutlineWatchLater className="w-5 h-5 md:w-6 md:h-6" /> },
  { text: "Sent", icon: <TbSend2 className="w-3 h-3 md:w-6 md:h-6" /> },
  { text: "Drafts", icon: <MdOutlineDrafts className="w-3 h-3 md:w-6 md:h-6" /> },
];

export const Sidebar = () => {
  // const [open, setopen] = useState(false);
  let dispatch = useDispatch();

  return (
    <div className="flex md:flex-wrap ">
      <aside className="w-[25%] ml-3 text-[#7f8084] md:w-[9%] md:text-sm md:bg-[#f6f8fc] ">
        <button
          onClick={() => dispatch(setopen(true))}
          className="w-[80%] flex items-center py-2  p-1 md:p-4 bg-[#c2e7ff] text-black font-semibold rounded-xl hover:shadow-lg"
        >
          <LuPencil  className="w-3 h-3 md:w-6 md:h-6"/>
          <div className="text-[10px] md:text-[14px] ">Compose</div>
        </button>
        <div className="mt-5">
          {sideBarIcons.map((item, index) => (
            <div
              key={index}
              className="w-[80%] flex items-center gap-4 rounded-full hover:bg-gray-300  p-2 text-black text-[10px] md:text-[14px]"
            >
              {item.icon}
              <p>{item.text}</p>
            </div>
          ))}
          <More />
        </div>
      </aside>
    </div>
  );
};
