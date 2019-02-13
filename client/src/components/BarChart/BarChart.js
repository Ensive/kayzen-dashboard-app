import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Loading from '../../common/Loading/Loading';
import lineChartOptions from '../LineChart/lineChartOptions';

const barChartOptions = {
  ...lineChartOptions,
  chart: {
    defaultSeriesType: 'bar',
    height: 250
  },
  yAxis: {
    labels: {
      format: '{value:,.0f} $'
    },
    title: {
      text: 'Revenue'
    }
  },
  xAxis: {
    categories: []
  },
  legend: false,
  plotOptions: {},
  tooltip: {
    valueSuffix: ' $',
    valueDecimals: 0
  }
};

const BarChart = ({ className, isLoading, chartOptions }) => {
  const options = { ...barChartOptions, ...chartOptions };
  return (
    <div className={className}>
      <h3 className="Title">
        Top 5 Campaigns <small className="Text Text--small Text--gray">(by revenue)</small>
      </h3>
      {isLoading ? <Loading /> : <HighchartsReact highcharts={Highcharts} options={options} />}
    </div>
  );
};

export default BarChart;
