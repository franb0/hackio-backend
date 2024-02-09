import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product';
import { User } from './user';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => Product)
    product!: Product;

    @Column()
    quantity!: number;
}
