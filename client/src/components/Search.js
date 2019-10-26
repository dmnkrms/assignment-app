import React from "react";

const Search = ({ searchString, setSearchString }) => (
  <div className="ui icon input">
    <input
      type="text"
      value={searchString}
      onChange={e => setSearchString(e.target.value)}
      placeholder="Search company..."
      className="prompt"
    />
    <i aria-hidden="true" className="search icon"></i>
  </div>
);

export default Search;
