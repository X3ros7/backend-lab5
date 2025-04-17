import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Factory } from 'nestjs-seeder';
import { hash } from 'bcrypt';
import { Product } from '../products/products.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Factory(() => {
    const randomString = Math.random().toString(36).substring(2, 15);
    return `Category ${randomString}`;
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
    const randomString = Math.random().toString(36).substring(2, 15);
    return `https://picsum.photos/200/300?random=${randomString}`;
  })
  image: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @OneToMany(() => Product, (product) => product.categories)
  products: Product[];
}
