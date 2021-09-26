import ShowBusiness from "../src/business/ShowBusiness/ShowBusiness"
import CustomError from "../src/error/CustomError"
import { createShowDTO } from "../src/model/Show"
import { Authenticator } from "./mocks/Authenticator"
import { IdGeneratorMock } from "./mocks/idGenerator"
import SQLShowDatabase from "./mocks/ShowDatabase/SQLShowDatabase"
import SQLShowDatabase2 from "./mocks/ShowDatabase/SQLShowDatabase2"

describe("Conjunto de testes para o endpoint de 'Show'", () => {



    test("Sucesso ao criar um show, retornando um 'showId' ", async () => {

        expect.assertions(1)

        const mockShowDatabase = new SQLShowDatabase()
        const mockauthenticator = new Authenticator()
        const mockIdGenerator = new IdGeneratorMock()
        const showBusiness = new ShowBusiness(mockShowDatabase, mockauthenticator, mockIdGenerator)

        const mockCreateShowDTO: createShowDTO = {
            bandId: "11",
            weekDay: "sábado",
            startTime: 22,
            endTime: 23
        }
        const mockToken = "token"

        try {

            const res = await showBusiness.createShow(mockCreateShowDTO, mockToken)

            expect(res).toEqual({ showId: 1 })

        } catch (err: any | CustomError) {
            err
        }

    });



    test("Erro ao criar um show com 'Body Request' de 'keys' inválidas", async () => {

        expect.assertions(1)

        const mockShowDatabase = new SQLShowDatabase()
        const mockauthenticator = new Authenticator()
        const mockIdGenerator = new IdGeneratorMock()
        const showBusiness = new ShowBusiness(mockShowDatabase, mockauthenticator, mockIdGenerator)

        const mockCreateShowDTO: any = {
            aUhsiahudaiuhd: "1",
            week_Day: "sábado",
            start_Time: 7,
            end_Time: 8
        }
        const mockToken = "token"

        try {

            const res = await showBusiness.createShow(mockCreateShowDTO, mockToken)

        } catch (err: any | CustomError) {

            expect(err.message).toEqual(
                "Invalid or missing key"
            )

        }

    });



    test("Erro ao criar um show com 'bandId' inválido", async () => {

        expect.assertions(1)

        const mockShowDatabase = new SQLShowDatabase2()
        const mockauthenticator = new Authenticator()
        const mockIdGenerator = new IdGeneratorMock()
        const showBusiness = new ShowBusiness(mockShowDatabase, mockauthenticator, mockIdGenerator)

        const mockCreateShowDTO: any = {
            bandId: "x",
            weekDay: "sábado",
            startTime: 8,
            endTime: 9
        }
        const mockToken = "token"

        try {

            const res = await showBusiness.createShow(mockCreateShowDTO, mockToken)

        } catch (err: any | CustomError) {

            expect(err.tips).toEqual(
                "ID of 'bandId' is invalid"
            )

        }

    });


    test("Erro ao criar um show com 'Body Request' com 'keys' ausentes", async () => {

        expect.assertions(2)

        const mockShowDatabase = new SQLShowDatabase()
        const mockauthenticator = new Authenticator()
        const mockIdGenerator = new IdGeneratorMock()
        const showBusiness = new ShowBusiness(mockShowDatabase, mockauthenticator, mockIdGenerator)

        const mockCreateShowDTO: any = {
            weekDay: "sábado",
            startTime: 7,
            endTime: 8
        }
        const mockToken = "token"

        try {

            const res = await showBusiness.createShow(mockCreateShowDTO, mockToken)

        } catch (err: any | CustomError) {

            expect(err.message).toEqual("Invalid or missing key")
            expect(err.tips).toEqual(
                [
                    "Is expected 'bandId', 'weekDay', 'startTime', 'endTime' keys",
                    "'bandId: string format",
                    "'weekDay': string 'sexta', 'sábado' or 'domingo' value",
                    "'startTime': number between '8' up to '22', and only intergers numbers",
                    "'endTime': number between '9' up to '23', and only intergers numbers"
                ]
            )

        }

    });


    test("Erro ao criar um show com horário fora do intervalo 8h-23h", async () => {

        expect.assertions(1)

        const mockShowDatabase = new SQLShowDatabase()
        const mockauthenticator = new Authenticator()
        const mockIdGenerator = new IdGeneratorMock()
        const showBusiness = new ShowBusiness(mockShowDatabase, mockauthenticator, mockIdGenerator)

        const mockCreateShowDTO: createShowDTO = {
            bandId: "1",
            weekDay: "sábado",
            startTime: 7,
            endTime: 8
        }
        const mockToken = "token"

        try {

            const res = await showBusiness.createShow(mockCreateShowDTO, mockToken)

        } catch (err: any | CustomError) {

            expect(err.tips).toEqual(
                "'startTime': number between '8' up to '22', and only intergers numbers"
            )

        }

    });



    test("Erro ao criar um show com horário não inteiro, ex.: 8.30h", async () => {

        expect.assertions(1)

        const mockShowDatabase = new SQLShowDatabase()
        const mockauthenticator = new Authenticator()
        const mockIdGenerator = new IdGeneratorMock()
        const showBusiness = new ShowBusiness(mockShowDatabase, mockauthenticator, mockIdGenerator)

        const mockCreateShowDTO: createShowDTO = {
            bandId: "1",
            weekDay: "sábado",
            startTime: 8.3,
            endTime: 9
        }
        const mockToken = "token"

        try {

            const res = await showBusiness.createShow(mockCreateShowDTO, mockToken)

        } catch (err: any | CustomError) {

            expect(err.tips).toEqual(
                "'startTime': number between '8' up to '22', and only intergers numbers"
            )

        }

    });



    test("Erro ao criar um show já existente no mesmo dia de evento", async () => {

        expect.assertions(1)

        const mockShowDatabase = new SQLShowDatabase()
        const mockauthenticator = new Authenticator()
        const mockIdGenerator = new IdGeneratorMock()
        const showBusiness = new ShowBusiness(mockShowDatabase, mockauthenticator, mockIdGenerator)

        const mockCreateShowDTO: createShowDTO = {
            bandId: "1",
            weekDay: "sábado",
            startTime: 22,
            endTime: 23
        }
        const mockToken = "token"

        try {

            const res = await showBusiness.createShow(mockCreateShowDTO, mockToken)

            console.log(res)

        } catch (err: any | CustomError) {

            expect(err.tips.message).toEqual(
                "Show already scheduled in same date"
            )

        }

    });



    test("Erro ao criar um show que tem conflito de horário com outro show", async () => {

        expect.assertions(1)

        const mockShowDatabase = new SQLShowDatabase()
        const mockauthenticator = new Authenticator()
        const mockIdGenerator = new IdGeneratorMock()
        const showBusiness = new ShowBusiness(mockShowDatabase, mockauthenticator, mockIdGenerator)

        const mockCreateShowDTO: createShowDTO = {
            bandId: "11",
            weekDay: "sábado",
            startTime: 8,
            endTime: 10
        }
        const mockToken = "token"

        try {

            const res = await showBusiness.createShow(mockCreateShowDTO, mockToken)

        } catch (err: any | CustomError) {

            expect(err.tips.message).toEqual(
                "There is a schedule conflict"
            )

        }

    });


    test("Sucesso ao listar shows de um dos dias de evento", async () => {

        expect.assertions(3)

        const mockShowDatabase = new SQLShowDatabase()
        const mockauthenticator = new Authenticator()
        const mockIdGenerator = new IdGeneratorMock()
        const showBusiness = new ShowBusiness(mockShowDatabase, mockauthenticator, mockIdGenerator)


        try {

            const res = await showBusiness.getShowByWeekDay("domingo")

            expect(res.length).toBeGreaterThanOrEqual(0)

        } catch (err: any | CustomError) {
            err
        }

        try {

            const res = await showBusiness.getShowByWeekDay("sábado")

            expect(res.length).toBeGreaterThanOrEqual(0)

        } catch (err: any | CustomError) {
            err
        }

        try {

            const res = await showBusiness.getShowByWeekDay("sexta")

            expect(res.length).toBeGreaterThanOrEqual(0)

        } catch (err: any | CustomError) {
            err
        }

    });


    test("Erro ao listar shows fora dos dias de evento", async () => {

        expect.assertions(2)

        const mockShowDatabase = new SQLShowDatabase()
        const mockauthenticator = new Authenticator()
        const mockIdGenerator = new IdGeneratorMock()
        const showBusiness = new ShowBusiness(mockShowDatabase, mockauthenticator, mockIdGenerator)


        try {

            const res = await showBusiness.getShowByWeekDay("quinta")

        } catch (err: any | CustomError) {
            
            expect(err.message).toEqual("Invalid or Missing Value")   
            expect(err.tips).toEqual("'weekDay': 'sexta', 'sábado' or 'domingo' string value")
        
        }

    });


})