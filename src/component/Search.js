// @src/components/search.jsx

import React from "react";
import SearchQuery from "./SearchQuery";

export default function Search({ searchQuery }) {
  return (
      <SearchQuery searchQuery={searchQuery}></SearchQuery>
  )
}