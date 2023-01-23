import { useLocation, useParams } from "react-router-dom";
import AiChatArea from "../components/AiChatArea";
import ChatArea from "../components/ChatArea";
import SideBar from "../components/SideBar";

const Home = () => {
  const current = useLocation();
  return (
    <div className="w-screen h-screen bg-zinc-900 flex">
      <SideBar />
      {current.pathname === "/ai" ? <AiChatArea /> : <ChatArea />}
    </div>
  );
};

export default Home;
