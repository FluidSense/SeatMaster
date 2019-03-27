import Oidc from 'oidc-client';
import { createUserManager } from 'redux-oidc';
import { DATAPORTEN_CLIENT_ID } from '../config';

// Configuration for dataporten with the properties it need.
const userManagerConfig = {
  authority: 'https://auth.dataporten.no',
  client_id: DATAPORTEN_CLIENT_ID,
  filterProtocolClaims: true,
  loadUserInfo: true,
  redirect_uri: `${window.location.protocol}//` +
    `${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
  response_type: 'id_token token',
  scope: 'email openid profile userid userid-feide groups',
  userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
