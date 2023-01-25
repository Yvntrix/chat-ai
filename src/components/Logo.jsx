import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <ChatBubbleBottomCenterTextIcon className="w-7 h-7 text-white" />
      <span className="text-white ml-2 text-md font-bold  whitespace-nowrap">
        ChatAi
      </span>
    </div>
  );
};

export default Logo;
