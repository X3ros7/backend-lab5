import { registerAs } from '@nestjs/config';
import { env } from 'node:process';

export default registerAs('app', () => ({
  port: env.APP_PORT || 3000,
  host: env.APP_HOST || 'localhost',
}));
