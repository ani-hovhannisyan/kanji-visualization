import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

process.env.REACT_APP_API_URL = "http://localhost";
process.env.REACT_APP_API_PORT = "8000";

test("renders learn react link", () => {
  render(<App />);
});
