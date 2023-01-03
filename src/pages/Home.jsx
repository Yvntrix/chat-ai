import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";

const Home = () => {
  const navigate = useNavigate();
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
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
