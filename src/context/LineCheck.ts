import lineIntersect from '@turf/line-intersect'
import { lineString } from '@turf/helpers'

let lineCheckContext: LineCheck | null = null;

class LineCheck {
    private _refLineString: GeoJSON.LineString | undefined;
    private _linesToCheck: GeoJSON.LineString[] = [];
    
    constructor() {}

    checkLineIntersections(): { line: string, intersections: GeoJSON.Position[] }[] {
        const intersections: { line: string, intersections: GeoJSON.Position[] }[] = [];
        if (this._refLineString && this._linesToCheck.length > 0) {
            const refLine = lineString(this._refLineString.coordinates.map(coordinate => coordinate))
            this._linesToCheck.forEach((line, index) => {
                const lineToIntersect = lineString(line.coordinates.map(coordinate => coordinate))
                const intersection = lineIntersect(refLine, lineToIntersect);
                const intersectionPoints: {
                    line: string;
                    intersections: GeoJSON.Position[];
                } = {
                    line: `L${index + 1}`,
                    intersections: [],
                }
                intersection.features.forEach(feature => {
                    intersectionPoints.intersections.push(feature.geometry.coordinates)
                })
                intersections.push(intersectionPoints)
            })
        }
        return intersections;
    }

    getRefLineString() {
        return this._refLineString;
    }

    updateRefLineString(lineString: GeoJSON.LineString) {
        this._refLineString = lineString;
    }

    updateLinesToCheck(lines: GeoJSON.LineString[]) {
        this._linesToCheck = lines;
    }

    clearLineString() {
        this._refLineString = undefined;
    }
    
}

export function getLineCheckContext() {
    if (!lineCheckContext) {
        lineCheckContext = new LineCheck();
    }
    return lineCheckContext;
}