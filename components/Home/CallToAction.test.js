import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import CallToAction from "./CallToAction";
import mockRouter from "next-router-mock";
import { useRouter } from "next/router";

jest.mock("next/router", () => require("next-router-mock"));

describe("Home", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });

  it("renders 2 headers that say CHUGGR", () => {
    render(<CallToAction />);

    const heading = screen.getAllByText("CHUGGR");

    expect(heading).toHaveLength(2);
  });

  it("renders a Call to Action that says a description of the app", () => {
    render(<CallToAction />);

    const ctaDescription = screen.getByText(
      `CHUGGR is a social media and beer betting app that lets your connect with people, keep track of bets, and make your friends drink their words. With three available bet types, you can bet a beer on almost anything you can think of. Keep track of your wins, losses, drinks given, drinks received, and friends!`
    );
    expect(ctaDescription).toBeInTheDocument();
  });

  it("renders 2 pretty buttons that say Create Account", () => {
    render(<CallToAction />);

    const prettyBtn = screen.getAllByRole("button", {
      name: /Create Account/i,
    });
    expect(prettyBtn).toHaveLength(2);
  });

  it("renders a FontAwesome beer icon", () => {
    render(<CallToAction />);

    const beer = screen.getByTitle("beer");
    expect(beer).toBeInTheDocument();
  });

  it("renders a FontAwesome userFriends icon", () => {
    render(<CallToAction />);
    const userFriends = screen.getByTitle("userFriends");
    expect(userFriends).toBeInTheDocument();
  });

  it("renders a FontAwesome dice icon", () => {
    render(<CallToAction />);
    const dice = screen.getByTitle("dice");
    expect(dice).toBeInTheDocument();
  });

  it("renders 5 elements with img role", () => {
    render(<CallToAction />);
    const ctaImgs = screen.getAllByRole("img");
    expect(ctaImgs).toHaveLength(5);
  });

  it("renders text that explains whu CHUGGR was created", () => {
    render(<CallToAction />);
    const secondaryDescription = screen.getByText(
      `Chuggr was born in the COVID pandemic as a way to connect our friends and family through hilarious bets, beers, and friendship. We created this application as a joke, but it became an interesting way to improve our fantasy sports leagues, stay in touch, and make memories. We hope you enjoy the application, and remember:`
    );
    expect(secondaryDescription).toBeInTheDocument();
  });

  it("renders the create account page when pretty button is clicked", () => {
    render(<CallToAction />);
    const { result } = renderHook(() => useRouter());
    act(() => {
      const btn = screen.getAllByRole("button");
      userEvent.click(btn[0]);
    });

    expect(result.current).toMatchObject({ asPath: "/auth" });
  });
});
