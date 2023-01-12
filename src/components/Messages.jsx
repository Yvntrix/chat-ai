import useCreateAvatar from "../hooks/useCreateAvatar";

const Messages = (props) => {
  const { name } = props;
  const [avatar] = useCreateAvatar(name);
  return (
    <div className=" flex justify-start pl-5 text-white h-[8vh] items-center hover:bg-zinc-700 cursor-pointer hover:shadow-lg">
      <img
        className="inline-block h-8 w-8 rounded-full"
        src={avatar}
        alt="Avatar"
      />
      <span className="ml-1 whitespace-nowrap">{name}</span>
    </div>
  );
};

export default Messages;
