import { BaseDatabase } from "../BaseDatabase";
import { createShowDTO, resultDatabaseModel } from "../../model/Show";
import ShowRepository from '../../business/ShowBusiness/ShowRepository'
import CustomError from "../../error/CustomError";

export default class SQLShowDatabase extends BaseDatabase implements ShowRepository {

  private static TABLE_SHOWS = "s21_projeto_shows";
  private static TABLE_BANDS = "s21_projeto_bands"

  public async createShow(
    createShowDTO: createShowDTO
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: createShowDTO.showId,
          week_day: createShowDTO.weekDay,
          start_time: createShowDTO.startTime,
          end_time: createShowDTO.endTime,
          band_id: createShowDTO.bandId,
        })
        .into(SQLShowDatabase.TABLE_SHOWS);
    } catch (err) {
      throw err
    }
  }


  public async getShowByWeekDay(weekDay: string): Promise<resultDatabaseModel> {
    const result = await this.getConnection()
      .select({
        showId:`${SQLShowDatabase.TABLE_BANDS}.id`,
        name: `${SQLShowDatabase.TABLE_BANDS}.name`,
        bandId: `${SQLShowDatabase.TABLE_SHOWS}.band_id`,
        weekDay: `${SQLShowDatabase.TABLE_SHOWS}.week_day`,
        musicGenre: `${SQLShowDatabase.TABLE_BANDS}.music_genre`,
        startTime: `${SQLShowDatabase.TABLE_SHOWS}.start_time`,
        endTime: `${SQLShowDatabase.TABLE_SHOWS}.end_time`
      })
      .from(SQLShowDatabase.TABLE_SHOWS)
      .join(SQLShowDatabase.TABLE_BANDS,
        `${SQLShowDatabase.TABLE_BANDS}.id`,
        `${SQLShowDatabase.TABLE_SHOWS}.band_id`)
      .where({ week_day: weekDay })
      .orderBy(`${SQLShowDatabase.TABLE_SHOWS}.start_time`,
        "asc");

    return result;
  }

}
