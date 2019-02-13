import React, { Component } from 'react';
import axios from 'axios';

// common components
import Header from '../common/Header/Header';
import Footer from '../common/Footer/Footer';
import Sidebar from '../common/Sidebar/Sidebar';

// feature components
import BarChart from '../components/BarChart/BarChart';
import SelectAdvertiser from '../components/SelectAdvertiser/SelectAdvertiser';
import SelectCampaign from '../components/SelectCampaign/SelectCampaign';
import LineChart from '../components/LineChart/LineChart';
import ColumnChart from '../components/ColumnChart/ColumnChart';
import Summary from '../components/Summary/Summary';
import CostModelFilter from '../components/CostModelFilter/CostModelFilter';
import RevenueFilter from '../components/RevenueFilter/RevenueFilter';
import Table from '../components/Table/Table';

// util
import digestSeriesData from './util/digestSeriesData';
import campaignColumnDefs from '../components/Table/campaignColumnDefs';
import generalColumnDefs from '../components/Table/generalColumnDefs';

import './App.scss';

class App extends Component {
  unfilteredCampaignsRowData = [];
  state = {
    advertiserId: '',
    campaignId: '',
    advertisers: [],
    campaigns: [],
    reports: [],
    barChartOptions: {
      series: []
    },
    revenueFilter: 0,
    costModelFilter: '',
    chartOptions: {
      series: [],
      plotOptions: {}
    },
    columnChartOptions: {
      series: [],
      plotOptions: {}
    },
    campaignsRowData: [],
    rowData: [],
    campaignSummary: {
      name: '',
      cost_model: '',
      impressions: undefined,
      clicks: undefined,
      installs: undefined,
      income: undefined
    }
  };

  async componentDidMount() {
    // TODO: refactor
    try {
      const topPicks = await this.fetchCampaignsTopPicks();
      this.setCampaignTopPicks(topPicks.data);
      const allCampaigns = await this.fetchAllCampaignsSummary();
      this.setAllCampaignsSummary(allCampaigns.data);
      const {
        data: { reports, advertisers, campaigns }
      } = await axios.get('/api/reports');

      // TODO: remove simulate long loading from server
      setTimeout(() => {
        this.setState({ reports, advertisers, campaigns });
        this.setDefaultCampaign();
      }, 2000);

      // TODO: remove simulation
      setTimeout(() => {
        this.setState({ rowData: reports });
      }, 3000);
    } catch (error) {
      // TODO: error handling
      console.log(error);
    }
  }

