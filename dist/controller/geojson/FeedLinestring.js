"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedLineString = void 0;
const context_1 = require("../../context");
async function feedLineString(request, response) {
    const lineCheck = (0, context_1.LineCheckContext)();
    const lineStringObject = request.body;
    if (lineStringObject.type !== 'LineString') {
        return response.status(400).json({
            data: null,
            error: 'A GeoJSON.LineString object is expected'
        });
    }
    if (!lineStringObject.coordinates) {
        return response.status(400).json({
            data: null,
            error: 'GeoJSON.LineString object must have coordinates field defined'
        });
    }
    if (lineStringObject.coordinates && lineStringObject.coordinates.length <= 0) {
        return response.status(400).json({
            data: null,
            error: 'GeoJSON.LineString object must have coordinates field populated'
        });
    }
    lineCheck.updateRefLineString(lineStringObject);
    return response.status(201).json({
        data: lineCheck.getRefLineString(),
        error: null
    });
}
exports.feedLineString = feedLineString;
