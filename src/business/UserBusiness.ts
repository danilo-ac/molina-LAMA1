import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { UserDataBaseMock } from "../../tests/mocks/userDataBase";
import EmailValidation from "../services/EmailValidation";

export class UserBusiness {
    constructor(
        private userDataBase: UserDatabase,
        private authenticator: Authenticator,
        private hashManager: HashManager,
        private idGenerator: IdGenerator,
        private emailValidation: EmailValidation
    ) { }


    async createUser(user: UserInputDTO) {

        if (!user.email) {
            throw new Error("Empty 'Email'")
        } else if (
            !this.emailValidation.isValidEmail(user.email)
        ) {
            throw new Error("Invalid 'Email'")
        }

        if (!user.password) {
            throw new Error("Empty 'Password'")
        }

        if (!user.name) {
            throw new Error("Empty 'Name'")
        }

        if (!user.role) {
            throw new Error("Empty 'Role'")
        } else if (!["ADMIN", "NORMAL"]
            .includes(user.role.toLocaleUpperCase().trim())) {
            throw new Error("'Role' must be 'admin' or 'normal'")
        }


        const id = this.idGenerator.generate();

        user.role = user.role.toUpperCase().trim()

        const hashPassword = await this.hashManager.hash(user.password);
        await this.userDataBase.createUser(id, user.email, user.name, hashPassword, user.role);


        const accessToken = this.authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }


    async getUserByEmail(user: LoginInputDTO) {

        if (!user.email) {
            throw new Error("Empty 'Email'")
        } else if (
            !this.emailValidation.isValidEmail(user.email)
        ) {
            throw new Error("Invalid 'Email'")
        }

        const userFromDB = await this.userDataBase.getUserByEmail(user.email);


        if (!user.password) {
            throw new Error("Empty 'Password'")
        }

        const hashCompare = await this.hashManager.compare(user.password, userFromDB.getPassword());

        const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;
    }
}