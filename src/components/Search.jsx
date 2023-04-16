import React from 'react';

function Search({onChangeSearch}) {
  return (
    <div>
      <input onChange={(e) => onChangeSearch(e.target.value)} />
    </div>
  );
}

export default Search;