import { render } from "@testing-library/react";
import React from "react";
import NotFoundItem from "../NotFoundItem";

describe("NotFoundItem", () => {
  it("renders without error"),
    () => {
      const { container } = render(<NotFoundItem />);

      expect(container).toBeDefined();
    };
});
