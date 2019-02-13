export default function digestSeriesData(data, advertiserId, campaignId) {
  // TODO: we can move calculations to the server
  const MobileGames = data.filter(
    ({ advertiser_id, campaign_id }) => advertiser_id === advertiserId && campaign_id === campaignId
  );

  const clicks = MobileGames.map(({ clicks }) => clicks);
  const impressions = MobileGames.map(({ impressions }) => impressions);
  const installs = MobileGames.map(({ installs }) => installs);
  const costMicros = MobileGames.map(({ cost_micros }) => cost_micros / 1000000);

  return {
    pointStart: getUtcDate(MobileGames[0].date),
    series: [
      { name: 'Impressions', color: '#B76CE7', data: impressions },
      { name: 'Clicks', color: '#6FE7E4', data: clicks },
      { name: 'Installs', color: '#6FA6E8', data: installs },
      { name: 'Revenue', color: '#6FA6E7', data: costMicros }
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
