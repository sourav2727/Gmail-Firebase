import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setopen } from "../../redux/slice";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";


export const SendMailBox = () => {
  const open = useSelector((store) => store.appslice.open);
  const dispatch = useDispatch();
  const [formdata, setformdata] = useState({
    to: "",
    subject: "",
    message: "",
  });
  const submitHandle = async (e) => {
    e.preventDefault(); 
    try {
      await addDoc(collection(db, "emails"), {
        to: formdata.to,
        subject: formdata.subject,
        message: formdata.message,
        createdAt: serverTimestamp(),
      });
      dispatch(setopen(false)); // Close the form after submission
      setformdata({
        to: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  
  const handleChange = (e) => {
    let { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}
    >
      <div className="flex px-3 py-2 bg-[#F2F6FC] justify-between rounded-t-md ">
        <h1>New Message</h1>
        <div
          onClick={() => {
            console.log("clicked on cross");
            dispatch(setopen(false));
          }}
          className="hover:bg-gray-200 cursor-pointer p-2 rounded-full "
        >
          <RxCross2 size={20} />
        </div>
      </div>
      <form onSubmit={submitHandle} className="flex flex-col p-3 gap-2">
        <input
          onChange={handleChange}
          value={formdata.to}
          name="to"
          type="text"
          placeholder="to"
          className="outline-none"
        />
        <input
          onChange={handleChange}
          value={formdata.subject}
          name="subject"
          type="text"
          placeholder="subject"
          className="outline-none"
        />
        <textarea
          onChange={handleChange}
          value={formdata.message}
          name="message"
          id=""
          cols={30}
          rows={10}
          className=""
        ></textarea>
        <button
          type="submit"
          className="font-medium text-white rounded-full px-1 bg-[#0B57D0]"
        >
          Send
        </button>
      </form>
    </div>
  );
};
