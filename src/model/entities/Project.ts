import { Entity, Column, ManyToOne, ManyToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product'

@Entity({ name: "projects" })
export class Project extends BaseEntity {
    @Column()
    name: string;

    @Column()
    key: string;

    @Column()
    avatarUrl: string;

    @Column()
    projectType: string;

    @ManyToOne(type => Product, product => product.projects)
    product: Product;
}