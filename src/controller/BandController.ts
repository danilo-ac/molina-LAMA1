import { Request, Response } from "express";
import { tokenToString } from "typescript";
import { BandBusiness } from "../business/BandBusiness";
import { BandDataBase } from "../data/BandDataBase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";


export class BandController {

    constructor(private bandBusiness: BandBusiness) { }



    async registerBnad(req: Request, res: Response) {

        try {

            const { name, musicGenre, responsible } = req.body
            const token = req.headers.authorization

            await bandBusiness.registerBand(name, musicGenre, responsible, token)

            res.status(200).send("Band adicionada!")

        } catch (error) {
            res.status(500).send(error.message)
        }
    }



    async getBandById(req: Request, res: Response) {

        try {

            const id = req.params.id
            const result = await bandBusiness.getBandById(id)

            res.status(200).send(result)

        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}


const bandDataBase = new BandDataBase()
const authenticator = new Authenticator()
const idGenerator = new IdGenerator()
const bandBusiness = new BandBusiness(bandDataBase, authenticator, idGenerator)
const bandController = new BandController(bandBusiness)

export default bandController