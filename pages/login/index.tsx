import LoginForm from "@/components/login/login-form";
import { useAppSelector } from "@/store/index";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetStaticProps, NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "react-daisyui";
import logo from "../../public/logo.png";
import { selectAuthState, setProviders } from "../../store/slices/auth.slice";
import { wrapper } from "../../store/index";

// export const getStaticProps: GetStaticProps = async (context) => {
//   const providers = await getProviders();
//   console.log(context);

//   return { props: {} };
// };

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ preview }) => {
      const providers = await getProviders();
      if (providers) {
        store.dispatch(setProviders(providers));
      }
      return { props: {} };
    }
);

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { providers } = useAppSelector(selectAuthState);
  const login = async (providerId: string) => {
    await signIn(providers?.google?.id);
  };

  console.log("providers", providers);

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
