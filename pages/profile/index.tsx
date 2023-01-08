import { useAppSelector } from "@/store/index";
import { NextPage } from "next";

const ProfilePage: NextPage = () => {
  const { session } = useAppSelector((state) => state.auth);
  return (
    <>
      <p>Profile Page {JSON.stringify(session?.user ?? {})}</p>
    </>
  );
};

export default ProfilePage;
