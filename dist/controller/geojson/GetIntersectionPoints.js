"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntersectionPoints = void 0;
const context_1 = require("../../context");
async function getIntersectionPoints(request, response) {
    const lineCheck = (0, context_1.LineCheckContext)();
    const lines = request.body;
    if (!lines.length) {
        return response.status(400).json({
            data: null,
            error: 'GeoJSON.LineString objects is expected'
        });
    }
    lineCheck.updateLinesToCheck(lines.map(line => line.line));
    const intersections = lineCheck.checkLineIntersections();
    return response.status(200).json({
        data: intersections,
        error: null
    });
}
exports.getIntersectionPoints = getIntersectionPoints;
