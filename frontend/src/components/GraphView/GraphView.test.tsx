import React from "react";
import { render } from "@testing-library/react";
import "jest-canvas-mock";
import GraphView from "./GraphView";
import testData from "./testData.json";

describe("GraphView", () => {
  test("rendered with test data", async () => {
    const mock = jest.fn();

    const { container } = render(
      <GraphView graphData={testData} setKanjiInput={mock} />
    );
    expect(container).toMatchSnapshot();
  });
});
