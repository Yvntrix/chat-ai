import { CpuChipIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useCreateAvatar from "../hooks/useCreateAvatar";
import Logo from "./Logo";

const SideBar = () => {
  const { logOut, currentUser } = useAuth();
  const [avatar] = useCreateAvatar(currentUser.displayName);
  const navigate = useNavigate();

  return (
    <div className="w-[20vw] h-screen hidden md:flex md:flex-col bg-zinc-800">
      <div className="w-full h-[8vh] flex items-center  justify-center shadow-lg">
        <Logo />
      </div>
      <div className="w-full h-[80vh] overflow-auto">
        <div
          className=" flex justify-center text-white h-[8vh] items-center hover:bg-zinc-700 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <GlobeAltIcon className="w-6" />
          <span className="ml-1 whitespace-nowrap">Global Chat</span>
        </div>
        <div
          className=" flex justify-center text-white h-[8vh] items-center hover:bg-zinc-700 cursor-pointer"
          onClick={() => {
            navigate("/ai");
          }}
        >
          <CpuChipIcon className="w-6" />
          <span className="ml-1 whitespace-nowrap">OpenAI Chat</span>
        </div>
        {/* <Messages name={currentUser.displayName} /> */}
      </div>
      <div className="w-full h-[12vh] flex items-center justify-around shadow-lg">
        <button
          onClick={() => logOut()}
          className="bg-zinc-700 text-white p-2 rounded-md hover:bg-zinc-600"
        >
          Log out
        </button>
        {avatar ? (
          <div>
            <img
              className="inline-block h-10 w-10 rounded-full"
              src={currentUser.photoURL == null ? avatar : currentUser.photoURL}
              alt="Avatar"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SideBar;
