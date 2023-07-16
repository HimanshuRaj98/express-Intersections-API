"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = exports.GeoJSONRouter = void 0;
const geojson_1 = require("./geojson");
Object.defineProperty(exports, "GeoJSONRouter", { enumerable: true, get: function () { return geojson_1.geoJsonRouter; } });
const user_1 = require("./user");
Object.defineProperty(exports, "UserRouter", { enumerable: true, get: function () { return user_1.userRouter; } });
