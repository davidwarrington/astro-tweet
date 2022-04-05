import fs from 'node:fs/promises';
import fetch from 'node-fetch';

const config = {
  bearerToken: '[BEARER TOKEN]',
  username: '[YOUR USERNAME]',
};

function prettifyJSON(data, space = 2) {
  return JSON.stringify(data, null, space);
}

function buildURL(baseURL, params = {}) {
  const url = new URL(baseURL);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url;
}

async function fetchFromTwitter(endpoint, params = {}) {
  const url = buildURL(`https://api.twitter.com${endpoint}`, params);

  const headers = {
    authorization: `Bearer ${config.bearerToken}`,
  };

  const response = await fetch(url.href, { headers });

  return response.json();
}

async function getUser(username) {
  const url = '/2/users/by';
  const params = { usernames: username };
  const response = await fetchFromTwitter(url, params);

  return response.data[0];
}

getUser(config.username).then(console.log);
