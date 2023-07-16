"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const context_1 = require("./context");
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// PayloadTooLargeError
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use((0, morgan_1.default)('combined'));
(0, context_1.LineCheckContext)();
(0, context_1.UserContext)();
app.get('/', (req, res) => {
    res.status(200).send('Server is Up!');
});
app.use('/api/v1', routes_1.GeoJSONRouter);
app.use('/auth', routes_1.UserRouter);
app.listen(port, () => {
    console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
