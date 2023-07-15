import { Request, Response } from "express";
import { LineCheckContext } from "../../context";

export async function getLineString(request: Request, response: Response) {
    const lineCheck = LineCheckContext();
    const lineString = lineCheck.getRefLineString();
    if (!lineString) {
        return response.status(404).json({
            data: null,
            error: 'A GeoJSON.LineString object has not been defined.'
        })
    }
    return response.status(200).json({
        data: lineCheck.getRefLineString(),
        error: null
    })
}