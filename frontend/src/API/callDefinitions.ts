type fetchTypes = 'POST' | 'PUT' | 'DELETE';

const genericFetch = (fetchType: fetchTypes, url: string, data: any) => {
  return fetch(url, {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    method: fetchType,
  });
};

const postFetch = (url: string, data: any) => genericFetch('POST', url, data);
const putFetch = (url: string, data: any) => genericFetch('PUT', url, data);
const deleteFetch = (url: string, id: any, additionalId?: any) => {
  if (!additionalId) {
    return fetch(`${url}${id}`, {
      method: 'DELETE',
    });
  } else {
    return fetch(`${url}${id}/${additionalId}`, {
      method: 'DELETE',
    });
  }
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

export const deleteJson = (url: string, id: any, additionalId?: any) => {
  if (!additionalId) {
    return deleteFetch(url, id)
      .then(response => response.ok
        ? response.json()
        : false);
  } else {
    return deleteFetch(url, id, additionalId)
      .then(response => response.ok
        ? {}
        : false);
  }
};

export const getJson = (url: string) => fetch(url).then(response => response.ok
  ? response.json()
  : false);
