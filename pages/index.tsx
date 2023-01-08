import { NextPage } from "next";
import { Button } from "react-daisyui";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const HomePage: NextPage = () => {
  const router = useRouter();
  const logout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <div>Welcome Back </div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default HomePage;
