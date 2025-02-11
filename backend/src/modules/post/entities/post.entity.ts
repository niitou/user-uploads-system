import { File } from "src/modules/file/entities/file.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id : number

    @Column({nullable : false})
    title : string

    @Column({type : "text"})
    description

    @OneToMany(() => File, (file) => file.post, {cascade : true})
    files : File[]

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({name : 'user_id'})
    user : User

    @CreateDateColumn()
    created_at

    @UpdateDateColumn()
    updated_at
}
