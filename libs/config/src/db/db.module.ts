import { Module } from '@nestjs/common';
import { DbConfigService } from './db.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [DbConfigService],
  exports: [DbConfigService],
})
export class DbConfigModule {}
