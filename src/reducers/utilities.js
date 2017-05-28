

export function getDomain() {
  if (window.location.hostname.indexOf('localhost') > -1) {
    return 'http://localhost:9999'
  }

  return '';
}
