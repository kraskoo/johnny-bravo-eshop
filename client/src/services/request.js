function request(method) {
  return function(url, body = {}, options = {}) {
    body = Object.keys(body).length > 0 ? JSON.stringify(body) : undefined;
    return fetch(url, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body,
      ...options
    }).then(response => response.json());
  }
}

function get(url, options = {}) {
  return request('GET')(url, options);
}

function post(url, body, options) {
  return request('POST')(url, body, options);
}

export { get, post };