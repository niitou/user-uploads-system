import { Post } from "src/modules/post/entities/post.entity";
import { Profile } from "src/modules/profile/entities/profile.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, nullable: false })
    username: string

    @Column({ nullable: false })
    password: string

    @OneToOne(() => Profile, (profile) => profile.user, { cascade: true }) // Save profile if user is saved
    profile: Profile

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @CreateDateColumn()
    created_at

    @UpdateDateColumn()
    updated_at
}