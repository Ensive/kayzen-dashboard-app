import React from 'react';
import Loading from '../../common/Loading/Loading';
import costModelLabel from '../../App/util/costModelLabel';
import currencyFormatter from '../../App/util/currencyFormatter';
import './Summary.scss';

const Summary = ({
  isLoading,
  advertiserId,
  campaignId,
  advertiserName,
  campaignName,
  campaignSummary
}) => {
  const { cost_model, impressions, clicks, installs, income } = campaignSummary;
  const isSummaryVisible = (advertiserId && campaignId && campaignName && advertiserName) || '';
  return (
    <div className="Box">
      <h3 className="Title">Campaign Summary</h3>
      {isLoading && <Loading />}
      {isSummaryVisible && (
        <React.Fragment>
          <h4 className="Summary__title Text Text--gray">
            {advertiserName} - {campaignName}
          </h4>
          <ul className="Summary">
            <li className="Summary__item">
              <h5 className="Summary__name">Cost Model</h5>
              <span className="Summary__number">{costModelLabel(cost_model)}</span>
            </li>
            <li className="Summary__item">
              <h5 className="Summary__name">Total impressions</h5>
              <span className="Summary__number">{impressions.toLocaleString()}</span>
            </li>
            <li className="Summary__item">
              <h5 className="Summary__name">Total clicks</h5>
              <span className="Summary__number">{clicks.toLocaleString()}</span>
            </li>
            <li className="Summary__item">
              <h5 className="Summary__name">Total installs</h5>
              <span className="Summary__number">{installs.toLocaleString()}</span>
            </li>
            <li className="Summary__item Summary__item--income">
              <h5 className="Summary__name">Total Income</h5>
              <span className="Summary__number">+{currencyFormatter(income)}</span>
            </li>
          </ul>
        </React.Fragment>
      )}
      {!isLoading && !isSummaryVisible && 'Please select Advertiser and respective Campaign'}
    </div>
  );
};

export default Summary;
