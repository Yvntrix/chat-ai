import {
  collection,
  doc,
  getDoc,
  limitToLast,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import AiMessage from "./AiMessage";
("firebase/firestore");

const AIMessages = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const q = query(
    collection(db, "aiChats", currentUser.uid + "-ai", "messages"),
    orderBy("createdAt", "asc"),
    limitToLast(50)
  );

  useEffect(() => {
    setAiMessage();
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setMessages((messages) => [...messages, change.doc.data()]);
        }
      });
    });

    return () => {
      unsubscribe();
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
