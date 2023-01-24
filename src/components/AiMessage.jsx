import { CpuChipIcon } from "@heroicons/react/24/outline";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AiMessage = (props) => {
  const { createdAt, displayName, message, photoURL, uid, id } = props;
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState(message);
  const ref = useRef();
  const q = query(
    collection(db, "aiChats", currentUser.uid + "-ai", "messages"),
    where("id", "==", id)
  );
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [props]);

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "modified") {
          setMessages(change.doc.data().message);
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <div
        ref={ref}
        className={`flex px-6 md:px-12 py-3 items-start ${
          currentUser.uid == uid ? "bg-zinc-800" : "bg-zinc-700"
        }`}
      >
        <div className="pr-2">
          {photoURL != null ? (
            <img
              className="inline-block h-8 w-8 rounded-full"
              src={photoURL}
              alt="Avatar"
            />
          ) : (
            <CpuChipIcon className="inline-block h-8 w-8 p-0.5 rounded-full text-zinc-300 bg-green-600" />
          )}
        </div>
        <article className="prose prose-invert">
          {messages == "..." ? (
            <img src="/three-dots.svg" className="h-8 w-8" />
          ) : (
            <ReactMarkdown children={messages} remarkPlugins={[remarkGfm]} />
          )}
        </article>
      </div>
    </>
  );
};

export default AiMessage;
