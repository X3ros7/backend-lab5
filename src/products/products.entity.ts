import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../categories/category.entity';
import { Factory } from 'nestjs-seeder';
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Factory(() => {
    const randomString = Math.random().toString(36).substring(2, 15);
    return `Product ${randomString}`;
  })
  name: string;

  @Column()
  @Factory(() => {
    const randomString = Math.random().toString(36).substring(2, 15);
    return `Description ${randomString}`;
  })
  description: string;

  @Column()
  @Factory(() => {
    return Math.floor(Math.random() * 100);
  })
  price: number;

  @Column()
  @Factory(() => {
    return `https://via.placeholder.com/150`;
  })
  image: string;

  @Column({ name: 'category_id' })
  @Factory(() => {
    return 1;
  })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  categories: Category[];
}
