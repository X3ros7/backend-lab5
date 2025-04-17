import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import {
  DbConfigService,
  DbConfigModule,
  KeycloakConfigModule,
  KeycloakConfigService,
} from '@lab/config';
import { AppConfigModule, AppConfigService } from '@lab/config';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [DbConfigModule],
      useFactory: (config: DbConfigService) => ({
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [DbConfigService],
    }),
    CategoriesModule,
    ProductsModule,
    // KeycloakConnectModule.register({
    //   authServerUrl: 'http://localhost:8090/auth',
    //   realm: 'backend_examples_lab5',
    //   clientId: 'products-app',
    //   secret: '95hQgbSE8CBzJEokbxuFlq7A77hL27fa',
    // }),
    KeycloakConnectModule.registerAsync({
      imports: [KeycloakConfigModule],
      useFactory: (config: KeycloakConfigService) => ({
        authServerUrl: config.authServerUrl,
        realm: config.realm,
        clientId: config.clientId,
        secret: config.secret,
      }),
      inject: [KeycloakConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
