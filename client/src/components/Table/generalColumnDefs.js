const generalColumnDefs = [
  { headerName: 'Advertiser', field: 'advertiser_id', sortable: true, filter: true },
  { headerName: 'Campaign', field: 'campaign_id' },
  { headerName: 'Date', field: 'date' },
  { headerName: 'Impressions', field: 'impressions' },
  { headerName: 'Clicks', field: 'clicks' },
  { headerName: 'Installs', field: 'installs' },
  { headerName: 'Cost', field: 'cost_micros', sortable: true }
];

export default generalColumnDefs;
