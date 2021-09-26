import { UserBusiness } from "../src/business/UserBusiness"
import { UserInputDTO } from "../src/model/User"
import { Authenticator } from "./mocks/Authenticator"
import EmailValidation from "./mocks/EmailValidation"
import { HashManager } from "./mocks/HashManager"
import { IdGeneratorMock } from "./mocks/idGenerator"
import { UserDataBaseMock } from "./mocks/userDataBase"


describe("Cadastro", () => {


    test("Sucesso ao criar usuario", async () => {

        expect.assertions(1)

        const userDataMock = new UserDataBaseMock()
        const hashManager = new HashManager()
        const authenticator = new Authenticator()
        const idGenerator = new IdGeneratorMock()
        const emailValidation = new EmailValidation()
        const userBusiness = new UserBusiness(userDataMock, authenticator, hashManager, idGenerator, emailValidation)

        try {

            const result: any = await userBusiness.createUser({
                name: "matheus",
                email: "mateheu@jdjdjd.com",
                password: "123456",
                role: "ADMIN"
            })

            expect(result).toBeDefined()

        } catch (err) {
            console.error(err)
        }

    })


    test("Retorna erro quando email estiver vazio", async () => {

        expect.assertions(1)

        const userDataMock = new UserDataBaseMock()
        const hashManager = new HashManager()
        const authenticator = new Authenticator()
        const idGenerator = new IdGeneratorMock()
        const emailValidation = new EmailValidation()

        try {
            const userBusiness = new UserBusiness(userDataMock, authenticator, hashManager, idGenerator, emailValidation)
            await userBusiness.createUser({
                name: "matheus",
                email: "",
                password: "123456",
                role: "ADMIN"
            })

        } catch (error) {
            expect(error.message).toEqual("Empty 'Email'")
        }
    })


    test("Retorna erro quando email é inválido", async () => {

        expect.assertions(1)

        const userDataMock = new UserDataBaseMock()
        const hashManager = new HashManager()
        const authenticator = new Authenticator()
        const idGenerator = new IdGeneratorMock()
        const emailValidation = new EmailValidation()
        const userBusiness = new UserBusiness(userDataMock, authenticator, hashManager, idGenerator, emailValidation)

        try {

            const result: any = await userBusiness.createUser({
                name: "matheus",
                email: "mateheu@jdjdjd",
                password: "123456",
                role: "ADMIN"
            })

        } catch (err) {
            expect(err.message).toEqual("Invalid 'Email'")
        }

    })


    test("Retorna erro quando 'role' é diferente de 'admin' ou 'normal'", async () => {

        expect.assertions(1)

        const userDataMock = new UserDataBaseMock()
        const hashManager = new HashManager()
        const authenticator = new Authenticator()
        const idGenerator = new IdGeneratorMock()
        const emailValidation = new EmailValidation()
        const userBusiness = new UserBusiness(userDataMock, authenticator, hashManager, idGenerator, emailValidation)

        try {

            const result: any = await userBusiness.createUser({
                name: "matheus",
                email: "mateheu@jdjdjd.com",
                password: "123456",
                role: "1"
            } as UserInputDTO)

        } catch (err) {
            expect(err.message).toEqual("'Role' must be 'admin' or 'normal'")
        }

    })

    test("Retorna erro quando 'password' está ausente ou vazia", async () => {

        expect.assertions(2)

        const userDataMock = new UserDataBaseMock()
        const hashManager = new HashManager()
        const authenticator = new Authenticator()
        const idGenerator = new IdGeneratorMock()
        const emailValidation = new EmailValidation()
        const userBusiness = new UserBusiness(userDataMock, authenticator, hashManager, idGenerator, emailValidation)

        try {

            const result: any = await userBusiness.createUser({
                name: "matheus",
                email: "mateheu@jdjdjd.com",
                role: "admin"
            } as UserInputDTO)

        } catch (err) {
            expect(err.message).toEqual("Empty 'Password'")
        }

        try {

            const result: any = await userBusiness.createUser({
                name: "matheus",
                email: "mateheu@jdjdjd.com",
                password: "",
                role: "admin"
            } as UserInputDTO)

        } catch (err) {
            expect(err.message).toEqual("Empty 'Password'")
        }

    })

})