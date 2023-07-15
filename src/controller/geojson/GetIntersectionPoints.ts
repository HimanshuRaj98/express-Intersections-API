import { Request, Response } from "express";
import { LineCheckContext } from "../../context";

export async function getIntersectionPoints(request: Request, response: Response) {
    const lineCheck = LineCheckContext();
    const lines: { line: GeoJSON.LineString }[] = request.body;
    if (!lines.length) {
        return response.status(400).json({
            data: null,
            error: 'GeoJSON.LineString objects is expected'
        })
    }
    lineCheck.updateLinesToCheck(lines.map(line => line.line));
    const intersections = lineCheck.checkLineIntersections();
    return response.status(200).json({
        data: intersections,
        error: null
    })
}