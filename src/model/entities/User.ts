import { Entity, Column, OneToMany, ManyToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Token } from './Token';
import { Product } from './Product';


@Entity({ name: "users" })
export class User extends BaseEntity {
    
    @Column()
    email: string;

    @OneToMany(type => Token, token => token.user, {
        cascade: true
    })
    tokens: Token[];
}