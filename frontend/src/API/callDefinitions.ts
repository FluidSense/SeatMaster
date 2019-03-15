import store from '../store';

type fetchTypes = 'POST' | 'PUT' | 'DELETE';

// Admin calls
const elevatedGenericFetch = (fetchType: fetchTypes, url: string, data: any, token: string) => {
  return fetch(url, {
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${store.getState().oidc.user.id_token}`,
      'Content-Type': 'application/json',
      accessToken: `Bearer ${token}`,
    },
    method: fetchType,
  });
};

const genericFetch = (fetchType: fetchTypes, url: string, data: any) => {
  return fetch(url, {
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${store.getState().oidc.user.id_token}`,
      'Content-Type': 'application/json',
    },
    method: fetchType,
  });
};

const elevatedPostFetch = (url: string, data: any, token: string) =>
  elevatedGenericFetch('POST', url, data, token);
const elevatedPutFetch = (url: string, data: any, token: string) =>
  elevatedGenericFetch('PUT', url, data, token);
const elevatedDeleteFetch = (url: string, id: any, token: string) => {
  return fetch(`${url}${id}`, {
    headers: {
      Authorization: `Bearer ${store.getState().oidc.user.id_token}`,
      accesToken: `Bearer ${token}`,
    },
    method: 'DELETE',
  });
};

export const elevatedPostJson = (url: string, data: any, token: string) => {
  return elevatedPostFetch(url, data, token).then(response => response.ok
    ? response.json()
    : false);
};

export const elevatedPutJson = (url: string, data: any, token: string) => {
  return elevatedPutFetch(url, data, token).then(response => response.ok
    ? response.json()
    : false);
};

export const elevatedDeleteJson = (url: string, id: any, token: string) => {
  return elevatedDeleteFetch(url, id, token).then(response => response.ok
    ? response.json()
    : false);
};

export const elevatedGetJson = (url: string, token: string) => fetch(url, {
  headers: {
    Authorization: `Bearer ${store.getState().oidc.user.id_token}`,
    accessToken: token,
  },
});

// User
const postFetch = (url: string, data: any) => genericFetch('POST', url, data);
const putFetch = (url: string, data: any) => genericFetch('PUT', url, data);
const deleteFetch = (url: string, id: any) => {
  return fetch(`${url}${id}`, {
    headers: { Authorization: `Bearer ${store.getState().oidc.user.id_token}` },
    method: 'DELETE',
  });
};

export const postJson = (url: string, data: any) => {
  return postFetch(url, data).then(response => response.ok
    ? response.json()
    : false);
};

export const putJson = (url: string, data: any) => {
  return putFetch(url, data)
    .then(response => response.ok
      ? response.json()
      : false);
};

export const deleteJson = (url: string, id: any) => {
  return deleteFetch(url, id)
    .then(response => response.ok
      ? response.json()
      : false);
};

export const getJson = (url: string) => fetch(url, {
  headers: { Authorization: `Bearer ${store.getState().oidc.user.id_token}` },
})
  .then(response => response.ok
    ? response.json()
    : false);
