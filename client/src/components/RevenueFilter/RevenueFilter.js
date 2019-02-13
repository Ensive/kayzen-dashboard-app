import React from 'react';
import './RevenueFilter.scss';

const revenueFilterOptions = [10000, 20000, 30000, 40000];
const RevenueFilter = ({ className, revenueFilter, onRevenueFilterChange }) => {
  return (
    <div className={className}>
      <select value={revenueFilter} onChange={onRevenueFilterChange}>
        <option key={0} value={0}>
          All Revenue
        </option>
        {revenueFilterOptions.map((value, index) => (
          <option key={index + 1} value={value}>
            revenue > {value.toLocaleString()} $
          </option>
        ))}
      </select>
    </div>
  );
};

export default RevenueFilter;
