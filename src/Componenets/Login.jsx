import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import GoogleButton from "react-google-button";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setusersignin } from "../redux/slice";

const useAuthListener = (setCheckingAuthStatus) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setCheckingAuthStatus(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setusersignin({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(setusersignin(null));
      }
      setCheckingAuthStatus(false);
    });

    return () => unsubscribe();
  }, [dispatch, setCheckingAuthStatus]);
};

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkingAuthStatus, setCheckingAuthStatus] = useState(true);
  const user = useSelector((state) => state.appslice.usersignin);

  useAuthListener(setCheckingAuthStatus);

  const signInWithGoogle = async () => {
    if (loading) return;

    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(
        setusersignin({
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        })
      );
    } catch (error) {
      console.log("Error during sign-in: ", error);
      if (error.code === "auth/cancelled-popup-request") {
        setError("Sign-in process was cancelled. Please try again.");
      } else if (error.code === "auth/popup-closed-by-user") {
        setError("The popup was closed before completing the sign-in. Please try again.");
      } else {
        setError("An error occurred during sign-in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuthStatus) {
    return <h1 className="w-screen h-screen flex justify-center items-center bg-white font-bold md:text-3xl">Checking authentication status...</h1>;
  }

  if (user) {
    return <div className="w-screen h-screen flex justify-center items-center bg-slate-300">Welcome, {user.displayName}!</div>;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-300">
      <div className="p-8 bg-white shadow-md flex flex-col gap-3 rounded-md">
        <h1 className="text-xl text-black text-center font-semibold">Log In</h1>
        <GoogleButton onClick={signInWithGoogle} disabled={loading} />
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;


