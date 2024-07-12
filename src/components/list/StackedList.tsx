"use client";

import React, { useEffect, useRef, useState } from "react";
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
const StackedList = ({
  title,
  children,
  direction = "horizontal",
  className,
}: StackedListProps) => {
  const childrenArr = React.Children.toArray(children);

  const [width, setWidth] = useState(0);

  const carousel = useRef<HTMLDivElement>(null);

  const useCarouselByBtn = ({
    childrenArr,
  }: {
    childrenArr: React.ReactNode[];
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 === childrenArr.length ? 0 : prevIndex + 1
      );
    };
    const handlePrevious = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex - 1 < 0 ? childrenArr.length - 1 : prevIndex - 1
      );
    };
    const handleDotClick = (index: number) => {
      setCurrentIndex(index);
    };
  };

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <div className={`rounded-xl bg-white ${className || ""}`}>
      {title != null &&
        (typeof title == "string" ? (
          <div className="flex justify-between mt-2 p-2">
            <h2 className="text-lg font-bold">{title}</h2>
            <span className="block text-sm text-green-800">Xem tất cả</span>
          </div>
        ) : (
          title
        ))}
      <m.div
        ref={carousel}
        whileTap={{ cursor: "grabbing" }}
        className="cursor-grab overflow-hidden p-2"
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
    </div>
  );
};

export default StackedList;
