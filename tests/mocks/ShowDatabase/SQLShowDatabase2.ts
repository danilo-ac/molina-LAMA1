import { createShowDTO, resultDatabaseModel } from "../../../src/model/Show";
import ShowRepository from '../../../src/business/ShowBusiness/ShowRepository'

export default class SQLShowDatabase2 implements ShowRepository {


  public createShow: (
    createShowDTO: createShowDTO
  ) => Promise<void> = jest.fn()


  public getShowByWeekDay: (weekDay: string) =>
    Promise<Array<resultDatabaseModel> | void> = jest
      .fn(async (weekDay: string): Promise<Array<resultDatabaseModel> | void> => {

        if (weekDay) {
          throw {sql: true, errno: 1452}
        }

        return [{
          showId: "showId1",
          name: "name1",
          bandId: "1",
          weekDay: "sábado",
          musicGenre: "musicGenre",
          startTime: 8,
          endTime: 10
        },
        {
          showId: "showId2",
          name: "name2",
          bandId: "2",
          weekDay: "sábado",
          musicGenre: "musicGenre",
          startTime: 10,
          endTime: 11
        }]
      })

}