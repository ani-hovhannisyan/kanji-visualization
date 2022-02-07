import React from "react";
import { render } from "@testing-library/react";
import "jest-canvas-mock";
import GraphView from "./GraphView";
import testData from "./testData.json";

describe("GraphView", () => {
  test("rendered with test data", async () => {
    const { container } = render(<GraphView graphData={testData} />);
    expect(container).toMatchSnapshot();
  });
});
