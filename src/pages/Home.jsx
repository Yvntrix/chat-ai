import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen bg-gray-800">
      <button
        onClick={() => {
          auth.signOut();
          navigate("/login");
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default Home;
