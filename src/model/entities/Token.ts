import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User'

@Entity({ name: "tokens" })
export class Token extends BaseEntity {
    @Column()
    value: string;

    @ManyToOne(type => User, user => user.tokens)
    user: User;
}