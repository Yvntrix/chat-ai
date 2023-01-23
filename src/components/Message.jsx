import { useEffect } from "react";
import { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import useCreateAvatar from "../hooks/useCreateAvatar";

const Message = (props) => {
  const { content, uid, photoUrl, displayName } = props;
  const { currentUser } = useAuth();
  const [avatar] = useCreateAvatar(displayName);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [props]);
  return (
    <>
      <div
        ref={ref}
        className={`w-full flex pb-2 items-end ${
          currentUser.uid == uid && " flex-row-reverse"
        } `}
      >
        {avatar ? (
          <div>
            <img
              className="inline-block h-8 w-8 rounded-full"
              src={photoUrl == null ? avatar : photoUrl}
              alt="Avatar"
            />
          </div>
        ) : null}
        <div
          className={`max-w-[50%] flex flex-col ${
            currentUser.uid == uid ? "items-end" : "items-start"
          }`}
        >
          <span
            className={`text-zinc-400 text-sm  ${
              currentUser.uid == uid ? "mr-2" : "ml-2"
            } `}
          >
            {displayName}
          </span>
          <p
            className={`mt-1  ${
              currentUser.uid == uid ? "own-message" : "other-message"
            } `}
          >
            {content}
          </p>
        </div>
      </div>
    </>
  );
};

export default Message;
