import { render, screen } from "@testing-library/react";
import Info from "../components/Info";

describe("Info Component", () => {
  beforeEach(() => {
    render(<Info />);
  });

  test("renders the card header", () => {
    const header = screen.getByText("How It Works");
    expect(header).toBeInTheDocument();
  });

  test("renders the description text", () => {
    const descriptionText = screen.getByText(
      /This website is designed to make downloading audio from YouTube videos quick and easy/i
    );
    expect(descriptionText).toBeInTheDocument();
  });

  test("renders instructions correctly", () => {
    const instructionItems = [
      /find the video/i,
      /paste the video URL/i,
      /start downloading/i,
    ];

    instructionItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("renders example video URL", () => {
    const exampleUrl = screen.getByText(/www.youtube.com/i);
    expect(exampleUrl).toBeInTheDocument();
  });

  test("renders about section", () => {
    const aboutText = screen.getByText(
      /The YouTube MP3 downloader application is built with/i
    );
    expect(aboutText).toBeInTheDocument();
  });

  test("renders GitHub link", () => {
    const githubLink = screen.getByRole("link", { name: /Go to GitHub/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/mccedddy/yt-downloader-web"
    );
  });
});
