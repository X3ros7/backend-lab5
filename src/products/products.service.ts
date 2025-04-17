import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Product } from './products.entity';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { paginate } from 'nestjs-typeorm-paginate';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
  ) {}

  public create(productData: CreateProductDto): Promise<Product> {
    return this.repository.save(productData);
  }

  public createMany(products: Partial<Product>[]): Promise<Product[]> {
    return this.repository.save(products);
  }

  public findAll(): Promise<Product[]> {
    return this.repository.find();
  }

  public async update(
    id: number,
    productData: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return this.repository.save({ ...product, ...productData });
  }

  public findOne(id: number): Promise<Product | null> {
    return this.repository.findOneBy({ id });
  }

  public remove(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  public async paginate(options: IPaginationOptions) {
    const { items, meta, links } = await paginate<Product>(
      this.repository,
      options,
    );
    return { data: items, meta, links };
  }

  public removeAll(): Promise<DeleteResult> {
    return this.repository.delete({});
  }
}
