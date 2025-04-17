import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('app.host')!;
  }

  get port(): number {
    return this.configService.get<number>('app.port')!;
  }
}
