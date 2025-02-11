import { Post } from "src/modules/post/entities/post.entity";
import { Profile } from "src/modules/profile/entities/profile.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable : false})
    filename : string

    @OneToOne(() => Profile, (profile) => profile.file)
    profile : Profile

    @ManyToOne(() => Post, (post) => post.files)
    @JoinColumn({name : "post_id"})
    post : Post

    @CreateDateColumn()
    created_at

    @UpdateDateColumn()
    updated_at
}