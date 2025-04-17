import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { DeleteResult, Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Product } from '../products/products.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}

  public create(categoryData: CreateCategoryDto): Promise<Category> {
    return this.repository.save(categoryData);
  }

  public createMany(categories: Partial<Category>[]): Promise<Category[]> {
    return this.repository.save(categories);
  }

  public findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  public findOne(id: number): Promise<Category | null> {
    return this.repository.findOneBy({ id });
  }

  public async findProducts(id: number, options: IPaginationOptions) {
    const { items, meta, links } = await paginate<Category>(
      this.repository,
      options,
      {
        where: {
          id,
        },
        relations: ['products'],
      },
    );
    const products = items.flatMap((item) => item.products);
    return { data: products, meta, links };
  }

  public async update(
    id: number,
    categoryData: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return this.repository.save({ ...category, ...categoryData });
  }

  public remove(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  public async paginate(options: IPaginationOptions) {
    const { items, meta, links } = await paginate<Category>(
      this.repository,
      options,
    );
    return { data: items, meta, links };
  }

  public removeAll(): Promise<DeleteResult> {
    return this.repository.delete({});
  }
}
