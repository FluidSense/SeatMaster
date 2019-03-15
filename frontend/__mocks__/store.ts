import configureMockStore from 'redux-mock-store';
import { UserState } from 'redux-oidc';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStoreFunc = configureMockStore(middlewares);
const voidFunc = () => 'null';
const oidcToken: UserState = {
  isLoadingUser: false,
  user: {
    access_token: 'token',
    expired: false,
    expires_at: 100000,
    expires_in: 100000,
    id_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImIwMGE1MDYxY' +
      'zMxMTQxMjA5Y2RmMjlkYWM3NjYwMTkxMWI2N2M4YWQifQ.eyJpc3MiOiJodHRwczpcL1w' +
      'vYXV0aC5kYXRhcG9ydGVuLm5vIiwiYXVkIjoiNzdlZTMzY2QtY2M3Zi00YjdhLWJjZTktMjQ' +
      'xYzk2NDU4ZjE0Iiwic3ViIjoiOWYwYmE4OWQtZDkxZi00Y2FkLWE3MmYtOGNjNDc3ZTBjNmMzI' +
      'iwiaWF0IjoxNTUyNDcyOTEyLCJleHAiOjE1NTI0NzY1MTIsImF1dGhfdGltZSI6MTU1MjQ3MjkxM' +
      'n0.Ro_wwmkOvQY1T2XhiEwN88-rYtneVdkLzCWRn-lRhcL1jwR6TT6_W9Kr0fKLP06P2XIPiQ5wHkvD0Y' +
      'VzNS7uidq7I7RTSnnoZctMzV71mePQHVArkvhypZDt7MkOAYgyDj4XD-PJA7VoYTjJ-y54IFeM6SMmn-S' +
      'RKpTCUCxhz4bu_3zhu-DhljUHTsz1nCiUki2XssRX4DH7-KKO58kDikvHQ0hypB_CdWZ5Ge2gQEvHn2Yx5RUI' +
      'Cpbc5CGObGA0BpYd9-eEECgs0zAxZ72Y6-F7bddv1fmkkRHdxCP4E1WWNHF-blQbpnGodHuBF6XJE8ADzDZQl' +
      'ye_nz0tux2BWw',
    profile: 'profile',
    scope: 'scope',
    scopes: ['scopes'],
    session_state: 'session_state',
    state: 'state',
    toStorageString: voidFunc,
    token_type: 'token_type',
  },
};
const mockStore = mockStoreFunc({ oidc: oidcToken });

export default mockStore;
