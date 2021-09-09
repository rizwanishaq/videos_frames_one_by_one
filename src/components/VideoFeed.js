import React, { useRef, useEffect, useState } from "react";

const VideoFeed = () => {
  const videoElement = useRef(undefined);
  const canvas = useRef(undefined);
  const [image, setImage] = useState(null);
  const [play, setPlay] = useState(true);

  const PlayEvent = () => {
    const updateCanvas = () => {
      canvas.current.width = videoElement.current.videoWidth;
      canvas.current.height = videoElement.current.videoHeight;
      canvas.current.hidden = true;
      canvas.current.getContext("2d").drawImage(videoElement.current, 0, 0);
      setImage(canvas.current.toDataURL("image/jpeg"));

      videoElement.current.requestVideoFrameCallback(updateCanvas);
    };

    videoElement.current.requestVideoFrameCallback(updateCanvas);
  };

  const ClickEvent = () => {
    setPlay(!play);
    play ? videoElement.current.play() : videoElement.current.pause();
  };

  useEffect(() => {
    videoElement.current.crossOrigin = "anonymous";
    videoElement.current.src =
      "https://cdn.glitch.com/c162fc32-0a96-4954-83c2-90d4cdb149fc%2FBig_Buck_Bunny_360_10s_20MB.mp4?v=1587545460302";
  }, []);
  return (
    <>
      <video
        ref={videoElement}
        onClick={ClickEvent}
        onPlay={PlayEvent}
        onEnded={() => videoElement.current.play()}
      />
      <canvas ref={canvas} />
      {image && <img src={image} alt="image_to_send" />}
    </>
  );
};

export default VideoFeed;
