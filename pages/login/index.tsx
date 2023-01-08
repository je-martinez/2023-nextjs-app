import LoginForm from "@/components/login/login-form";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Image from "next/image";
import SignInButtons from "../../components/login/sign-in-buttons";
import logo from "../../public/logo.png";
import { wrapper } from "../../store/index";
import { getProvidersThunk } from "../../store/thunks/auth.thunk";

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(getProvidersThunk());
  return { props: {} };
});

const LoginPage: NextPage = () => {
  const login = async (providerId: string) => {
    await signIn(providerId);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <div className="card w-96 shadow-xl accent bg-white  p-4">
        <div className="card-body">
          <Image src={logo} alt="Logo" />
          <i className="fa-brands fa-google"></i>
          <SignInButtons login={login} />
          <div className="divider">OR</div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
