const lineChartOptions = {
  chart: {
    type: 'spline',
    height: 450
  },
  title: {
    text: ''
  },
  subtitle: {
    text: ''
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

export default lineChartOptions;
