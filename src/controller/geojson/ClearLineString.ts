import { Request, Response } from "express";
import { LineCheckContext } from "../../context";

export async function clearLineString(request: Request, response: Response) {
    const lineCheck = LineCheckContext();
    const lineString = lineCheck.getRefLineString();
    if (!lineString) {
        return response.status(404).json({
            data: null,
            error: 'A GeoJSON.LineString object has not been defined.'
        })
    }
    lineCheck.clearLineString();
    return response.status(200).json({
        data: null,
        error: null
    })
}