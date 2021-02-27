import "@testing-library/jest-dom";

import App, { sum } from "./App";
import { render, screen } from "@testing-library/react";

import React from "react";

describe("App", () => {
  test("should render application", async () => {
    render(<App />);
    //screen.debug();

    expect(screen.queryByText(/Counter/)).toBeNull();
    expect(await screen.findByText(/Counter/)).toBeInTheDocument();
    //screen.getByRole("");

    expect(screen.queryByText("Search")).toBeNull();
  });
});

describe("sum", () => {
  test("should sum two values", () => {
    expect(sum(2, 4)).toBe(6);
  });
});
