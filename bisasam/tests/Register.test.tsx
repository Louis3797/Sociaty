import { render, screen } from "@testing-library/react";
import React from "react";
import Register from "../src/pages/register";

describe("Register Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("renders Register without crashing", () => {
    const { container } = render(<Register />);
    expect(container).toBeTruthy();
  });
});
