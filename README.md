# YouTube MP3 Downloader

A simple web application that allows users to download audio from YouTube videos in MP3 format. The client is built using React and is deployed on GitHub Pages. The server, which handles the downloading process, must be run locally.

### Important Note

This application requires a local server to function correctly as the server handles the downloading process. Ensure that the server is running before using the client.

## Getting Started

To run the server locally, follow these steps:

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- npm (Node package manager, comes with Node.js)

### 1. Clone the Repository

You can clone only the `server` folder using sparse checkout:

```bash
git clone --no-checkout https://github.com/mccedddy/yt-mp3-downloader.git
cd yt-mp3-downloader
git sparse-checkout init --cone
git sparse-checkout set server
git checkout main
```

### 2. Set Up the Server

Navigate to the server directory and install the required packages:

```
cd server
npm install
```
### 3. Run the Server

Start the server by running the following command:

```
node server.js
```

The server will run on http://localhost:4000.

### Using the Application

1. Open the client application in your browser. You can access the deployed client application at [mccedddy.github.io/yt-mp3-downloader](https://mccedddy.github.io/yt-mp3-downloader).
2. Enter the YouTube video URL you wish to download the audio from.
3. Click the "Download" button to initiate the download process.
