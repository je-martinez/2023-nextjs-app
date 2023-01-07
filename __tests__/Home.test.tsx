import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "../pages";

describe("Login Page", () => {
  it("should render button to login with Google", () => {
    render(<LoginPage />);
    expect(screen.getByText("Login To Your Account")).toBeInTheDocument();
  });
});
