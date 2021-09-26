"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BandDataBaseMock = void 0;
const BandDataBase_1 = require("../../src/data/BandDataBase");
class BandDataBaseMock extends BandDataBase_1.BandDataBase {
    constructor() {
        super(...arguments);
        this.registerBand = jest.fn();
    }
}
exports.BandDataBaseMock = BandDataBaseMock;
//# sourceMappingURL=bandDataBase.js.map