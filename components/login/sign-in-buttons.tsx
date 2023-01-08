import React, { FC } from "react";
import { Button } from "react-daisyui";
import { useAppSelector } from "@/store/index";
import { selectAuthState } from "../../store/slices/auth.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

interface SignInButtonsProps {
  login: (id: string) => void;
}

const SignInButtons: FC<SignInButtonsProps> = ({
  login,
}: SignInButtonsProps) => {
  const { providers, loadingGetProviders } = useAppSelector(selectAuthState);

  return (
    <>
      <Button
        className="btn bg-blue-500 hover:bg-blue-700"
        onClick={() => {
          login(providers?.google?.id!);
        }}
        disabled={loadingGetProviders}
      >
        <FontAwesomeIcon className="mr-4" icon={faGoogle} />
        Login with Google
      </Button>
      <Button
        className="btn bg-gray-700"
        onClick={() => {
          login(providers?.github?.id!);
        }}
        disabled={loadingGetProviders}
      >
        <FontAwesomeIcon className="mr-4" icon={faGithub} />
        Login with Github
      </Button>
    </>
  );
};

export default SignInButtons;
