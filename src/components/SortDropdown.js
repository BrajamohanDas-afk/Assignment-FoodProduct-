import React from 'react';
import './SortDropdown.css';

const SortDropdown = ({ sortBy, onSortChange }) => {
  return (
    <div className="sort-dropdown">
      <label htmlFor="sort">Sort by:</label>
      <select
        id="sort"
        className="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="grade-asc">Nutrition Grade (Ascending)</option>
        <option value="grade-desc">Nutrition Grade (Descending)</option>
      </select>
    </div>
  );
};

export default SortDropdown;
