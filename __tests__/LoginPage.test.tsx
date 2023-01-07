import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "../pages";

describe("Login Page", () => {
  it("should render title", () => {
    render(<LoginPage />);
    expect(screen.getByText("Login To Your Account")).toBeInTheDocument();
  });
  it("should render button to login with Google", () => {
    render(<LoginPage />);
    expect(screen.getByText("Login with Google")).toBeInTheDocument();
  });

  it("should render separator before form inputs", () => {
    render(<LoginPage />);
    expect(screen.getByText("Or Login With Email")).toBeInTheDocument();
  });

  it("should render email label and input", () => {
    render(<LoginPage />);
    expect(screen.getByText("E-Mail Address:")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E-Mail Address")).toBeInTheDocument();
  });

  it("should render password label and input", () => {
    render(<LoginPage />);
    expect(screen.getByText("Password:")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });
});
