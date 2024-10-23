import { Outlet } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Componenets/Navbar";
import { Sidebar } from "./Componenets/Sidebar/Sidebar";
import { SendMailBox } from "./Componenets/Body/SendMailBox";
import Login from "./Componenets/Login";
import { useSelector } from "react-redux";

function App() {
  const {usersignin} = useSelector(store=>store.appslice);
  return (
    <div className=" h-screen w-screen overflow-y-hidden md:bg-[#f6f8fc]">
      {!usersignin ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <Sidebar />
          <div className="bg-[#ffffff] rounded-xl flex-1 h-[90vh] overflow-auto max-w-[77vw] mx-auto ml-auto md:mr-[6rem] mt-[-16rem] md:mt-[-19rem] ">
            <Outlet />
          </div>
          <div className="bg-white right-20 bottom-0 z-10 w-[30%] absolute">
            <SendMailBox />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
