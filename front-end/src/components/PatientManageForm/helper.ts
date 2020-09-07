
export function addressFormat(option: any) {
  return ['region', 'city', 'street', 'house']
    .reduce((result, key) => option[key] ? result.concat(option[key]) : result, [])
    .join(', ')
}
