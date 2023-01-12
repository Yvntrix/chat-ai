import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logInPopUp() {
    return signInWithPopup(auth, provider).then(async (res) => {
      const docSnap = await getDoc(doc(db, "users", res.user.uid));
      if (docSnap.exists()) return docSnap();
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: res.user.displayName,
        email: res.user.email,
      });
    });
  }
  function signUp(email, password, displayName) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (res) => {
        await updateProfile(res.user, {
          displayName: displayName,
        });

        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
        });
      }
    );
  }
  function logOut() {
    return signOut(auth);
  }

  function resetPassword(email){
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, logIn, logInPopUp, signUp, logOut ,resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