  fetchCampaignsTopPicks = () => {
    // simulate loading
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(axios.get('/api/campaigns/top-picks'));
      }, 1000);
    });
  };

  setCampaignTopPicks = campaigns => {
    const campaignsRevenue = campaigns.map(({ income }) => income);
    const categories = campaigns.map(
      ({ campaign_name, advertiser_name }) => `${advertiser_name} <br /> <b>${campaign_name}</b>`
    );
    this.setState({
      barChartOptions: {
        xAxis: {
          categories
        },
        series: [
          {
            name: 'Revenue',
            data: campaignsRevenue
          }
        ]
      }
    });
  };

  fetchAllCampaignsSummary = () => {
    return axios.get('/api/campaigns/summary');
  };

  setAllCampaignsSummary = campaigns => {
    this.setState({ campaignsRowData: campaigns });
    this.unfilteredCampaignsRowData = campaigns;
  };

  setDefaultCampaign = () => {
    // set the most valuable campaign by default
    // TODO: refactor & eliminate
    this.handleAdvertiserChange({ target: { value: 3 } });
    this.handleCampaignChange({ target: { value: 119 } });
  };

  fetchCampaignSummary = id => {
    return axios.get(`/api/campaigns/summary/${id}`);
  };

  handleCostModelFilterChange = e => {
    const costModelFilter = e && e.target && e.target.value;
    let filteredCampaignsPerCostModel = this.unfilteredCampaignsRowData;

    if (costModelFilter) {
      filteredCampaignsPerCostModel = filteredCampaignsPerCostModel.filter(
        ({ cost_model }) => cost_model === costModelFilter
      );
    }

    const hasSetRevenueFilter = this.state.revenueFilter > 0;
    if (hasSetRevenueFilter) {
      filteredCampaignsPerCostModel = filteredCampaignsPerCostModel.filter(
        ({ income }) => income > this.state.revenueFilter
      );
    }

    this.setState({ costModelFilter, campaignsRowData: filteredCampaignsPerCostModel });
  };

  handleRevenueFilterChange = e => {
    const revenueFilter = e && e.target && Number(e.target.value);
    let filteredCampaignsPerRevenueThreshold = this.unfilteredCampaignsRowData.filter(
      ({ income }) => income > revenueFilter
    );

    const hasSetCostModelFilter = this.state.costModelFilter !== '';
    if (hasSetCostModelFilter) {
      filteredCampaignsPerRevenueThreshold = filteredCampaignsPerRevenueThreshold.filter(
        ({ cost_model }) => cost_model === this.state.costModelFilter
      );
    }

    this.setState({ revenueFilter, campaignsRowData: filteredCampaignsPerRevenueThreshold });
  };

  handleAdvertiserChange = e => {
    let advertiserId;

    if (e && e.target && e.target.value) {
      advertiserId = Number(e.target.value);
    } else {
      advertiserId = '';
    }

    this.setState({ advertiserId, campaignId: '', campaignSummary: {} });
  };

  handleCampaignChange = e => {
    const campaignId = e && e.target && Number(e.target.value);
    if (!campaignId) {
      this.setState({ campaignId });
      return;
    }

    const { advertiserId, reports } = this.state;
    const { series, pointStart } = digestSeriesData(reports, advertiserId, campaignId);
    this.setState(
      {
        campaignId,
        chartOptions: {
          series: series.slice(0, 3),
          plotOptions: {
            spline: {
              pointStart,
              pointIntervalUnit: 'day'
            }
          }
        },
        columnChartOptions: {
          series: [{ ...series[3], color: '#50897A' }],
          plotOptions: {
            column: {
              pointStart,
              pointIntervalUnit: 'day'
            }
          }
        }
      },
      async () => {
        const { data } = await this.fetchCampaignSummary(this.state.campaignId);
        this.setState({ campaignSummary: data });
      }
    );
  };

  render() {
    const {
      advertiserId,
      campaignId,
      advertisers,
      campaigns,
      rowData,
      costModelFilter,
      revenueFilter,
      campaignsRowData,
      barChartOptions,
      chartOptions,
      columnChartOptions,
      campaignSummary
    } = this.state;

    const hasData = advertisers.length > 0 && campaigns.length > 0 && campaignId && advertiserId;
    const hasSummary = campaignSummary.name !== '' && campaignSummary.cost_model !== '';
    const isLoading = !hasData && !hasSummary;

    const advertiserName =
      advertisers.length > 0 && advertiserId
        ? this.state.advertisers.find(advertiser => advertiser.id === advertiserId).name
        : '';
    const campaignName = this.state.campaignSummary.name;

    return (
      <div className="App">
        <Sidebar />

        <div className="Main">
          <Header />

          <div className="Container">
            <div className="Wrapper">
              <BarChart
                isLoading={campaignsRowData.length === 0}
                className="Box"
                chartOptions={barChartOptions}
              />
              <Table
                className="Box"
                title="Campaigns Summary Overview"
                rowData={campaignsRowData}
                columnDefs={campaignColumnDefs}
                paginationPageSize={10}>
                <CostModelFilter
                  className="CostModelFilter"
                  costModelFilter={costModelFilter}
                  onCostModelFilterChange={this.handleCostModelFilterChange}
                />
                <RevenueFilter
                  className="RevenueFilter"
                  revenueFilter={revenueFilter}
                  onRevenueFilterChange={this.handleRevenueFilterChange}
                />
              </Table>
            </div>
          </div>

          <div className="Container">
            <div className="SelectWrapper">
              {advertisers.length > 0 && (
                <SelectAdvertiser
                  className="Select"
                  advertiserId={advertiserId}
                  advertisers={advertisers}
                  onAdvertiserChange={this.handleAdvertiserChange}
                />
              )}
              {advertiserId && campaigns.length > 0 && (
                <SelectCampaign
                  className="Select"
                  campaignId={campaignId}
                  advertiserId={advertiserId}
                  campaigns={campaigns}
                  onCampaignChange={this.handleCampaignChange}
                />
              )}
            </div>
            <div className="Wrapper">
              <LineChart
                className="Box"
                isLoading={isLoading}
                advertiserId={advertiserId}
                campaignId={campaignId}
                chartOptions={chartOptions}
              />
              <ColumnChart
                className="Box"
                isLoading={isLoading}
                advertiserId={advertiserId}
                campaignId={campaignId}
                chartOptions={columnChartOptions}
              />
              <Summary
                advertiserId={advertiserId}
                isLoading={isLoading}
                campaignId={campaignId}
                advertiserName={advertiserName}
                campaignName={campaignName}
                campaignSummary={campaignSummary}
              />
            </div>
          </div>

          <div className="Container">
            <div className="Box">
              <Table
                className="Table"
                title="General Daily Overview"
                rowData={rowData}
                columnDefs={generalColumnDefs}
                paginationPageSize={30}
              />
            </div>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
