import { tokenToString } from "typescript"
import { BandBusiness } from "../src/business/BandBusiness"
import { BandController } from "../src/controller/BandController"
import { Authenticator } from "./mocks/Authenticator"
import { BandDataBaseMock } from "./mocks/bandDataBase"
import { IdGeneratorMock } from "./mocks/idGenerator"

describe("Cadastrar banda", () => {


    
    test("Sucesso ao criar banda", async () => {
        const bandDataBaseMock = new BandDataBaseMock()
        const authenticator = new Authenticator()
        const idGenerator = new IdGeneratorMock() //1
        const bandBusiness = new BandBusiness(bandDataBaseMock, authenticator, idGenerator)
        const band = {
            name: "matheus",
            musicGenre: "samba",
            responsible: "djdjdj"
        }
        const result = await bandBusiness
            .registerBand(
                band.name,
                band.musicGenre,
                band.responsible,
                "token")

        expect(result).toEqual("Band adicionada!")

    })



    test("Erro ao criar banda com um valor vazio no 'Body Request'", async () => {
        const bandDataBaseMock = new BandDataBaseMock()
        const authenticator = new Authenticator()
        const idGenerator = new IdGeneratorMock() //1
        const bandBusiness = new BandBusiness(bandDataBaseMock, authenticator, idGenerator)
        const band = {
            name: "matheus",
            musicGenre: "",
            responsible: "djdjdj"
        }

        try {
            await bandBusiness
                .registerBand(
                    band.name,
                    band.musicGenre,
                    band.responsible,
                    "token")

        } catch (error) {
            expect(error.message).toEqual(" Parâmetros faltando ")
        }

    })
})