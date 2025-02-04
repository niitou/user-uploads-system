import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number

    @Column({unique : true})
    username : string

    @Column()
    password: string

    // @Column()
    // avatar : string

    @CreateDateColumn()
    created_at

    @UpdateDateColumn()
    updated_at
}
