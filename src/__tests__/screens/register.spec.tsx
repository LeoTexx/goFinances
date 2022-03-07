import React from "react";

import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import { Register } from "../../screens/Register";
import { light } from "../../global/styles/theme";

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={light}>{children}</ThemeProvider>
);

jest.mock("@react-navigation/core", () => ({ useNavigation: () => jest.fn() }));
jest.mock("../../hooks/auth", () => ({
  useAuth: () => ({ user: { id: "any-id" } }),
}));

describe("Register Screen", () => {
  it("should open category modal when user click on button", async () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });

    const categoryModal = getByTestId("category-modal");
    const categorySelectButton = getByTestId("category-select-button");

    await fireEvent.press(categorySelectButton);

    expect(categoryModal.props.visible).toBeTruthy();
  });
});
