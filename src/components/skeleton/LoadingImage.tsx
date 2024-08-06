// LoadingImage.tsx
import React from "react";

interface LoadingImageProps {
  className?: string;
}

const LoadingImage: React.FC<LoadingImageProps> = ({ className = "" }) => (
  <div className={`skeleton ${className}`}></div>
);

export default LoadingImage;