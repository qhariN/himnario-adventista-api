import { Request, Response } from "express";
import { prisma } from '../prisma';

export default class HymnController {

    static getHymnHistoryByNumber = async (req: Request, res: Response) => {
        let { id } = req.params
        const hymn = await prisma.hymn.findFirst({
            select: {
                id: true,
                number: true,
                title: true,
                mp3Url: true,
                mp3Filename: true
            },
            where: {
                number: Number(id)
            }
        })
        const history = await prisma.history.findMany({
            select: {
                position: true,
                verse: {
                    select: {
                        number: true,
                        content: true
                    }
                }
            },
            where: {
                verse: {
                    hymn: {
                        id: hymn.id
                    }
                }
            },
            orderBy: {
                position: "asc",
            }
        })
        res.send({ hymn: hymn, history: history })
    }

    // SELECT H.number as hymn, H.title, V.number, Y.position, V.content FROM history Y
    //     LEFT JOIN verse V ON Y.verseId = V.id
    //     LEFT JOIN hymn H ON V.hymnId = H.id
    // WHERE H.number = 8
    // ORDER BY H.number, Y.position;
}