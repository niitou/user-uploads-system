import { User } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    username: string

    @OneToOne(() => User, (user) => user.profile, { onDelete: "CASCADE" }) // Delete profile if user is deleted
    @JoinColumn({ name: "user_id" })
    user: User

    @Column({ nullable: true })
    avatar: string

    @CreateDateColumn()
    created_at

    @UpdateDateColumn()
    updated_at
}
