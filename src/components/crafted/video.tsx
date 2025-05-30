"use client";
import React, { useMemo } from "react";

interface VideoTextMaskProps {
  text?: string;
  videoUrl: string;
  fontSize?: number; // in px
  fontFamily?: string;
  fontWeight?: number | string;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
}

const VideoTextMask: React.FC<VideoTextMaskProps> = ({
  text,
  videoUrl,
  fontSize = 150,
  fontFamily = "Biko, sans-serif",
  fontWeight = 900,
  viewBoxWidth = 1000,
  viewBoxHeight = 300,
}) => {
  const encodedSVG = useMemo(() => {
    const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${viewBoxWidth} ${viewBoxHeight}'>
    <text 
      x='50%' 
      y='40%' 
      font-size='${fontSize}' 
      font-family='${fontFamily}' 
      font-weight='${fontWeight}' 
      text-anchor='middle'
    >
      SOFTWARE
    </text>
    <text 
      x='50%' 
      y='90%' 
      font-size='${fontSize}' 
      font-family='${fontFamily}' 
      font-weight='${fontWeight}' 
      text-anchor='middle'
    >
      ENGINEER
    </text>
  </svg>
`;

    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, [text, fontSize, fontFamily, fontWeight, viewBoxWidth, viewBoxHeight]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          WebkitMaskImage: encodedSVG,
          maskImage: encodedSVG,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoUrl} />
          Your browser does not support the video tag.
        </video>
      </div>
      <span className="sr-only">{text}</span>
    </div>
  );
};

export default VideoTextMask;
