import store from '../store';

type fetchTypes = 'POST' | 'PUT' | 'DELETE';

// User
const postFetch = (url: string, data: any) => genericFetch('POST', url, data);
const putFetch = (url: string, data: any) => genericFetch('PUT', url, data);
const deleteFetch = (url: string, id: any) => {
  return fetch(`${url}${id}`, {
    headers: { Authorization: `Bearer ${store.getState().oidc.user.id_token}` },
    method: 'DELETE',
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

export const postJson = (url: string, data: any) => {
  return postFetch(url, data)
    .then(response => response.ok
      ? response.json()
      : false)
    .catch(() => false);
};

export const putJson = (url: string, data: any) => {
  return putFetch(url, data)
    .then(response => response.ok
      ? response.json()
      : false)
    .catch(() => false);
};

export const deleteJson = (url: string, id: any) => {
  return deleteFetch(url, id)
    .then(response => response.ok
      ? response.json()
      : false)
    .catch(() => false);
};

export const getJson = (url: string) => fetch(url, {
  headers: { Authorization: `Bearer ${store.getState().oidc.user.id_token}` },
})
  .then(response => response.ok
    ? response.json()
    : false)
  .catch(() => false);

// Admin calls
const elevatedGenericFetch = (fetchType: fetchTypes, url: string, data: any) => {
  return fetch(url, {
    body: JSON.stringify(data),
    headers: {
      AccessToken: `Bearer ${store.getState().oidc.user.access_token}`,
      Authorization: `Bearer ${store.getState().oidc.user.id_token}`,
      'Content-Type': 'application/json',
    },
    method: fetchType,
  });
};

const elevatedPostFetch = (url: string, data: any) =>
  elevatedGenericFetch('POST', url, data);
const elevatedPutFetch = (url: string, data: any) =>
  elevatedGenericFetch('PUT', url, data);
const elevatedDeleteFetch = (url: string, id: any) => {
  return fetch(`${url}${id}`, {
    headers: {
      AccessToken: `Bearer ${store.getState().oidc.user.access_token}`,
      Authorization: `Bearer ${store.getState().oidc.user.id_token}`,
    },
    method: 'DELETE',
  });
};

export const elevatedPostJson = (url: string, data: any) => {
  return elevatedPostFetch(url, data)
    .then(response => response.ok
      ? response.json()
      : false)
    .catch(() => false);
};

export const elevatedPutJson = (url: string, data: any) => {
  return elevatedPutFetch(url, data)
    .then(response => response.ok
      ? response.json()
      : false)
    .catch(() => false);
};

export const elevatedDeleteJson = (url: string, id: any) => {
  return elevatedDeleteFetch(url, id)
    .then(response => response.ok
      ? response.json()
      : false)
    .catch(() => false);
};

export const elevatedGetJson = (url: string) => fetch(url, {
  headers: {
    AccessToken: `Bearer ${store.getState().oidc.user.access_token}`,
    Authorization: `Bearer ${store.getState().oidc.user.id_token}`,
  },
})
  .then(response => response.ok
    ? response.json()
    : false)
  .catch(() => false);
