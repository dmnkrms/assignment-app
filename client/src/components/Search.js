import React from "react";

const Search = ({searchString,setSearchString}) => (
  <div>
    Search {' '}
    <input
      value={searchString}
      onChange={e => setSearchString(e.target.value)}
    />
  </div>
);

export default Search;