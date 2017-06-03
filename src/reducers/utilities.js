

export function getDomain() {
  if (window.location.hostname.indexOf('localhost') > -1) {
    return 'http://localhost:9999'

  } else if (window.location.hostname.indexOf('mapping-lab-dev') > -1) {
    return 'http://open-ed-graph-dev.us-east-1.elasticbeanstalk.com'

  } else if (location.host.indexOf('mapping.mit.edu') > -1) {
    return 'https://open-ed-graph.aeizqnc7mw.us-east-1.elasticbeanstalk.com';
  }

  return 'http://localhost:9999';
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
