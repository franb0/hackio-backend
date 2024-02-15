import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product';
import { User } from './user';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user: number;

    @Column()
    product: number;

    @Column()
    quantity: number;

    constructor(user: number, product: number, quantity: number) {
        this.user = user;
        this.product = product;
        this.quantity = quantity;
    }
}
