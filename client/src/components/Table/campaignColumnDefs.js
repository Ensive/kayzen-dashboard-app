import costModelLabel from '../../App/util/costModelLabel';
import currencyFormatter from '../../App/util/currencyFormatter';

const campaignColumnDefs = [
  {
    headerName: 'Advertiser',
    field: 'advertiser_name',
    width: 140,
    sortable: true,
    filter: true
  },
  { headerName: 'Campaign', field: 'campaign_name', width: 170, filter: true },
  {
    headerName: 'Cost Model',
    field: 'cost_model',
    valueFormatter: costModelFormatter,
    sortable: true,
    filter: true
  },
  { headerName: 'Impressions', field: 'impressions', width: 130, sortable: true },
  { headerName: 'Clicks', field: 'clicks', width: 100, sortable: true },
  { headerName: 'Installs', field: 'installs', width: 120, sortable: true },
  {
    headerName: 'Revenue',
    field: 'income',
    width: 120,
    sortable: true,
    pinned: 'right',
    valueFormatter: currencyFormatter
  }
];

export default campaignColumnDefs;

function costModelFormatter(params) {
  return costModelLabel(params.value);
}
