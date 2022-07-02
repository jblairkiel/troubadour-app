// @src/components/search.jsx

import React from "react";

import SearchQuery from "./SearchQuery";

export default function Search({ searchQuery }) {
  return (
    <div>
      <SearchQuery {
      searchQueryAlbums={searchQuery.data.albums} 
      searchQueryArtists={ searchQuery.data.artists} 
      searchQueryGenres={searchQuery.data.query} 
      searchQueryTracks={searchQuery.data.tracks}}
       />
    </div>
  );
}