import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import lineChartOptions from '../LineChart/lineChartOptions';
import Loading from '../../common/Loading/Loading';
import './ColumnChart.css';

const columnChartOptions = {
  ...lineChartOptions,
  chart: {
    type: 'column'
  },
  yAxis: {
    labels: {
      format: '{value:,.0f} $'
    },
    title: {
      text: 'Revenue'
    }
  },
  legend: false,
  tooltip: {
    valuePrefix: '$',
    valueDecimals: 0
  }
};

const ColumnChart = ({ className, isLoading, advertiserId, campaignId, chartOptions }) => {
  const options = { ...columnChartOptions, ...chartOptions };
  const isChartVisible = (advertiserId && campaignId) || '';

  return (
    <div className={className}>
      <h3 className="Title">
        Campaign Revenue <small className="Text Text--small Text--gray">(daily)</small>
      </h3>
      {isLoading && <Loading />}
      {isChartVisible && <HighchartsReact highcharts={Highcharts} options={options} />}
      {!isLoading && !isChartVisible && 'Please select Advertiser and respective Campaign'}
    </div>
  );
};

export default ColumnChart;
