import Image from "next/image";
import logo from "../public/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { LoginInfo } from "@/models/index";
import { useCallback } from "react";
import { Button } from "react-daisyui";
import LoginForm from "@/components/login/login-form";

function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <div className="card w-96 shadow-xl accent bg-white  p-4">
        <div className="card-body">
          <Image src={logo} alt="Logo" />
          <i className="fa-brands fa-google"></i>
          <Button className="btn btn-primary">
            <FontAwesomeIcon className="mr-4" icon={faGoogle} />
            Login with Google
          </Button>
          <div className="divider">OR</div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
