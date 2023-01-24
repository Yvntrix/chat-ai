import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import AIMessages from "./AIMessages";

const AiChatArea = () => {
  const [message, setMessage] = useState("");
  const { currentUser } = useAuth();
  const [aiFetching, setAiFetching] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const mes = e.target[0].value;
    setMessage("");
    setAiFetching(true);
    await addDoc(
      collection(db, "aiChats", currentUser.uid + "-ai", "messages"),
      {
        id: uuid(),
        message: mes,
        createdAt: serverTimestamp(),
        uid: currentUser.uid,
        photoURL: currentUser.photoURL,
        displayName: currentUser.displayName,
      }
    );

    await addDoc(
      collection(db, "aiChats", currentUser.uid + "-ai", "messages"),
      {
        id: uuid(),
        message: "...",
        createdAt: serverTimestamp(),
        uid: currentUser.uid + "-ai",
        displayName: "OpenAI",
      }
    ).then(async (docRef) => {
      const response = await fetch("https://openai-y1as.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: mes }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.bot);
        await updateDoc(docRef, {
          message: data.bot,
        }).then(() => {
          setAiFetching(false);
        });
      } else {
        const err = await response.text();
        setAiFetching(false);
        alert(err);
      }
    });
  };
  return (
    <div className="w-full relative">
      <div className="h-[8vh] w-full bg-zinc-900 shadow-lg absolute opacity-95 flex text-white items-center justify-between md:justify-start p-5 font-semibold text-lg">
        <Link to={"/"} className="border-2 p-1 rounded-md hover:bg-zinc-700">
          <GlobeAltIcon className="w-6" />
        </Link>
        OpenAI Chat
        <div></div>
      </div>
      <div className=" h-[90vh] overflow-auto flex flex-col-reverse scrollbar-thumb-zinc-600 scrollbar-thumb-rounded-full scrollbar-thin pt-[12vh]">
        <AIMessages />
      </div>
      <form
        className="h-[10vh] flex md:px-12 py-5 space-x-2 px-6"
        onSubmit={handleSubmit}
      >
        <input
          disabled={aiFetching}
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="flex-1 bg-zinc-700  rounded-md enabled:focus:ring-zinc-500 enabled:focus:border-zinc-500  disabled:text-zinc-600 text-zinc-300 disabled:cursor-not-allowed"
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

export default AiChatArea;
