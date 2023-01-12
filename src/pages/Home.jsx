import ChatArea from "../components/ChatArea";
import SideBar from "../components/SideBar";

const Home = () => {
  return (
    <div className="w-screen h-screen bg-zinc-900 flex">
      <SideBar />
      <ChatArea />
    </div>
  );
};

export default Home;
