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
        if (hymn) {
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
        } else {
            res.status(404).send({ message: 'Hymn not found' })
        }
    }
}