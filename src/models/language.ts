import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Version } from "./version";

@Entity()
export class Language {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string

    @OneToMany(type => Version, version => version.language)
    version: Version[]

}