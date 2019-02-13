import React from 'react';

function SelectCampaign({ className, campaignId, advertiserId, campaigns, onCampaignChange }) {
  return (
    <div className={className}>
      <label className="Text">
        Campaign:<span style={{ color: 'red' }}>*</span>{' '}
      </label>
      <select value={campaignId} onChange={onCampaignChange}>
        <option key={''} value={''}>
          Select Campaign
        </option>
        {campaigns
          .filter(({ advertiser_id }) => advertiser_id === advertiserId)
          .map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
      </select>
    </div>
  );
}

export default SelectCampaign;
