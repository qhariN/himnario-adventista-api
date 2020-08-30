import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { History } from "../models/history";
import { Hymn } from "../models/hymn";

export default class HymnController {

    static getHymnHistory = async (req: Request, res: Response) => {
        let { id } = req.params
        let hymn: Hymn
        let history: History[]
        const repositoryH = getRepository(Hymn)
        const repositoryY = getRepository(History)
        try {
            hymn = await repositoryH.createQueryBuilder('hymn')
                .where('hymn.number = :id', { id: id })
                .getOne()
            history = await repositoryY.createQueryBuilder('history')
                .leftJoinAndSelect('history.verse', 'verse')
                .leftJoinAndSelect('verse.hymn', 'hymn')
                .select(['verse.number', 'history.position', 'verse.content'])
                .where('hymn.number = :id', { id: id })
                .orderBy('history.position', 'ASC')
                .getMany()
        } catch (error) {
            res.status(401).send()
        }
        res.send({ hymn: hymn, history: history })
    }

    // SELECT H.number as hymn, H.title, V.number, Y.position, V.content FROM history Y
    //     LEFT JOIN verse V ON Y.verseId = V.id
    //     LEFT JOIN hymn H ON V.hymnId = H.id
    // WHERE H.number = 8
    // ORDER BY H.number, Y.position;
}