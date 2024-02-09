import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 20
    })
    username: string

    @Column({
        length: 50
    })
    email: string

    @Column({
        length: 50
    })
    password: string

    constructor(usuario: string, email: string, password: string) {
        this.username = usuario;
        this.email = email;
        this.password = password;
    }
}