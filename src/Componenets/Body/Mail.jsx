import React from "react";
import { BiArchiveIn } from "react-icons/bi";
import { IoMdArrowBack } from "react-icons/io";
import {
  MdOutlineDelete,
  MdOutlineMarkEmailUnread,
  MdOutlineReport,
  MdDriveFileMoveOutline,
} from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export const Mail = () => {
  const params = useParams();
  const { updateemail } = useSelector((store) => store.appslice);
  let navigate = useNavigate();

  const back = () => {
    navigate("/");
  };

  const deleteMessage = async (id) => {
    await deleteDoc(doc(db, "emails", id));
    navigate("/");
  };

  // Convert timestamp to IST and format the time
  const getISTTime = (timestamp) => {
    if (!timestamp?.seconds) return "";

    // Convert Firestore timestamp to JavaScript Date object
    const date = new Date(timestamp.seconds * 1000);

    // Convert the date to IST using toLocaleString with timeZone option
    const istTime = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata", // Ensure correct conversion to IST
    });

    return istTime;
  };

  const getISTDate = (timestamp) => {
    if (!timestamp?.seconds) return "";

    // Convert Firestore timestamp to JavaScript Date object
    const date = new Date(timestamp.seconds * 1000);

    // Convert the date to IST using toLocaleDateString with timeZone option
    const istDate = date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Kolkata", // Ensure correct conversion to IST
    });

    return istDate;
  };

  return (
    <div className="bg-[#ffffff] rounded-xl flex-1 h-[90vh] overflow-y-auto ">
      {/* //Top Icons In Inbox */}
      <div className="flex items-center justify-between px-4 ">
        <div className="flex items-end gap-1 text-gray-500 py-2 ml-[2rem]">
          <div onClick={back} className="p-2 hover:bg-gray-100 cursor-pointer rounded-full">
            <IoMdArrowBack className="w-3 h-3 md:w-6 md:h-6"/>
          </div>
          <div className="p-2 hover:bg-gray-100 cursor-pointer rounded-full">
            <BiArchiveIn className="w-3 h-3 md:w-6 md:h-6"/>
          </div>
          <div className="p-2 hover:bg-gray-100 cursor-pointer rounded-full">
            <MdOutlineReport className="w-3 h-3 md:w-6 md:h-6"/>
          </div>
          <div onClick={() => deleteMessage(params.id)} className="p-2 hover:bg-gray-100 cursor-pointer rounded-full">
            <MdOutlineDelete className="w-3 h-3 md:w-6 md:h-6"/>
          </div>
          <div className="p-2 hover:bg-gray-100 cursor-pointer rounded-full">
            <MdOutlineMarkEmailUnread className="w-3 h-3 md:w-6 md:h-6"/>
          </div>
          <div className="p-2 hover:bg-gray-100 cursor-pointer rounded-full">
            <MdDriveFileMoveOutline className="w-3 h-3 md:w-6 md:h-6"/>
          </div>
          <div className="p-2 hover:bg-gray-100 cursor-pointer rounded-full">
            <IoMdMore className="w-3 h-3 md:w-6 md:h-6"/>
          </div>
        </div>
      </div>
      {/* //subject and inbox message */}
      <div className="p-[4rem] md:text-sm text-[10px]  mt-[-5rem] md:[-2rem]">
        <div className="flex items-center gap-1 justify-between ">
          <div className="flex items-center gap-2">
            <h1 className="">{updateemail?.subject}</h1>
            <p className="text-[10px] md:text-sm bg-gray-200 rounded-sm px-4">Inbox</p>
          </div>
          <div className="text-gray-500 text-sm my-5">
            {getISTDate(updateemail?.createdAt)} at {getISTTime(updateemail?.createdAt)}
          </div>
        </div>
        <div>
          <p>{updateemail?.to}</p>
        </div>
        <div className="my-10">
          {updateemail?.message}
        </div>
      </div>
    </div>
  );
};
