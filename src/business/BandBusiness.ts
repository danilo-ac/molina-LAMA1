import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { Band } from "../model/Band";
import { User, UserRole } from "../model/User";

import { BandDataBase } from "../data/BandDataBase";

export class BandBusiness {


    constructor(
        private bandDataBase: BandDataBase,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ) { }



    async registerBand(
        name: string,
        musicGenre: string,
        responsible: string,
        token: string
    ) {

        if (!name || !musicGenre || !responsible) {
            throw new Error(" Parâmetros faltando ")
        }
        // const autheticator = new Authenticator()

        const tokenData = this.authenticator.getData(token)

        if (tokenData.role !== UserRole.ADMIN) {
            throw new Error("Somente adm pode adicionar banda")
        }
        const id = this.idGenerator.generate()

        const band: Band = {
            id: id,
            name: name,
            musicGenre: musicGenre,
            responsible: responsible
        }

        await this.bandDataBase.registerBand(band)

        return "Band adicionada!"
    }



    async getBandById(
        id: string
    ) {

        const band = await this.bandDataBase.getBandById(id)

        if (band.length === 0) {
            throw new Error("Id não existente!")
        }

        return band
    }
}