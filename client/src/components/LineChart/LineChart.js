import React, { Component } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './LineChart.css';

// Documentation:
// xAxis.dateTimeLabelFormats
// tooltip
// yAxis

const chartOptions = {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'Advertisement Report'
  },
  subtitle: {
    text:
      'General report for clicks, impressions and installs, filterable by Advertiser or Campaign'
  },
  xAxis: {
    type: 'datetime',
    title: {
      text: 'Day'
    }
  },
  yAxis: {
    title: {
      text: 'Total number'
    },
    min: 0
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    borderWidth: 0
  },
  loading: {},
  plotOptions: {
    spline: {
      pointIntervalUnit: 'day'
    }
  },
  series: [
    {
      data: []
    }
  ]
};

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advertisers: [],
      campaigns: [],
      advertiserId: '',
      campaignId: '',
      series: [],
      plotOptions: {}
    };
    this.chart = React.createRef();
  }

  componentDidMount() {
    // const chartObj = this.chart.current.chart;

    axios.get('/data').then(response => {
      const {
        data: { reports, advertisers, campaigns }
      } = response;

      this.setState({
        reports,
        advertisers,
        campaigns
      });
    });
  }

  handleAdvertiserChange = e => {
    const advertiserId = e && e.target && e.target.value;
    this.setState({ advertiserId });
  };

  handleCampaignChange = e => {
    const campaignId = e && e.target && e.target.value;
    const { advertiserId, reports } = this.state;
    const { series, pointStart } = digestSeriesData(reports, advertiserId, campaignId);
    this.setState({
      campaignId,
      series,
      plotOptions: {
        spline: {
          pointStart,
          pointIntervalUnit: 'day'
        }
      }
    });
  };

  render() {
    const options = { ...chartOptions, ...this.state };
    const { advertiserId, campaignId } = this.state;
    return (
      <React.Fragment>
        {this.state.advertisers.length > 0 && (
          <select value={advertiserId} onChange={this.handleAdvertiserChange}>
            <option key={''} value={''}>
              Select Advertiser
            </option>
            {this.state.advertisers.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        )}
        {advertiserId && this.state.campaigns.length > 0 && (
          <select value={campaignId} onChange={this.handleCampaignChange}>
            <option key={''} value={''}>
              Select Campaign
            </option>
            {this.state.campaigns
              .filter(({ advertiser_id }) => advertiser_id === advertiserId)
              .map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
          </select>
        )}
        <div className="LineChart">
          {advertiserId && campaignId ? (
            <HighchartsReact ref={this.chart} highcharts={Highcharts} options={options} />
          ) : (
            'Please select Advertiser and respective Campaign...'
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default LineChart;

function digestSeriesData(data, advertiserId, campaignId) {
  // debugger;
  // TODO: we can move calculations to the server
  const MobileGames = data.filter(
    ({ advertiser_id, campaign_id }) => advertiser_id === advertiserId && campaign_id === campaignId
  );

  const clicks = MobileGames.map(({ clicks }) => Number(clicks));
  const impressions = MobileGames.map(({ impressions }) => Number(impressions));
  const installs = MobileGames.map(({ installs }) => Number(installs));
  const costMicros = MobileGames.map(({ cost_micros }) => cost_micros / 1000000);

  // debugger;

  return {
    pointStart: getUtcDate(MobileGames[0].date),
    series: [
      { name: 'Clicks', data: clicks },
      { name: 'Impressions', data: impressions },
      { name: 'Installs', data: installs },
      { name: '$ Paid', data: costMicros }
    ]
  };
}

function getUtcDate(date) {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();
  const day = dateObject.getDate();
  return Date.UTC(year, month, day);
}
