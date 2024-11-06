export type VideoInfo = {
  title: string;
  thumbnail: string;
  duration: number;
  url: string;
  formats: {
    audio: {
      filesize: string;
      itag: string;
    };
  };
};
