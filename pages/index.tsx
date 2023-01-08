import { NextPage } from "next";
import { Button } from "react-daisyui";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useAppDispatch } from "../store/store";
import { clearSession } from "@/store/slices/auth.slice";

const HomePage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const logout = async () => {
    await signOut();
    dispatch(clearSession());
  };
  const goToProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <div>Welcome Back </div>
      <Button onClick={logout}>Logout</Button>
      <Button onClick={goToProfile}>Profile</Button>
    </div>
  );
};

export default HomePage;
