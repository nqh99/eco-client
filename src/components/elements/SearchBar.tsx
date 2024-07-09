import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
// import Suggestions from "./Suggestions";
import Image from "next/image";

//========= import image =========== //
import iconSearch from "@/public/icons/Icon-search-placehod.svg";
import Suggestions from "./Suggestions";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchBarRef = useRef<HTMLInputElement>(null);
  // handle event: click item search -> router push -> show results
  const handleSearch = () => {
    router.push(`/search?/${searchTerm}`);
    setSearchTerm("");
  };
  // handle event: key press -> handle function handleSearch
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={`relative h-[60%] flex items-center justify-center w-[60%] rounded-l-sm my-4 mx-[1rem] xl:my-3 xl:mx-0 min-w-[15rem]`}
    >
      <div
        role="search"
        className="relative flex flex-row w-full h-full items-center border bg-white border-black/10 rounded-xl text-gray-600 text-sm"
      >
        <Image
          src={iconSearch}
          className="ml-2 w-6 h-6"
          alt="icon search placeholder"
        />
        <input
          aria-label="Tìm kiếm sản phẩm tươi ngon"
          name="search-bar"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          spellCheck="false"
          className="relative flex w-full pl-2 pr-4 placeholder:text-sm outline-none decoration-none rounded-r-xl"
          placeholder="Tìm kiếm sản phẩm tươi ngon"
        />
        {searchTerm.length > 2 ? (
          <Suggestions
            searchTerm={searchTerm}
            className={"top-10"}
            setSearchTerm={setSearchTerm}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
