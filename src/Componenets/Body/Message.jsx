import React from "react";
import { MdCropSquare } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setupdateemail } from "../../redux/slice";
import { motion } from "framer-motion";

export const Message = ({ email }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showMail = () => {
    dispatch(setupdateemail(email));
    navigate(`/mail/${email.id}`);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  const getISTTimeOrDate = (isoString) => {
    if (!isoString) return "invalid time";

    // Convert ISO string back to Date object
    const date = new Date(isoString);

    // Get today's date in IST
    const today = new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    });

    // Get the date of the email in IST
    const emailDate = date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    });

    if (today === emailDate) {
      // Return the time if the email was sent today
      return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });
    } else {
      // Return the date if the email was sent on a different day
      return emailDate;
    }
  };

  return (
    <motion.div
      onClick={showMail}
      className="w-full md:py-1 border-gray-200 flex items-start justify-between border-b cursor-pointer hover:shadow-md md:px-4 text-[10px] md:text-sm flex-shrink-1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Icon Section */}
      <div className="flex items-center gap-1 md:gap-3">
        <div className="text-gray-300">
          <MdCropSquare className="box-icon md:md-box-icon" />
        </div>
        <div className="text-gray-300">
          <RiStarLine className="star-icon md:md-star-icon" />
        </div>
      </div>

      {/* Title Section */}
      <div className="flex-none md:min-w-40 min-w-20 mx-1 md:mx-3 text-gray-800">
        <div className="font-semibold">{email?.subject}</div>
      </div>

      {/* Content Section */}
      <div className="md:flex-1 min-w-0 text-gray-600 truncate">
        {email?.message}
      </div>

      {/* Time Section */}
      <div className="text-gray-500 text-[6px] md:text-[14px]">
        <p>{getISTTimeOrDate(email?.createdAt)}</p>
      </div>
    </motion.div>
  );
};
