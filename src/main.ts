import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService, KeycloakConfigService } from '@lab/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfigService);
  const keycloakConfig = app.get(KeycloakConfigService);
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('The products API description')
    .setVersion('1.0')
    .addOAuth2({
      type: 'oauth2',
      flows: {
        clientCredentials: {
          tokenUrl: `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
          scopes: {},
        },
        authorizationCode: {
          authorizationUrl: `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/auth`,
          tokenUrl: `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
          scopes: {},
        },
      },
    })
    .addSecurityRequirements('oauth2')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      oauth2RedirectUrl: 'http://localhost:3000/api/oauth2-redirect.html',
      persistAuthorization: true,
      initOAuth: {
        clientId: keycloakConfig.clientId,
        usePkceWithAuthorizationCodeGrant: true,
      },
    },
    explorer: true,
    customSiteTitle: 'Products API',
  });

  await app.listen(config.port);
  console.log(`Server is running on ${config.host}:${config.port}`);
}
bootstrap();
