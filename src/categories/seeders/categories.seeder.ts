import { Injectable } from '@nestjs/common';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { CategoriesService } from '../categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../category.entity';

@Injectable()
export class CategoriesSeeder implements Seeder {
  constructor(private readonly categoriesService: CategoriesService) {}

  async seed(): Promise<any> {
    const categories = DataFactory.createForClass(Category).generate(10);
    return this.categoriesService.createMany(categories);
  }

  async drop(): Promise<any> {
    return this.categoriesService.removeAll();
  }
}
