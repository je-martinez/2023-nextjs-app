import LoginForm from "@/components/login/login-form";
import { useAppSelector } from "@/store/index";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "react-daisyui";
import logo from "../../public/logo.png";
import { wrapper } from "../../store/index";
import { selectAuthState } from "../../store/slices/auth.slice";
import { getProvidersThunk } from "../../store/thunks/auth.thunk";

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ preview }) => {
      await store.dispatch(getProvidersThunk());
      return { props: {} };
    }
);

const LoginPage: NextPage = () => {
  const { providers } = useAppSelector(selectAuthState);
  const login = async (providerId: string) => {
    await signIn(providerId);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <div className="card w-96 shadow-xl accent bg-white  p-4">
        <div className="card-body">
          <Image src={logo} alt="Logo" />
          <i className="fa-brands fa-google"></i>
          <Button
            className="btn bg-blue-500 hover:bg-blue-700"
            onClick={() => {
              login(providers?.google?.id!);
            }}
          >
            <FontAwesomeIcon className="mr-4" icon={faGoogle} />
            Login with Google
          </Button>
          <Button
            className="btn bg-gray-700"
            onClick={() => {
              login(providers?.github?.id!);
            }}
          >
            <FontAwesomeIcon className="mr-4" icon={faGithub} />
            Login with Github
          </Button>
          <div className="divider">OR</div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
