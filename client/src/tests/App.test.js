import { render, screen } from "@testing-library/react";
import App from "../App";

// Mocks
const mockVideo = {
  title: "Test Video",
  url: "https://youtube.com/watch?v=test",
  thumbnail: "http://example.com/thumbnail.jpg",
  duration: 120,
  formats: {
    audio: {
      filesize: "5MB",
      itag: "140",
    },
  },
};

// Tests
describe("App", () => {
  test("renders logo", () => {
    render(<App />);
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
  });

  test("renders SearchBar component", () => {
    render(<App />);
    const searchBar = screen.getByPlaceholderText("Enter YouTube video URL");
    expect(searchBar).toBeInTheDocument();
  });

  test("renders Info component", () => {
    render(<App />);
    const infoTitle = screen.getByText("How It Works");
    expect(infoTitle).toBeInTheDocument();
  });

  test("renders Result component when video is set", () => {
    render(<App initialVideo={mockVideo} />);

    const videoTitle = screen.getByText(mockVideo.title);
    expect(videoTitle).toBeInTheDocument();
  });

  test("renders spinner when fetching", () => {
    render(<App initialFetching={true} />);

    // Spinner is rendered
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();

    // Result component is not rendered
    const downloadButton = screen.queryByTestId("download-button");
    expect(downloadButton).not.toBeInTheDocument();
  });
});
