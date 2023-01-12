import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-screen h-screen flex items-center md:justify-evenly flex-col justify-around">
      <h1 className="text-xl font-bold">404 - Page Not Found</h1>
      <img className="max-h-[40%]" src="/404.svg" />
      <Link to={"/"}>
        <div className="primary-btn">
          Go Home
        </div>
      </Link>
    </div>
  );
};

export default PageNotFound;
