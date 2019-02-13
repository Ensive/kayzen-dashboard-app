export default function currencyFormatter(params) {
  const formattedNumber = params.value ? formatNumber(params.value) : formatNumber(params);
  return formattedNumber + ' $';
}

function formatNumber(number) {
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
