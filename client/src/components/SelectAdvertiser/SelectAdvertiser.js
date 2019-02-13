import React from 'react';

function SelectAdvertiser({ className, advertiserId, advertisers, onAdvertiserChange }) {
  return (
    <div className={className}>
      <label className="Text">
        Advertiser:<span style={{ color: 'red' }}>*</span>{' '}
      </label>
      <select value={advertiserId} onChange={onAdvertiserChange}>
        <option key={''} value={''}>
          Select Advertiser
        </option>
        {advertisers.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectAdvertiser;
