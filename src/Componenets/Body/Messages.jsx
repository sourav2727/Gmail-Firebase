import React, { useEffect, useState } from "react";
import { Message } from "./Message";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setemails } from "../../redux/slice";

export const Messages = () => {
  const dispatch = useDispatch();
  const { emails, searchText } = useSelector((store) => store.appslice);
  const [tempEmail, settempEmail] = useState(emails);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const sorting = query(
      collection(db, "emails"),
      orderBy("createdAt", "desc")
    );
    const fireStore = onSnapshot(sorting, (snapshot) => {
      const allemails = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(setemails(allemails));
      setloading(false);
    });
    return () => fireStore();
  }, [dispatch]);

  useEffect(() => {
    const filterEmail = emails?.filter((email) => {
      return (
        email?.subject?.toLowerCase().includes(searchText.toLowerCase()) ||
        email?.message?.toLowerCase().includes(searchText.toLowerCase()) ||
        email?.to?.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    settempEmail(filterEmail);
  }, [searchText, emails]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center mt-40">
          <p>
           
            <div class="flex flex-row md:gap-2 gap-1">
              <div class=" w-2 h-2  md:w-3 md:h-3 rounded-full bg-black animate-bounce [animation-delay:.5s]"></div>
              <div class=" w-2 h-2  md:w-3 md:h-3 rounded-full bg-black animate-bounce [animation-delay:.1s]"></div>
              <div class=" w-2 h-2  md:w-3 md:h-3 rounded-full bg-black animate-bounce [animation-delay:.5s]"></div>

            </div>
          </p>
        </div>
      ) : (
        <div>
          {tempEmail &&
            tempEmail.map((email) => <Message key={email.id} email={email} />)}
        </div>
      )}
    </>
  );
};
