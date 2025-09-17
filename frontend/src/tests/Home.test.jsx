import { readFileSync } from "node:fs";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import { ContentContext } from "../context/ContentContext.jsx";

const loadContent = () => {
  const file = readFileSync("../shared/content.json");
  return JSON.parse(file.toString());
};

describe("Home page", () => {
  const content = loadContent();
  const renderWithContent = () =>
    render(
      <MemoryRouter>
        <ContentContext.Provider
          value={{ content, isLoading: false, error: "" }}
        >
          <Home />
        </ContentContext.Provider>
      </MemoryRouter>
    );

  it("renders hero copy sourced from shared content", () => {
    renderWithContent();
    expect(
      screen.getByText(content.pages.home.hero.headline)
    ).toBeInTheDocument();
    expect(
      screen.getByText(content.pages.home.hero.subheadline)
    ).toBeInTheDocument();
  });

  it("shows loyalty perks and allows submitting the loyalty form", async () => {
    renderWithContent();
    expect(screen.getByText(content.loyalty.headline)).toBeInTheDocument();

    const nameField = screen.getByPlaceholderText("Your name");
    const emailField = screen.getByPlaceholderText("you@example.com");

    fireEvent.change(nameField, { target: { value: "Test Guest" } });
    fireEvent.change(emailField, { target: { value: "guest@example.com" } });

    expect(nameField).toHaveValue("Test Guest");
    expect(emailField).toHaveValue("guest@example.com");
  });
});
