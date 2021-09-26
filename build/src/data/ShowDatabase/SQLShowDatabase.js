"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDatabase_1 = require("../BaseDatabase");
class SQLShowDatabase extends BaseDatabase_1.BaseDatabase {
    createShow(createShowDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    id: createShowDTO.showId,
                    week_day: createShowDTO.weekDay,
                    start_time: createShowDTO.startTime,
                    end_time: createShowDTO.endTime,
                    band_id: createShowDTO.bandId,
                })
                    .into(SQLShowDatabase.TABLE_SHOWS);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getShowByWeekDay(weekDay) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection()
                .select({
                showId: `${SQLShowDatabase.TABLE_BANDS}.id`,
                name: `${SQLShowDatabase.TABLE_BANDS}.name`,
                bandId: `${SQLShowDatabase.TABLE_SHOWS}.band_id`,
                weekDay: `${SQLShowDatabase.TABLE_SHOWS}.week_day`,
                musicGenre: `${SQLShowDatabase.TABLE_BANDS}.music_genre`,
                startTime: `${SQLShowDatabase.TABLE_SHOWS}.start_time`,
                endTime: `${SQLShowDatabase.TABLE_SHOWS}.end_time`
            })
                .from(SQLShowDatabase.TABLE_SHOWS)
                .join(SQLShowDatabase.TABLE_BANDS, `${SQLShowDatabase.TABLE_BANDS}.id`, `${SQLShowDatabase.TABLE_SHOWS}.band_id`)
                .where({ week_day: weekDay })
                .orderBy(`${SQLShowDatabase.TABLE_SHOWS}.start_time`, "asc");
            return result;
        });
    }
}
exports.default = SQLShowDatabase;
SQLShowDatabase.TABLE_SHOWS = "s21_projeto_shows";
SQLShowDatabase.TABLE_BANDS = "s21_projeto_bands";
//# sourceMappingURL=SQLShowDatabase.js.map