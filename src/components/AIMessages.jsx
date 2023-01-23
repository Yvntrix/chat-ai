import {
  collection,
  doc,
  getDoc,
  getDocs,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAfter,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

const AIMessages = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const q = query(
    collection(db, "aiChats"),
    orderBy("createdAt", "asc"),
    limitToLast(50)
  );
  useEffect(() => {
    setAiMessage();
    const unSub = onSnapshot(
      doc(db, "aiChats", currentUser.uid + "-ai"),
      (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      }
    );
  }, []);

  const setAiMessage = async () => {
    const res = await getDoc(doc(db, "aiChats", currentUser.uid + "-ai"));

    if (!res.exists()) {
      await setDoc(doc(db, "aiChats", currentUser.uid + "-ai"), {
        messages: [],
      });
    } else {
      // console.log(res.data());
    }
  };
  return (
    <div>
      {messages &&
        messages.map((m, idx) => (
          <div className="text-white py-2 border mb-2" key={idx}>
            {m.message}
          </div>
        ))}
    </div>
  );
};

export default AIMessages;
