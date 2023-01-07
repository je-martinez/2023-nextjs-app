import { render, screen } from "@testing-library/react";
import Home from "../pages";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);
    expect(screen.getByText("Get started by editing")).toBeInTheDocument();
  });
});
