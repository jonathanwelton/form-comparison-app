import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import ReactHookFormExample from "../../pages/react-hook-form-example";

describe("ReactHookFormExample", () => {
  it("should render the basic fields", () => {
    const mockSave = jest.fn();
    render(<ReactHookFormExample saveData={mockSave} />);
    expect(screen.getByTestId("firstName")).toBeInTheDocument();
    expect(screen.getByTestId("lastName")).toBeInTheDocument();
    expect(screen.getByTestId("company")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("date")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
  });

  it("should validate form fields", async () => {
    const mockSave = jest.fn();
    render(<ReactHookFormExample saveData={mockSave} />);

    const saveButton = screen.getByTestId("save");
    fireEvent.click(saveButton);

    expect(await screen.findAllByRole("alert")).toHaveLength(6);
    expect(mockSave).not.toBeCalled();
  });
});