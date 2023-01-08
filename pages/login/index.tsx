import LoginForm from "@/components/login/login-form";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetStaticProps, NextPage } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
  useSession,
} from "next-auth/react";
import Image from "next/image";
import { Button } from "react-daisyui";
import logo from "../../public/logo.png";

type LoginPageProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

export const getStaticProps: GetStaticProps<LoginPageProps> = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

const LoginPage: NextPage<LoginPageProps> = ({ providers }: LoginPageProps) => {
  const { data: session, status } = useSession();

  console.log({ session });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <div className="card w-96 shadow-xl accent bg-white  p-4">
        <div className="card-body">
          <Image src={logo} alt="Logo" />
          <i className="fa-brands fa-google"></i>
          <Button
            className="btn btn-primary"
            onClick={() => {
              signIn(providers?.google?.id);
            }}
          >
            <FontAwesomeIcon className="mr-4" icon={faGoogle} />
            Login with Google
          </Button>
          <Button
            className="btn btn-primary"
            onClick={() => {
              signIn(providers?.github?.id);
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
