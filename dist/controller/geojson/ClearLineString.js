"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearLineString = void 0;
const context_1 = require("../../context");
async function clearLineString(request, response) {
    const lineCheck = (0, context_1.LineCheckContext)();
    const lineString = lineCheck.getRefLineString();
    if (!lineString) {
        return response.status(404).json({
            data: null,
            error: 'A GeoJSON.LineString object has not been defined.'
        });
    }
    lineCheck.clearLineString();
    return response.status(200).json({
        data: null,
        error: null
    });
}
exports.clearLineString = clearLineString;
