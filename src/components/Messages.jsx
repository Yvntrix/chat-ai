import {
  collection,
  getDocs,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const q = query(
    collection(db, "messages"),
    orderBy("createdAt", "asc"),
    limitToLast(50)
  );
  useEffect(() => {
    // paginate();
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

  const paginate = async () => {
    const documentSnapshots = await getDocs(q);
    documentSnapshots.forEach((doc) => {
      console.log(doc.data());
    });
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    const next = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc"),
      startAfter(lastVisible),
      limitToLast(25)
    );
    const documentSnapshots2 = await getDocs(next);
    documentSnapshots2.forEach((doc) => {
      console.log(doc.data());
    });
    //
  };

  return (
    <div>
      {messages &&
        messages.map((m, idx) => (
          <Message
            photoUrl={m.photoURL}
            createdAt={m.createdAt}
            displayName={m.displayName}
            content={m.message}
            key={idx}
            uid={m.uid}
          />
        ))}
    </div>
  );
};

export default Messages;
