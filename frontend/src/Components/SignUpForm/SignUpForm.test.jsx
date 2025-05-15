import { render, screen } from "@testing-library/react";
import SignUpForm from "./SignUpForm";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

describe("SignUpForm", () => {
  it("affiche le bouton 'Créer un compte' (ou selon la traduction)", () => {
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <SignUpForm />
        </I18nextProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/créer un compte/i)).toBeInTheDocument();
  });
});