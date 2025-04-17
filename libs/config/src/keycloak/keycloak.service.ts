import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeycloakConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get authServerUrl(): string {
    return this.configService.getOrThrow('keycloak.authServerUrl');
  }

  public get realm(): string {
    return this.configService.getOrThrow('keycloak.realm');
  }

  public get clientId(): string {
    return this.configService.getOrThrow('keycloak.clientId');
  }

  public get secret(): string {
    return this.configService.getOrThrow('keycloak.secret');
  }
}
