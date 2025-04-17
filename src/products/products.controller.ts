import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  NotFoundException,
  Put,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.entity';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-products.dto';
import { Roles } from 'nest-keycloak-connect';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Roles({ roles: ['ProductsApiViewer'] })
  index(@Query('page') page: number, @Query('limit') limit: number) {
    return this.productsService.paginate({
      limit: limit,
      page: page,
      route: 'http://localhost:3000/products',
    });
  }

  @Post()
  @Roles({ roles: ['ProductsApiWriter'] })
  store(@Body() productData: CreateProductDto): Promise<Product> {
    return this.productsService.create(productData);
  }

  @Get(':id')
  @Roles({ roles: ['ProductsApiViewer'] })
  show(@Param('id') id: number): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @Roles({ roles: ['ProductsApiWriter'] })
  update(
    @Param('id') id: number,
    @Body() productData: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, productData);
  }

  @Delete(':id')
  @Roles({ roles: ['ProductsApiWriter'] })
  delete(@Param('id') id: number): void {
    const deleted = this.productsService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Product #${id} not found`);
    }
  }
}
