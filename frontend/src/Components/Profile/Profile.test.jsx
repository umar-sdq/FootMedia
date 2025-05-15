import { render, screen } from "@testing-library/react";
import Profile from "./Profile";
import { AuthContext } from "../AuthContext/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

const mockAuth = {
  token: "fake-token",
  userData: {
    userId: "123",
    username: "testuser",
    biographie: "Ceci est une bio",
    favoriteTeam: "https://logo.png",
    followers: [],
    following: [],
  },
  isLoggedIn: true,
  login: jest.fn(),
};

describe("Profile", () => {
  it("affiche le nom d'utilisateur", () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <AuthContext.Provider value={mockAuth}>
            <Profile />
          </AuthContext.Provider>
        </I18nextProvider>
      </BrowserRouter>
    );

    expect(screen.getByText("testuser")).toBeInTheDocument();
  });
});