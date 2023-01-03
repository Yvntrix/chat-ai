import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-screen h-screen flex items-center md:justify-evenly flex-col justify-around">
      <h1 className="text-xl font-bold">404 - Page Not Found</h1>
      <img className="max-h-[40%]" src="../../public/404.svg" />
      <Link to={'/'}><div className="bg-blue-400 p-1.5 rounded font-semibold hover:bg-blue-500 text-white">Go Home</div></Link>
    </div>
  );
};

export default PageNotFound;
