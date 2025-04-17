import { registerAs } from '@nestjs/config';
import { env } from 'node:process';

export default registerAs('keycloak', () => ({
  authServerUrl: env.KEYCLOAK_AUTH_SERVER_URL,
  realm: env.KEYCLOAK_REALM,
  clientId: env.KEYCLOAK_CLIENT_ID,
  secret: env.KEYCLOAK_SECRET,
}));
