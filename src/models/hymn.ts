import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Version } from "./version";
import { Verse } from "./verse";

@Entity()
export class Hymn {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    number: number

    @Column({ nullable: false })
    title: string

    @ManyToOne(type => Version, version => version.hymn, { nullable: false })
    version: Version

    @OneToMany(type => Verse, verse => verse.hymn)
    verse: Verse[]

}