import { File } from "src/modules/file/entities/file.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable : false})
    username : string

    @OneToOne(() => User, (user) => user.profile)
    user : User

    @OneToOne(() => File, (file) => file.profile)
    @JoinColumn({name: 'avatar'})
    file : File

    @CreateDateColumn()
    created_at

    @UpdateDateColumn()
    updated_at
}
