import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Language } from "./language";
import { Hymn } from "./hymn";

@Entity()
export class Version {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string

    @ManyToOne(type => Language, language => language.version, { nullable: false })
    language: Language

    @OneToMany(type => Hymn, hymn => hymn.version)
    hymn: Hymn[]

}