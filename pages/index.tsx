import Image from "next/image";
import logo from "../public/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <div className="card w-96 shadow-xl accent bg-white  p-4">
        <div className="card-body">
          <Image src={logo} alt="Picture of the author" />

          <i className="fa-brands fa-google"></i>
          <button className="btn btn-primary">
            <FontAwesomeIcon className="mr-4" icon={faGoogle} />
            Login with Google
          </button>
          <div className="divider">OR</div>
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered input-accent w-full max-w-xs"
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered input-accent w-full max-w-xs"
          />
          <div className="pt-4 card-actions justify-center">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
