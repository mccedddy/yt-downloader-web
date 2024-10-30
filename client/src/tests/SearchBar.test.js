import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

// Props
const mockSetVideo = jest.fn();
const mockSetFetching = jest.fn();

// Tests
describe("SearcBar component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders input and button", () => {
    render(
      <SearchBar
        setVideo={mockSetVideo}
        fetching={false}
        setFetching={mockSetFetching}
      />
    );
    const inputElement = screen.getByPlaceholderText("Enter YouTube video URL");
    const searchButton = screen.getByRole("button", { name: "Search" });

    expect(inputElement).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test("textbox is initially empty", () => {
    render(
      <SearchBar
        setVideo={mockSetVideo}
        fetching={false}
        setFetching={mockSetFetching}
      />
    );
    const inputElement = screen.getByPlaceholderText("Enter YouTube video URL");

    expect(inputElement.value).toBe("");
  });

  test("updates input value when typing", () => {
    render(
      <SearchBar
        setVideo={mockSetVideo}
        fetching={false}
        setFetching={mockSetFetching}
      />
    );
    const inputElement = screen.getByPlaceholderText("Enter YouTube video URL");

    fireEvent.change(inputElement, {
      target: { value: "https://youtube.com/watch?v=test" },
    });

    expect(inputElement.value).toBe("https://youtube.com/watch?v=test");
  });

  test("calls fetchVideo function on button click", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ title: "Test Video" }),
      })
    );

    render(
      <SearchBar
        setVideo={mockSetVideo}
        fetching={false}
        setFetching={mockSetFetching}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter YouTube video URL");
    const buttonElement = screen.getByRole("button", { name: "Search" });

    fireEvent.change(inputElement, {
      target: { value: "https://youtube.com/watch?v=test" },
    });
    fireEvent.click(buttonElement);

    expect(mockSetFetching).toHaveBeenCalledWith(true);
    expect(mockSetVideo).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:4000/fetch-video",
      expect.any(Object)
    );

    global.fetch.mockRestore();
  });

  test("doesn't call fetch if fetching is true", () => {
    render(
      <SearchBar
        setVideo={mockSetVideo}
        fetching={true}
        setFetching={mockSetFetching}
      />
    );

    const buttonElement = screen.getByRole("button", { name: "Search" });
    fireEvent.click(buttonElement);

    expect(mockSetFetching).not.toHaveBeenCalled();
    expect(mockSetVideo).not.toHaveBeenCalled();
  });
});
