"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion as m } from "framer-motion";

interface StackedListProps {
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
const StackedList = ({
  children,
  direction = "horizontal",
  className,
}: StackedListProps) => {
  const childrenArr = React.Children.toArray(children);

  const [width, setWidth] = useState(0);

  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <m.div
      ref={carousel}
      whileTap={{ cursor: "grabbing" }}
      className={`bg-white mt-2 ${
        className || ""
      } cursor-grab overflow-hidden`}
    >
      <m.ul
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className={`flex flex-nowrap ${
          direction == "horizontal" ? "flex-row" : "flex-col"
        } gap-5`}
      >
        {childrenArr.map((element, index) => {
          return <m.li key={index}>{element}</m.li>;
        })}
      </m.ul>
    </m.div>
  );
};

export default StackedList;
