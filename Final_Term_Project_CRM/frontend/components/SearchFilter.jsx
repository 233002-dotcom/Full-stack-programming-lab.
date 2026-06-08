'use client';
import { Search, Filter } from 'lucide-react';

export default function SearchFilter({ search, onSearch, status, onStatus }) {
  return (
    <div className="search-filter-bar">
      <div className="search-input-wrap">
        <Search className="search-icon" size={16} />
        <input
          type="text"
          className="search-input"
          placeholder="Search customers by name, email or company..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          id="customer-search"
        />
      </div>
      <select
        className="filter-select"
        value={status}
        onChange={(e) => onStatus(e.target.value)}
        id="status-filter"
      >
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Lead">Lead</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
  );
}
