import { createUserManager } from 'redux-oidc';
import { DATAPORTEN_CLIENT_ID } from '../config';

// Configuration for dataporten with the properties it need.
const userManagerConfig = {
  authority: 'https://auth.dataporten.no',
  automaticSilentRenew: false,
  client_id: DATAPORTEN_CLIENT_ID,
  filterProtocolClaims: true,
  loadUserInfo: false,
  redirect_uri: `${window.location.protocol}//` +
    `${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
  response_type: 'code',
  scope: 'email openid profile userid userid-feide groups longterm',
  silent_redirect_uri: `${window.location.protocol}//` +
    `${window.location.hostname}${window.location.port
      ? `:${window.location.port}` : ''
    } / silent_renew.html`,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
