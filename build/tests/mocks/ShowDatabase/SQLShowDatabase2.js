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
class SQLShowDatabase2 {
    constructor() {
        this.createShow = jest.fn();
        this.getShowByWeekDay = jest
            .fn((weekDay) => __awaiter(this, void 0, void 0, function* () {
            if (weekDay) {
                throw { sql: true, errno: 1452 };
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
                }];
        }));
    }
}
exports.default = SQLShowDatabase2;
//# sourceMappingURL=SQLShowDatabase2.js.map