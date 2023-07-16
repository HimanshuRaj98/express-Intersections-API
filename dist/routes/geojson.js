"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geoJsonRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
const geoJsonRouter = (0, express_1.Router)();
exports.geoJsonRouter = geoJsonRouter;
geoJsonRouter.post('/linestring', middlewares_1.auth, controller_1.FeedLineString);
geoJsonRouter.get('/linestring', middlewares_1.auth, controller_1.GetLineString);
geoJsonRouter.delete('/linestring', middlewares_1.auth, controller_1.ClearLineString);
geoJsonRouter.post('/intersection-points', middlewares_1.auth, controller_1.GetIntersectionPoints);
