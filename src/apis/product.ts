import { Dispatch, SetStateAction } from "react";

const fetchSuggestionsByKeySearch = async (
  searchTerm: string,
  setMatchedWords: Dispatch<SetStateAction<string[]>>
) => {
  await fetch(
    `http://localhost:9991/ehb-api/api/v1/products/search-suggest?prefix=${searchTerm}`
  )
    .then((res) => res.json())
    .then((data) => setMatchedWords(data.data))
    .catch((err) => console.log(err));
};

export { fetchSuggestionsByKeySearch };
