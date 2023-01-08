import { selectAuthState } from "@/store/slices/auth.slice";
import { NextPage } from "next";
import { useSelector } from "react-redux";

const Home: NextPage = () => {
  const { authState } = useSelector(selectAuthState);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <div>Welcome Back {authState}</div>
    </div>
  );
};

export default Home;
