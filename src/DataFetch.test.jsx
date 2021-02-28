import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import DataFetch from "./DataFetch";
import React from "react";
import { act } from "react-dom/test-utils";
import axios from "axios";
import userEvent from "@testing-library/user-event";

jest.mock("axios");

describe("DataFetch", () => {
  it("should fetch stories from API and display them", async () => {
    const stories = [
      { objectID: "1", title: "Hello" },
      { objectID: "2", title: "React" },
    ];

    const promise = Promise.resolve({ data: { hits: stories } });
    axios.get.mockImplementationOnce(() => promise);

    render(<DataFetch />);

    userEvent.click(screen.getByText("Fetch Stories"));
    await act(() => promise);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("fetches stories from an API and fails", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

    render(<DataFetch />);

    userEvent.click(screen.getByText("Fetch Stories"));
    const message = await screen.findByText(/Something went wrong/);
    expect(message).toBeInTheDocument();
  });
});
