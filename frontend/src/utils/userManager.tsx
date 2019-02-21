import { createUserManager } from 'redux-oidc';
import { DATAPORTEN_CLIENT_ID } from '../.secrets';

const userManagerConfig = {
  authority: 'https://auth.dataporten.no',
  automaticSilentRenew: true,
  client_id: DATAPORTEN_CLIENT_ID,
  filterProtocolClaims: true,
  loadUserInfo: true,
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
  response_type: 'id_token token',
  scope: 'email openid profile userid userid-feide',
  silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
