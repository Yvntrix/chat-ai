import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Home = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        auth.signOut();
        navigate("/login");
      }}
    >
      Sign out
    </button>
  );
};

export default Home;
