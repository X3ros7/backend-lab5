import { Injectable } from '@nestjs/common';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { ProductsService } from '../products.service';
import { Product } from '../products.entity';

@Injectable()
export class ProductsSeeder implements Seeder {
  constructor(private readonly productsService: ProductsService) {}

  async seed(): Promise<any> {
    const products = DataFactory.createForClass(Product).generate(10);
    return this.productsService.createMany(products);
  }

  async drop(): Promise<any> {
    return this.productsService.removeAll();
  }
}
