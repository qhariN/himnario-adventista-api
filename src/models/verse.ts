import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Hymn } from "./hymn";
import { History } from "./history";

@Entity()
export class Verse {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    number: number

    @Column({ nullable: false })
    content: string

    @ManyToOne(type => Hymn, hymn => hymn.verse, { nullable: false })
    hymn: Hymn

    @OneToMany(type => History, history => history.verse)
    history: History[]

}