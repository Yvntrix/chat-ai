import { useEffect, useState } from "react";
import { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import useCreateAvatar from "../hooks/useCreateAvatar";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";

const Message = (props) => {
  const { content, uid, photoUrl, displayName, createdAt } = props;
  const { currentUser } = useAuth();
  const [avatar] = useCreateAvatar(displayName);
  const ref = useRef();
  const [msgDate, setMsgDate] = useState("");
  dayjs.extend(calendar);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    if (createdAt != null) {
      if (dayjs().diff(dayjs.unix(createdAt.seconds), "h") > 48) {
        setMsgDate(dayjs.unix(createdAt.seconds).format("MMMM D, YYYY h:mm A"));
      } else {
        setMsgDate(dayjs.unix(createdAt.seconds).calendar());
      }
    } else {
      setMsgDate("Just now");
    }
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
            className={`text-zinc-400 text-xs  ${
              currentUser.uid == uid ? "mr-2" : "ml-2"
            } `}
          >
            {displayName}
          </span>
          <Tippy
            content={<span className="text-sm">{msgDate}</span>}
            placement="left"
            arrow={false}
          >
            <p
              className={`mt-1  ${
                currentUser.uid == uid ? "own-message" : "other-message"
              } `}
            >
              {content}
            </p>
          </Tippy>
        </div>
      </div>
    </>
  );
};

export default Message;
