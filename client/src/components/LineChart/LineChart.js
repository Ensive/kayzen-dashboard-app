import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Loading from '../../common/Loading/Loading.js';
import lineChartOptions from './lineChartOptions.js';
import './LineChart.css';

function LineChart({ className, isLoading, advertiserId, campaignId, chartOptions }) {
  const options = { ...lineChartOptions, ...chartOptions };
  const isChartVisible = (advertiserId && campaignId) || '';

  return (
    <div className={className}>
      <h3 className="Title">Campaign Overview</h3>
      {isLoading && <Loading />}
      {isChartVisible && <HighchartsReact highcharts={Highcharts} options={options} />}
      {!isLoading && !isChartVisible && 'Please select Advertiser and respective Campaign'}
    </div>
  );
}

export default LineChart;
