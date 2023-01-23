import { CpuChipIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

const AiMessage = (props) => {
  const { createdAt, displayName, message, photoURL, uid } = props;
  const { currentUser } = useAuth();
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [props]);
  return (
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
      <div className=" text-zinc-300">{message}</div>
    </div>
  );
};

export default AiMessage;
