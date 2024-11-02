import { render, screen } from "@testing-library/react";
import Result from "../components/Result";

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
describe("Result component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<Result videoInfo={mockVideo} />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders thumbnail", () => {
    const thumbnail = screen.getByAltText("thumbnail");

    expect(thumbnail).toBeInTheDocument();
  });

  test("renders title and duration", () => {
    const title = screen.getByText(mockVideo.title);
    const duration = screen.getByText("2:00");

    expect(title).toBeInTheDocument();
    expect(duration).toBeInTheDocument();
  });

  test("renders format and file size", () => {
    const format = screen.getByText("MP3");
    const fileSize = screen.getByText(mockVideo.formats.audio.filesize);

    expect(format).toBeInTheDocument();
    expect(fileSize).toBeInTheDocument();
  });

  test("renders download button", () => {
    const downloadButton = screen.getByText("Download");

    expect(downloadButton).toBeInTheDocument();
  });

  test("triggers handleDownload on button click", () => {
    const createElementSpy = jest.spyOn(document, "createElement");
    const appendChildSpy = jest.spyOn(document.body, "appendChild");
    const removeChildSpy = jest.spyOn(document.body, "removeChild");

    const downloadButton = screen.getByText("Download");
    downloadButton.click();

    // Created an anchor element
    expect(createElementSpy).toHaveBeenCalledWith("a");

    // Appended anchor to the body
    expect(appendChildSpy).toHaveBeenCalled();

    const anchorElement = createElementSpy.mock.results[0].value;
    expect(anchorElement.href).toBe(
      `http://localhost:4000/download?url=${encodeURIComponent(
        mockVideo.url
      )}&itag=${mockVideo.formats.audio.itag}&title=${encodeURIComponent(
        mockVideo.title
      )}`
    );

    // Remove anchor from the body
    expect(removeChildSpy).toHaveBeenCalledWith(anchorElement);
  });
});
