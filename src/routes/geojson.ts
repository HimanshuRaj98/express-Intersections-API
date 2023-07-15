import { Router } from "express";
import { ClearLineString, FeedLineString, GetIntersectionPoints, GetLineString } from "../controller";
import { auth } from "../middlewares";

const geoJsonRouter = Router()

geoJsonRouter.post('/linestring', auth, FeedLineString)
geoJsonRouter.get('/linestring', auth, GetLineString)
geoJsonRouter.delete('/linestring', auth, ClearLineString)
geoJsonRouter.post('/intersection-points', auth, GetIntersectionPoints)

export {
    geoJsonRouter
};