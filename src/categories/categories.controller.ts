import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Put,
  Query,
  Param,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Category } from './category.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateResult } from 'typeorm';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  index(@Query('page') page: number, @Query('limit') limit: number) {
    return this.categoriesService.paginate({
      limit: limit,
      page: page,
      route: 'http://localhost:3000/categories',
    });
  }

  @Post()
  store(@Body() categoryData: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(categoryData);
  }

  @Get(':id/products')
  products(
    @Param('id') id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.categoriesService.findProducts(id, {
      page,
      limit,
      route: `http://localhost:3000/categories/${id}/products`,
    });
  }

  @Get(':id')
  show(@Param('id') id: number): Promise<Category | null> {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() categoryData: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, categoryData);
  }

  @Delete(':id')
  delete(id: number): void {
    const deleted = this.categoriesService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Category #${id} not found`);
    }
  }
}
