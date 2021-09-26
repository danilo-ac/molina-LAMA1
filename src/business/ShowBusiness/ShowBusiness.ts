import CustomError from "../../error/CustomError"
import { createShowDTO, resultDatabaseModel, ShowsAgenda } from "../../model/Show"
import { Authenticator, AuthenticationData } from "../../services/Authenticator"
import { IdGenerator } from "../../services/IdGenerator"
import ShowRepository from "./ShowRepository"

export default class ShowBusiness {

    constructor(
        private showDatabase: ShowRepository,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ) { }


    public async createShow(
        createShowDTO: createShowDTO,
        token: string
    ) {
        try {

            if (!token) {
                throw new CustomError(
                    "Missing Token",
                    406,
                    "Verify if token was send on request"
                );
            }

            const isValidToken: AuthenticationData = this.authenticator.getData(token)

            if (isValidToken.role !== "ADMIN") {
                throw new CustomError(
                    "Invalid Token",
                    406,
                    "Credential doesn't have enough permission to create a Show"
                );

            }

            if (
                [createShowDTO.bandId,
                createShowDTO.weekDay,
                createShowDTO.startTime,
                createShowDTO.endTime].some(item => !item)
            ) {
                throw new CustomError(
                    "Invalid or missing key",
                    406,
                    ["Is expected 'bandId', 'weekDay', 'startTime', 'endTime' keys",
                        "'bandId: string format",
                        "'weekDay': string 'sexta', 'sábado' or 'domingo' value",
                        "'startTime': number between '8' up to '22', and only intergers numbers",
                        "'endTime': number between '9' up to '23', and only intergers numbers"
                    ]
                );

            }

            const {
                bandId,
                weekDay,
                startTime,
                endTime
            } = createShowDTO

            if (!["sexta", "sábado", "domingo"]
                .includes(weekDay.trim().toLocaleLowerCase())) {
                throw new CustomError(
                    "Invalid or Missing Value",
                    406,
                    "'weekDay': 'sexta', 'sábado' or 'domingo' string value"
                )
            }

            if (isNaN(startTime)
                || Number(startTime) < 8
                || Number(startTime) > 22
                || !Number.isInteger(createShowDTO.startTime)
            ) {
                throw new CustomError(
                    "Invalid or Missing Value",
                    406,
                    "'startTime': number between '8' up to '22', and only intergers numbers"
                )
            }

            if (endTime < 9
                || endTime >= 25
                || !Number.isInteger(endTime)
                || endTime - startTime < 1
            ) {
                throw new CustomError(
                    "Invalid or Missing Value",
                    406,
                    "'endTime': only intergers numbers between '9' up to '23' and must be greather in one hour than 'startTime'"
                )
            }

            const agenda = await this.showDatabase.getShowByWeekDay(weekDay.trim().toLocaleLowerCase())

            let repeatedShow = {}

            if (
                agenda
                    .some(
                        (item: resultDatabaseModel) => {
                            if (item.bandId === bandId && item.weekDay === weekDay) {
                                repeatedShow = item
                                return true
                            }
                        })

            ) {
                throw new CustomError(
                    "Invalid or Missing Value",
                    406,
                    {
                        message: "Show already scheduled in same date",
                        conflicts: repeatedShow
                    }
                )
            }

            const conflictedAgenda: ShowsAgenda[] = !agenda ? false : agenda.filter((show: ShowsAgenda): ShowsAgenda => {
                if (show.startTime === startTime
                    || (startTime < show.startTime && endTime > show.startTime)
                    || (startTime < show.endTime && endTime > show.endTime)
                    || (startTime > show.startTime && endTime < show.endTime)
                ) {
                    return ShowsAgenda.toShowsAgendaModel(show)
                }
            })

            if ( conflictedAgenda?.length) {
                throw new CustomError(
                    "Invalid or Missing Value",
                    406,
                    {
                        message: "There is a schedule conflict",
                        conflicts: conflictedAgenda
                    }
                )
            }

            const showId = this.idGenerator.generate()

            await this.showDatabase.createShow({
                showId: showId,
                bandId: createShowDTO.bandId,
                weekDay: createShowDTO.weekDay,
                startTime: createShowDTO.startTime,
                endTime: createShowDTO.endTime
            })

            return { showId: showId }

        } catch (err: any) {

            if(err.message === "jwt expired"){
               throw new CustomError(
                    "Token Error",
                    403,
                    "Token is expired.")
            }

            if (err.sql) {
                if (err?.errno === 1452) {
                    throw new CustomError(
                        "Invalid or Missing value",
                        406,
                        "ID of 'bandId' is invalid")
                } else {
                    throw new CustomError(
                        "Side Server Error",
                        500,
                        err.sqlMessage || err.message || "Try Again")
                }
            }

            throw new CustomError(
                err.message || "Internal Error",
                err.code || 500,
                err.tips || "Try again")

        }
    }


    public async getShowByWeekDay(weekDay: string) {

        if (!["sexta", "sábado", "domingo"]
            .includes(weekDay.trim().toLocaleLowerCase())) {
            throw new CustomError(
                "Invalid or Missing Value",
                406,
                "'weekDay': 'sexta', 'sábado' or 'domingo' string value"
            )
        }

        try {
            const showsList = await this.showDatabase
                .getShowByWeekDay(
                    weekDay.toLocaleLowerCase().trim()
                )
                .then(
                    res => res
                        .map((item: any) =>
                            ShowsAgenda.toShowsAgendaModel(item))
                )

            if (!showsList.length) {
                return null
            }

            return showsList

        } catch (err) {

            throw new CustomError(
                err.message || "Internal Error",
                err.code || 500,
                { error: err.tips || "Try again" })

        }
    }
}