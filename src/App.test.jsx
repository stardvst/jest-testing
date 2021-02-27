import App, { sum } from "./App";
import { render, screen } from "@testing-library/react";

import React from "react";

describe("App", () => {
  test("should render application", () => {
    render(<App />);
    screen.debug();
  });
});

describe("sum", () => {
  test("should sum two values", () => {
    expect(sum(2, 4)).toBe(6);
  });
});
