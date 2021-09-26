"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowWeekDay = exports.ShowsAgenda = void 0;
class ShowsAgenda {
    constructor(name, musicGenre, startTime, endTime) {
        this.name = name;
        this.musicGenre = musicGenre;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    static toShowsAgendaModel(input) {
        return new ShowsAgenda(input.name, input.musicGenre, input.startTime, input.endTime);
    }
}
exports.ShowsAgenda = ShowsAgenda;
var ShowWeekDay;
(function (ShowWeekDay) {
    ShowWeekDay["SEXTA"] = "sexta";
    ShowWeekDay["SABADO"] = "s\u00E1bado";
    ShowWeekDay["DOMINGO"] = "domingo";
})(ShowWeekDay = exports.ShowWeekDay || (exports.ShowWeekDay = {}));
//# sourceMappingURL=Show.js.map