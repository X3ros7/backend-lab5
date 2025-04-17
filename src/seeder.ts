import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { DbConfigModule, DbConfigService } from '../libs/config/src';
import { CategoriesSeeder } from './categories/seeders/categories.seeder';
import { ProductsSeeder } from './products/seeders/products.seeder';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

seeder({
  imports: [
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
  ],
}).run([CategoriesSeeder, ProductsSeeder]);
