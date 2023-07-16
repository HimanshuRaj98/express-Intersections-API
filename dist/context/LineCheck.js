"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLineCheckContext = void 0;
const line_intersect_1 = __importDefault(require("@turf/line-intersect"));
const helpers_1 = require("@turf/helpers");
let lineCheckContext = null;
class LineCheck {
    _refLineString;
    _linesToCheck = [];
    constructor() { }
    checkLineIntersections() {
        const intersections = [];
        if (this._refLineString && this._linesToCheck.length > 0) {
            const refLine = (0, helpers_1.lineString)(this._refLineString.coordinates.map(coordinate => coordinate));
            this._linesToCheck.forEach((line, index) => {
                const lineToIntersect = (0, helpers_1.lineString)(line.coordinates.map(coordinate => coordinate));
                const intersection = (0, line_intersect_1.default)(refLine, lineToIntersect);
                const intersectionPoints = {
                    line: `L${index + 1}`,
                    intersections: [],
                };
                intersection.features.forEach(feature => {
                    intersectionPoints.intersections.push(feature.geometry.coordinates);
                });
                intersections.push(intersectionPoints);
            });
        }
        return intersections;
    }
    getRefLineString() {
        return this._refLineString;
    }
    updateRefLineString(lineString) {
        this._refLineString = lineString;
    }
    updateLinesToCheck(lines) {
        this._linesToCheck = lines;
    }
    clearLineString() {
        this._refLineString = undefined;
    }
}
function getLineCheckContext() {
    if (!lineCheckContext) {
        lineCheckContext = new LineCheck();
    }
    return lineCheckContext;
}
exports.getLineCheckContext = getLineCheckContext;
