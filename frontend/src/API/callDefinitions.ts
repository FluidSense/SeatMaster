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

export const postFetch = (url: string, data: any) => genericFetch('POST', url, data);
export const putFetch = (url: string, data: any) => genericFetch('PUT', url, data);
export const deleteFetch = (url: string, data: any) => genericFetch('DELETE', url, data);

export const postJson = (url: string, data: any) => {
  return postFetch(url, data).then(response => response.ok
  ? response.json()
  : Promise.reject());
};

export const getJson = (url: string) => fetch(url).then(response => response.ok
  ? response.json()
  : Promise.reject());
