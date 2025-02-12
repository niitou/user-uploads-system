import { File } from "src/modules/file/entities/file.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable : false})
    username : string

    @OneToOne(() => User, (user) => user.profile, {onDelete : "SET NULL"})
    @JoinColumn({name : "user_id"})
    user : User

    @OneToOne(() => File, (file) => file.profile, {onDelete : "CASCADE"})
    @JoinColumn({name: 'avatar'})
    file : File

    @CreateDateColumn()
    created_at

    @UpdateDateColumn()
    updated_at
}
