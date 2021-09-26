export interface createShowDTO {
    weekDay: string,
    startTime: number,
    endTime: number,
    bandId: string,
    showId?: string
}

export class ShowsAgenda {
    constructor(
        public name: string,
        public musicGenre: string,
        public startTime: number,
        public endTime: number
    ) { }

    static toShowsAgendaModel(input: any) {
        return new ShowsAgenda(
            input.name,
            input.musicGenre,
            input.startTime,
            input.endTime
        )
    }
}

export interface resultDatabaseModel {
    showId: string,
    name: string,
    bandId: string,
    weekDay: string,
    musicGenre: string,
    startTime: number,
    endTime: number
}

export enum ShowWeekDay {
    SEXTA = "sexta",
    SABADO = "sábado",
    DOMINGO = "domingo"
}