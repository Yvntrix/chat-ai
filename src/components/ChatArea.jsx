import { CpuChipIcon } from "@heroicons/react/24/outline";
import {
  ArrowRightOnRectangleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import Messages from "./Messages";

const ChatArea = () => {
  const [message, setMessage] = useState("");
  const { currentUser, logOut } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const mes = e.target[0].value;

    setMessage("");

    await addDoc(collection(db, "messages"), {
      message: mes,
      createdAt: serverTimestamp(),
      uid: currentUser.uid,
      photoURL: currentUser.photoURL,
      displayName: currentUser.displayName,
    }).catch((err) => console.log(err));
  };
  return (
    <div className="w-full relative">
      <div className="h-[8vh] w-full bg-zinc-900 shadow-lg absolute opacity-95 flex text-white items-center justify-between md:justify-start p-5 font-semibold text-lg">
        <Link to={"/ai"} className="border-2 p-1 rounded-md hover:bg-zinc-700">
          <CpuChipIcon className="w-6" />
        </Link>
        <span>Global Chat</span>
        <button
          className="border-2 p-1 rounded-md hover:bg-zinc-700"
          onClick={() => logOut()}
          type="button"
        >
          <ArrowRightOnRectangleIcon className="w-6" />
        </button>
      </div>
      <div className="px-6 md:px-12 h-[90vh] overflow-auto flex flex-col-reverse scrollbar-thumb-zinc-600 scrollbar-thumb-rounded-full scrollbar-thin pt-[12vh]">
        <Messages />
      </div>
      <form
        className="h-[10vh] flex md:px-12 py-5 space-x-2 px-6"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="flex-1 bg-zinc-700 text-white rounded-md focus:ring-zinc-500 focus:border-zinc-500"
        />
        <button
          disabled={
            !/\S/.test(message) ? true : message.length < 2 ? true : false
          }
          type="submit"
          className="bg-zinc-700 p-2 flex justify-center items-center rounded-md enabled:hover:bg-zinc-600 disabled:text-zinc-600 text-zinc-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-5 w-5 " />
        </button>
      </form>
    </div>
  );
};

export default ChatArea;
