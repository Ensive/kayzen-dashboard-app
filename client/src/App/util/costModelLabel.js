export default function costModelLabel(model) {
  switch (model) {
    case 'per_click':
      return 'Per Click';
    case 'per_impression':
      return 'Per Impression';
    case 'per_install':
      return 'Per Install';
    default:
      return 'n/a';
  }
}
