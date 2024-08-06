import React from "react";

interface LoadingImageProps {
  className?: string;
}

const LoadingImage = ({ className }: LoadingImageProps) => {
  return (
    <div className={`w-full h-48 bg-gray-200 ${className}`} />
  );
};

export default LoadingImage;
