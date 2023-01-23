import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import AIMessages from "./AIMessages";

const AiChatArea = () => {
  const [message, setMessage] = useState("");
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mes = e.target[0].value;
    setMessage("");
    await updateDoc(doc(db, "aiChats", currentUser.uid + "-ai"), {
      messages: arrayUnion({
        id: uuid(),
        message: mes,
        uid: currentUser.uid,
        createdAt: Timestamp.now(),
        photoURL: currentUser.photoURL,
        displayName: currentUser.displayName,
      }),
    });

    setTimeout(async () => {
      const response = await fetch("https://openai-y1as.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: mes }),
      });

      if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim(); // trims any trailing spaces/'\n'
        await updateDoc(doc(db, "aiChats", currentUser.uid + "-ai"), {
          messages: arrayUnion({
            id: uuid(),
            message: parsedData,
            uid: currentUser.uid + "-ai",
            createdAt: Timestamp.now(),
            displayName: "OpenAI",
          }),
        });
      } else {
        const err = await response.text();
        alert(err);
      }
    }, 4000);
  };
  return (
    <div className="w-full relative">
      <div className="h-[8vh] w-full bg-zinc-900 shadow-lg absolute opacity-95 flex text-white items-center justify-center md:justify-start p-5 font-semibold text-lg">
        OpenAI Chat
      </div>
      <div className=" h-[90vh] overflow-auto flex flex-col-reverse scrollbar-thumb-zinc-600 scrollbar-thumb-rounded-full scrollbar-thin pt-[12vh]">
        <AIMessages />
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

export default AiChatArea;
