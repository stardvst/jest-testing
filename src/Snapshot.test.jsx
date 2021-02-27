import App, { Counter, dataReducer, sum } from "./App";

import React from "react";
import renderer from "react-test-renderer";

const list = ["a", "b", "c"];

describe("App", () => {
  describe("Reducer", () => {
    it("should set a list", () => {
      const state = { list: [], error: null };
      const newState = dataReducer(state, {
        type: "SET_LIST",
        list,
      });

      expect(newState).toEqual({ list, error: null });
    });

    it("should reset the error if list is set", () => {
      const state = { list: [], error: true };
      const newState = dataReducer(state, {
        type: "SET_LIST",
        list,
      });

      expect(newState).toEqual({ list, error: null });
    });

    it("should set the error", () => {
      const state = { list: [], error: null };
      const newState = dataReducer(state, {
        type: "SET_ERROR",
      });

      expect(newState.error).toBeTruthy();
    });
  });

  test("snapshot renders", () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Counter", () => {
  test("snapshot renders", () => {
    const component = renderer.create(<Counter counter={1} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("sum", () => {
  test("should sum two values", () => {
    expect(sum(2, 4)).toBe(6);
  });
});
