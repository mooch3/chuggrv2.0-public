import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "./AuthForm";

describe("Authentication form and login", () => {
  it("renders a heading that says LOGIN", () => {
    render(<AuthForm />);
    const heading = screen.getByRole("heading", { name: "LOGIN" });
    expect(heading).toBeInTheDocument();
  });

  it('renders an authentication form', () => {
      render(<AuthForm />);
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
  })

  it("renders an email input label", () => {
    render(<AuthForm />);
    const emailLabel = screen.getByText("Email");

    expect(emailLabel).toBeInTheDocument();
  });

  it("renders a password input label", () => {
    render(<AuthForm />);
    const passwordLabel = screen.getByText("Password");

    expect(passwordLabel).toBeInTheDocument();
  });

  it("renders a pretty button that has text login", () => {
    render(<AuthForm />);
    const prettyBtn = screen.getByRole("button", { name: "Login" });
    expect(prettyBtn).toBeInTheDocument();
  });

  it("renders a new form with 6 inputs when the create account button is clicked", () => {
    render(<AuthForm />);
    const crtAcctBtn = screen.getByRole('button', { name: 'Create new account'});
    userEvent.click(crtAcctBtn);
    const inputEls = screen.getAllByRole('textbox');
    expect(inputEls).toHaveLength(5);
  });

  it("renders a new header when the create account button is clicked", () => {
      render(<AuthForm />);
      const crtAcctBtn = screen.getByRole('button', { name: 'Create new account'});
      userEvent.click(crtAcctBtn);
      const newHeader = screen.getByRole('heading', { name: 'CREATE ACCOUNT' });
      expect(newHeader).toBeInTheDocument();
  });

  it("renders a new button text when the create account button is clicked", () => {
      render(<AuthForm />);
      const crtAcctBtn = screen.getByRole('button', { name: 'Create new account'});
      userEvent.click(crtAcctBtn);
      const newButtonText = screen.getByRole('button', { name: 'Create Account' });
      expect(newButtonText).toBeInTheDocument();
  });

});
