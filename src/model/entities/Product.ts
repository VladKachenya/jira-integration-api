import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Project } from './Project'
import { User } from './User';

@Entity({ name: "products" })
export class Product extends BaseEntity {
    @Column()
    url: string;

    @OneToMany(type => Project, project => project.product, {
        cascade: true
    })
    projects: Project[];

    @ManyToMany(type => User, { 
        cascade: true 
    })
    @JoinTable()
    users: User[];
}