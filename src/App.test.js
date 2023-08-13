import { render, screen } from "@testing-library/react";
import { App } from "./App";
import Layout from "./components/Layout";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

test("should render layout with Layout component and one Paragraph component", async () => {
  render(<App />);

  expect(screen.getByTestId("layout")).toBeInTheDocument();
  expect(screen.getByTestId("results")).toBeInTheDocument();
});

test("should return right result for addition", function () {
  render(<App />);

  const input = screen.getByRole("textbox");
  userEvent.type(input, "1.28 + 2.89");
  userEvent.click(screen.getByText("Submit"));

  const paragraph = screen.getByTestId("results");
  expect(paragraph).toHaveTextContent("1.28 + 2.89 = 4.17");
});

test('should render "Wrong input!" in paragraph when wrong input given', function () {
  render(<App />);

  const input = screen.getByRole("textbox");
  userEvent.type(input, "string");
  userEvent.click(screen.getByText("Submit"));

  const paragraph = screen.getByTestId("results");
  expect(paragraph).toHaveTextContent("Wrong input!");
});
