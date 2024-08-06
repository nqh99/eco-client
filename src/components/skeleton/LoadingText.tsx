import React from "react";

interface LoadingTextProps {
  className?: string;
}

const LoadingText = ({ className }: LoadingTextProps) => {
  return (
    <div className={`h-4 bg-gray-200 rounded ${className}`} />
  );
};

export default LoadingText;
