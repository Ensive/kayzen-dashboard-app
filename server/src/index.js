const express = require('express');
const path = require('path');
const csvtojson = require('csvtojson');
const app = express();
const PORT = 3001;

app.get('/data', exposeCSVdata);
app.listen(PORT, () => console.log('Express server listening in port ', PORT));

const reportsCSV = path.join(__dirname, '..', 'db/reports.csv');
const advertisersCSV = path.join(__dirname, '..', 'db/advertisers.csv');
const campaignsCSV = path.join(__dirname, '..', 'db/campaigns.csv');

async function exposeCSVdata(req, res) {
  const reports = await csvtojson().fromFile(reportsCSV);
  const advertisers = await csvtojson().fromFile(advertisersCSV);
  const campaigns = await csvtojson().fromFile(campaignsCSV);
  res.send({ reports, advertisers, campaigns });
}
