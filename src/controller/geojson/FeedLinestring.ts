import { Request, Response } from "express";
import { LineCheckContext } from "../../context";

export async function feedLineString(request: Request, response: Response) {
    const lineCheck = LineCheckContext();
    const lineStringObject: GeoJSON.LineString = request.body;
    if (lineStringObject.type !== 'LineString') {
        return response.status(400).json({
            data: null,
            error: 'A GeoJSON.LineString object is expected'
        })
    }
    if (!lineStringObject.coordinates) {
        return response.status(400).json({
            data: null,
            error: 'GeoJSON.LineString object must have coordinates field defined'
        })
    }
    if (lineStringObject.coordinates && lineStringObject.coordinates.length <= 0) {
        return response.status(400).json({
            data: null,
            error: 'GeoJSON.LineString object must have coordinates field populated'
        })
    }
    lineCheck.updateRefLineString(lineStringObject);
    return response.status(201).json({
        data: lineCheck.getRefLineString(),
        error: null
    })
}