"use client";

import React, { HTMLAttributes } from "react";
import { motion as m } from "framer-motion";

interface StackedListProps {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  direction?: "vertical" | "horizontal";
  className?: string;
}

/**
 * A stacked list component that renders a list of elements in either a row or column direction.
 *
 * @component
 * @param {StackedListProps<any>} props - The props for the StackedList component.
 * @param {Array<any>} props.elements - The array of elements to render in the list.
 * @param {boolean} props.direction - The direction in which the elements should be stacked. If true, elements are stacked horizontally (row direction), otherwise stacked vertically (column direction).
 * @returns {JSX.Element} The rendered StackedList component.
 */
const StackedList: React.FC<StackedListProps> = ({
  title,
  children,
  direction = "horizontal",
  className,
}) => {
  return (
    <div className={`p-2 rounded-xl bg-white ${className || ""}`}>
      {title != null &&
        (typeof title == "string" ? (
          <div className="flex justify-between p-2">
            <h2 className="text-lg font-bold">{title}</h2>
            <span className="block text-sm text-green-800">Xem tất cả</span>
          </div>
        ) : (
          title
        ))}
      <m.ul
        className={`flex ${
          direction == "horizontal" ? "flex-row" : "flex-col"
        } justify-between`}
      >
        {children}
      </m.ul>
    </div>
  );
};

export default StackedList;
