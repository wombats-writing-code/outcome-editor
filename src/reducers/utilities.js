

export function getDomain() {
  if (window.location.hostname.indexOf('localhost') > -1) {
    return 'http://localhost:9999'
  }

  return '';
}

export function arrayEncode(array, query, isFirst) {
  if (!array || !query) return '';

  let string;
  if (array.length === 1) {
    if (isFirst) {
      string = `?${query}=` + array[0];
    } else {
      string = `&${query}=` + array[0];
    }

  } else {
    string = _.reduce(array, (result, value) => {
      result += `&${query}=` + value;
      return result;
    }, '');
  }

  return string;
}
