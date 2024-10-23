import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import gmail from "../assets/gmail.png";
import { IoIosSearch } from "react-icons/io";
import { TbListSearch } from "react-icons/tb";
import { MdOutlineContactSupport } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoApps } from "react-icons/io5";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { setsearchText, setusersignin } from "../redux/slice";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const Navbar = () => {
  const {usersignin}=useSelector(store=>store.appslice)
  const [input, setinput] = useState("");
  const [toggle, settogle] = useState(false);
  const dispatch = useDispatch();


  const signout = ()=>{
    signOut(auth).then(()=>{
      dispatch(setusersignin(null))
    }).catch((err)=>{
      console.log(err);
      
    })
  }
  console.log(usersignin)

  useEffect(() => {
    dispatch(setsearchText(input));
  }, [input]);

  return (
    <div className="mx-3 h-16 flex items-center justify-center">
      
      <div className="flex items-center gap-2 md:gap-4 lg:gap-8 justify-between w-full">
        {/* menu and gmail png */}
        <div className="flex items-center md:ml-3">
          <div
            className="cursor-pointer rounded-full md:p-3 hover:bg-gray-100"
            style={{ color: "#5f6368" }}
          >
            <GiHamburgerMenu className="icon-small md:icon-medium lg:icon-large" />
          </div>
          <img src={gmail} alt="Gmail" className="w-3 md:w-4 lg:w-8" />
          <h1 className="text-xs md:text-sm text-gray-500 font-medium">
            Gmail
          </h1>
        </div>

        {/* search menu */}
        <div className="w-[50%] md:mr-52 ">
          <div className="flex items-center bg-[#EAF1f8] md:px-2  md:py-3 py-1 rounded-full focus-within:bg-white focus-within:shadow-md">
            <IoIosSearch className="icon-small md:icon-medium lg:icon-large text-gray-700" />
            <input
              type="text"
              value={input}
              onChange={(e) => setinput(e.target.value)}
              placeholder="Search mail"
              className="w-full outline-none md:px-1 rounded-full bg-transparent text-base md:text-base"
            />
            <TbListSearch className="icon-small md:icon-medium lg:icon-large" />
          </div>
        </div>

        {/* support, settings, apps */}
        <div className="flex items-center gap-[0.30rem]">
          <div
            className="cursor-pointer rounded-full md:p-3 hover:bg-gray-100"
            style={{ color: "#5f6368" }}
          >
            <MdOutlineContactSupport className="icon-small md:icon-medium lg:icon-large" />
          </div>
          <div
            className="cursor-pointer rounded-full  md:p-3 hover:bg-gray-100"
            style={{ color: "#5f6368" }}
          >
            <CiSettings className="icon-small md:icon-medium lg:icon-large" />
          </div>
          <div
            className="cursor-pointer rounded-full  md:p-3 hover:bg-gray-100"
            style={{ color: "#5f6368" }}
          >
            <IoApps className="icon-small md:icon-medium lg:icon-large" />
          </div>
          <div className="cursor-pointer md:ml-3">
          
            <Avatar
              onClick={() => settogle(!toggle)}
              size={22}
              md:size={28}
              lg:size={34}
              src={usersignin?.photoURL}
              // name={usersignin.displayName}
              className="rounded-full"
            />
           
            <AnimatePresence>
              {toggle && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 z-20"
                >
                  {/* Dropdown content goes here */}

                  <p className="text-gray-700" onClick={signout}>Logout</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
     
    </div>
  );
};
