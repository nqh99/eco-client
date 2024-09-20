import React from "react";
import { motion } from "framer-motion";

type Props = {
  currentPage: number;
  setPage: (a: number, b?: number) => void;
  pages: Array<number>;
  autoSlide: boolean;
  setAutoSlide: (value: boolean) => void;
};

function Pagination({
  currentPage,
  setPage,
  pages,
  autoSlide,
  setAutoSlide,
}: Props) {
  // Wrap all the pagination dots with 'layout' so we can detect
  // when dots with a layoutId are removed/added

  function PlayStop() {
    setAutoSlide(!autoSlide);
  }

  return (
    <motion.div
      className="lg:hidden flex justify-center absolute bottom-4 xl:bottom-10 bg-black/20 backdrop-blur-md p-0.5 px-1 shadow-[inset_0_0px_12px_rgba(0,0,0,0.1)] rounded-full border border-neutral-300/40 antialiased"
      layout
    >
      <button
        role="navigation"
        aria-label={`play/pause autoslide functionality, Status true means on. Status: ${autoSlide}`}
        onClick={() => PlayStop()}
        className="border-r mr-0.5 pr-0.5 border-neutral-300/40"
      >
        {autoSlide ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4 text-neutral-400"
          >
            <path
              fillRule="evenodd"
              d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4 text-neutral-400"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      {pages.map((page) => (
        <Dot
          key={page}
          onClick={() => {
            setPage(page);
          }}
          isSelected={page === currentPage}
        />
      ))}
    </motion.div>
  );
}

type DotProps = {
  isSelected: boolean;
  onClick: () => void;
};

function Dot({ isSelected, onClick }: DotProps) {
  return (
    <div className="p-1 cursor-pointer" onClick={onClick}>
      <div
        className={`bg-neutral-400 shadow-[inset_0_0px_3px_rgba(0,0,0,0.2)] rounded-full relative w-2 h-2`}
      >
        {isSelected && (
          // By setting layoutId, when this component is removed and a new one
          // is added elsewhere, the new component will animate out from the old one.
          <motion.div
            className="bg-gradient-to-b from-green-2 to-green-4 rounded-full w-2 h-2 absolute"
            layoutId="highlight"
          />
        )}
      </div>
    </div>
  );
}

export default Pagination;
