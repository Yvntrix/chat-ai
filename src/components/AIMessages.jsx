import {
  doc,
  getDoc, onSnapshot, setDoc
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import AiMessage from "./AiMessage";

const AIMessages = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setAiMessage();
    const unSub = onSnapshot(
      doc(db, "aiChats", currentUser.uid + "-ai"),
      (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      }
    );

    return () => {
      unSub();
    };
  }, []);

  const setAiMessage = async () => {
    const res = await getDoc(doc(db, "aiChats", currentUser.uid + "-ai"));

    if (!res.exists()) {
      await setDoc(doc(db, "aiChats", currentUser.uid + "-ai"), {
        messages: [],
      });
    }
  };
  return (
    <div>
      {messages && messages.map((m, idx) => <AiMessage key={idx} {...m} />)}
    </div>
  );
};

export default AIMessages;
