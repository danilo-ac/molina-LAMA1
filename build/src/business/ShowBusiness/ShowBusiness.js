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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("../../error/CustomError"));
const Show_1 = require("../../model/Show");
class ShowBusiness {
    constructor(showDatabase, authenticator, idGenerator) {
        this.showDatabase = showDatabase;
        this.authenticator = authenticator;
        this.idGenerator = idGenerator;
    }
    createShow(createShowDTO, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.default("Missing Token", 406, "Verify if token was send on request");
                }
                const isValidToken = this.authenticator.getData(token);
                if (isValidToken.role !== "ADMIN") {
                    throw new CustomError_1.default("Invalid Token", 406, "Credential doesn't have enough permission to create a Show");
                }
                if ([createShowDTO.bandId,
                    createShowDTO.weekDay,
                    createShowDTO.startTime,
                    createShowDTO.endTime].some(item => !item)) {
                    throw new CustomError_1.default("Invalid or missing key", 406, ["Is expected 'bandId', 'weekDay', 'startTime', 'endTime' keys",
                        "'bandId: string format",
                        "'weekDay': string 'sexta', 'sábado' or 'domingo' value",
                        "'startTime': number between '8' up to '22', and only intergers numbers",
                        "'endTime': number between '9' up to '23', and only intergers numbers"
                    ]);
                }
                const { bandId, weekDay, startTime, endTime } = createShowDTO;
                if (!["sexta", "sábado", "domingo"]
                    .includes(weekDay.trim().toLocaleLowerCase())) {
                    throw new CustomError_1.default("Invalid or Missing Value", 406, "'weekDay': 'sexta', 'sábado' or 'domingo' string value");
                }
                if (isNaN(startTime)
                    || Number(startTime) < 8
                    || Number(startTime) > 22
                    || !Number.isInteger(createShowDTO.startTime)) {
                    throw new CustomError_1.default("Invalid or Missing Value", 406, "'startTime': number between '8' up to '22', and only intergers numbers");
                }
                if (endTime < 9
                    || endTime >= 25
                    || !Number.isInteger(endTime)
                    || endTime - startTime < 1) {
                    throw new CustomError_1.default("Invalid or Missing Value", 406, "'endTime': only intergers numbers between '9' up to '23' and must be greather in one hour than 'startTime'");
                }
                const agenda = yield this.showDatabase.getShowByWeekDay(weekDay.trim().toLocaleLowerCase());
                let repeatedShow = {};
                if (agenda
                    .some((item) => {
                    if (item.bandId === bandId && item.weekDay === weekDay) {
                        repeatedShow = item;
                        return true;
                    }
                })) {
                    throw new CustomError_1.default("Invalid or Missing Value", 406, {
                        message: "Show already scheduled in same date",
                        conflicts: repeatedShow
                    });
                }
                const conflictedAgenda = !agenda ? false : agenda.filter((show) => {
                    if (show.startTime === startTime
                        || (startTime < show.startTime && endTime > show.startTime)
                        || (startTime < show.endTime && endTime > show.endTime)
                        || (startTime > show.startTime && endTime < show.endTime)) {
                        return Show_1.ShowsAgenda.toShowsAgendaModel(show);
                    }
                });
                if (conflictedAgenda === null || conflictedAgenda === void 0 ? void 0 : conflictedAgenda.length) {
                    throw new CustomError_1.default("Invalid or Missing Value", 406, {
                        message: "There is a schedule conflict",
                        conflicts: conflictedAgenda
                    });
                }
                const showId = this.idGenerator.generate();
                yield this.showDatabase.createShow({
                    showId: showId,
                    bandId: createShowDTO.bandId,
                    weekDay: createShowDTO.weekDay,
                    startTime: createShowDTO.startTime,
                    endTime: createShowDTO.endTime
                });
                return { showId: showId };
            }
            catch (err) {
                if (err.message === "jwt expired") {
                    throw new CustomError_1.default("Token Error", 403, "Token is expired.");
                }
                if (err.sql) {
                    if ((err === null || err === void 0 ? void 0 : err.errno) === 1452) {
                        throw new CustomError_1.default("Invalid or Missing value", 406, "ID of 'bandId' is invalid");
                    }
                    else {
                        throw new CustomError_1.default("Side Server Error", 500, err.sqlMessage || err.message || "Try Again");
                    }
                }
                throw new CustomError_1.default(err.message || "Internal Error", err.code || 500, err.tips || "Try again");
            }
        });
    }
    getShowByWeekDay(weekDay) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!["sexta", "sábado", "domingo"]
                .includes(weekDay.trim().toLocaleLowerCase())) {
                throw new CustomError_1.default("Invalid or Missing Value", 406, "'weekDay': 'sexta', 'sábado' or 'domingo' string value");
            }
            try {
                const showsList = yield this.showDatabase
                    .getShowByWeekDay(weekDay.toLocaleLowerCase().trim())
                    .then(res => res
                    .map((item) => Show_1.ShowsAgenda.toShowsAgendaModel(item)));
                if (!showsList.length) {
                    return null;
                }
                return showsList;
            }
            catch (err) {
                throw new CustomError_1.default(err.message || "Internal Error", err.code || 500, { error: err.tips || "Try again" });
            }
        });
    }
}
exports.default = ShowBusiness;
//# sourceMappingURL=ShowBusiness.js.map