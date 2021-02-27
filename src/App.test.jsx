import "@testing-library/jest-dom";

import App, { sum } from "./App";
import { fireEvent, render, screen } from "@testing-library/react";

import React from "react";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  test("should render application", async () => {
    render(<App />);
    //screen.debug();

    expect(screen.queryByText(/Counter/)).toBeNull();
    expect(await screen.findByText(/Counter/)).toBeInTheDocument();
    //screen.getByRole("");

    // fire change on input text and check element
    expect(screen.queryByText(/JavaScript/)).toBeNull();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });
    expect(screen.getByDisplayValue(/JavaScript/)).toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "" } });

    // user change event on input text and check element
    expect(screen.queryByText(/JavaScript/)).toBeNull();
    userEvent.type(screen.getByRole("textbox"), "JavaScript");
    expect(screen.getByDisplayValue(/JavaScript/)).toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "" } });

    expect(screen.queryByText("Search")).toBeNull();
  });
});

describe("sum", () => {
  test("should sum two values", () => {
    expect(sum(2, 4)).toBe(6);
  });
});
