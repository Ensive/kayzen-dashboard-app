import React from 'react';
import costModelLabel from '../../App/util/costModelLabel';
import './CostModelFilter.scss';

const costModelFilterOptions = ['per_click', 'per_impression', 'per_install'];
const CostModelFilter = ({ className, costModelFilter, onCostModelFilterChange }) => {
  return (
    <div className={className}>
      <select value={costModelFilter} onChange={onCostModelFilterChange}>
        <option key={0} value={''}>
          All Cost Models
        </option>
        {costModelFilterOptions.map((value, index) => (
          <option key={index + 1} value={value}>
            Only "{costModelLabel(value)}"
          </option>
        ))}
      </select>
    </div>
  );
};

export default CostModelFilter;
