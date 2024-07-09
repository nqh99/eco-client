import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fetchSuggestionsByKeySearch } from "@/apis/product";

type Props = {
  className: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.1,
      staggerChildren: 0.04,
    },
  },
};

const child = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const Suggestions = ({ searchTerm, setSearchTerm, className }: Props) => {
  const [matchedWords, setMatchedWords] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchSuggestionsByKeySearch(searchTerm, setMatchedWords);
  }, [searchTerm]);

  function clickSearch(str: string) {
    router.push(`/search?name=${str}`);
    setSearchTerm("");
    setMatchedWords([]);
  }

  return (
    <>
      {matchedWords.length > 0 && (
        <motion.ul
          variants={container}
          className={`${className} absolute w-full z-[60]`}
          initial="hidden"
          animate="show"
        >
          {matchedWords.map((item, index) => (
            <motion.li variants={child} key={index}>
              {/* {console.log(item)} */}
              <button
                onClick={() => clickSearch(item)}
                className="w-full text-left shadow border-t border-x bg-white hover:bg-slate-100 px-4 py-1.5"
              >
                {item}
              </button>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </>
  );
};

export default Suggestions;
