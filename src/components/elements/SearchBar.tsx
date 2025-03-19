'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CiSearch } from 'react-icons/ci';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchBarRef = useRef<HTMLInputElement>(null);
  // handle event: click item search -> router push -> show results
  const handleSearch = () => {
    router.push(`/search?/${searchTerm}`);
    setSearchTerm('');
  };
  // handle event: key press -> handle function handleSearch
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      className={`relative flex h-[60%] w-[60%] min-w-[15rem] items-center justify-center rounded-l-sm xl:mx-0 xl:my-3`}
    >
      <div
        role="search"
        className="relative flex h-full w-full flex-row items-center rounded-xl border border-black/10 bg-white text-sm text-gray-600"
      >
        <CiSearch className="ml-2 size-7" />
        <input
          aria-label="Tìm kiếm sản phẩm tươi ngon"
          name="search-bar"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          spellCheck="false"
          className="decoration-none relative flex w-full rounded-r-xl pl-2 pr-4 outline-none placeholder:text-sm"
          placeholder="Tìm kiếm sản phẩm tươi ngon"
        />
      </div>
    </div>
  );
}
