
// LoadingText.tsx
import React from "react";

interface LoadingTextProps {
  className?: string;
}

const LoadingText: React.FC<LoadingTextProps> = ({ className = "" }) => (
  <div className={`skeleton h-3 ${className}`}></div>
);

export default LoadingText;