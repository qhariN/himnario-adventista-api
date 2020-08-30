import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Verse } from "./verse";

@Entity()
export class History {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    position: number

    @ManyToOne(type => Verse, verse => verse.history, { nullable: false })
    verse: Verse

}