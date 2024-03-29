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
        await updateDoc(docRef, {
          message: data.bot,
        }).then(() => {
          setAiFetching(false);
        });
      } else {
        const err = await response.text();
        await updateDoc(docRef, {
          message: "Something went wrong, Please try again.",
        }).then(() => {
          setAiFetching(false);
        });
        alert(err);
      }
    });
  };
  return (
    <div className="w-full relative">
      <div className="h-[8dvh] w-full bg-zinc-900 shadow-lg absolute opacity-95 flex text-white items-center justify-between md:justify-start p-5 font-semibold text-lg">
        <Link
          to={"/"}
          className="border-2 p-1 rounded-md hover:bg-zinc-700  block md:hidden"
        >
          <GlobeAltIcon className="w-6" />
        </Link>
        OpenAI Chat
        <div></div>
      </div>
      <div className=" h-[90dvh] overflow-auto overflow-x-hidden flex flex-col scrollbar-thumb-zinc-600 scrollbar-thumb-rounded-full scrollbar-thin pt-[8vh]">
        <div className="rounded-md bg-yellow-50 p-4 m-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span
                className="h-5 w-5 text-yellow-400 font-bold text-3xl"
                aria-hidden="true"
              >
                !
              </span>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-yellow-800">
                Attention needed
              </h3>
              <div className="mt-2  text-yellow-700">
                <p>
                  Unfortunately OpenAi Free token has expired, so you can't
                  use ai chat for now. We are working on a solution. Sorry
                  for the inconvenience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form
        className="h-[10dvh] flex md:px-12 py-5 space-x-2 px-6"
        onSubmit={handleSubmit}
      >
        <input
          disabled
          placeholder="OPEN AI IS CURRENTLY UNAVAILABLE"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="flex-1 bg-zinc-700  rounded-md enabled:focus:ring-zinc-500 enabled:focus:border-zinc-500  disabled:text-zinc-600 text-zinc-300 disabled:cursor-not-allowed"
        />
        <button
          disabled={
            !/\S/.test(message) ? true : message.length < 2 ? true : aiFetching
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
