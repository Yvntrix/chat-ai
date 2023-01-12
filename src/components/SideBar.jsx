import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
import useCreateAvatar from "../hooks/useCreateAvatar";
import Logo from "./Logo";

const SideBar = () => {
  const { logOut, currentUser } = useAuth();
  const [avatar] = useCreateAvatar(currentUser.displayName);

  return (
    <div className="w-[20vw] h-screen hidden md:flex md:flex-col bg-zinc-800">
      <div className="w-full h-[10vh] flex items-center  justify-center shadow-lg">
        <Logo />
      </div>
      <div className="w-full h-[80vh] overflow-auto">
        <div className=" flex justify-center text-white h-[8vh] items-center hover:bg-zinc-700 cursor-pointer">
          <GlobeAltIcon className="w-6" />
          <span className="ml-1 whitespace-nowrap">Global Chat</span>
        </div>
        {/* <Messages name={currentUser.displayName} /> */}
      </div>
      <div className="w-full h-[10vh] flex items-center justify-around shadow-lg">
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
