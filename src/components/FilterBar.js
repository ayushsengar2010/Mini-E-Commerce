import React, { useState, useEffect, useRef } from 'react';
import './FilterBar.css';

const FilterBar = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
  onClearFilters
}) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const debounceTimer = useRef(null);

  // Debounced search implementation
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [localSearch, onSearchChange]);

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
  };

  const hasActiveFilters = searchTerm || selectedCategory || sortOrder;

  return (
    <div className="filter-bar">
      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={localSearch}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-group">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
            className="filter-select"
          >
            <option value="">Sort by Price</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>

          {hasActiveFilters && (
            <button onClick={onClearFilters} className="clear-filters-btn">
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
