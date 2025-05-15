import { render, screen } from "@testing-library/react";
import PostForm from "../PostForm/PostForm";
import { AuthContext } from "../../AuthContext/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

const mockAuth = {
  token: "fake-token",
  userData: {
    userId: "123",
    username: "umarr.s",
    favoriteTeam: "https://logo.png",
  },
  isLoggedIn: true,
};

describe("PostForm", () => {
  it("affiche le bouton upload", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={mockAuth}>
          <PostForm />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/upload/i)).toBeInTheDocument();
  });
});
