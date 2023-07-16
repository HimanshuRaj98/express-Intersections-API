"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post('/create', controller_1.CreateUser);
userRouter.post('/login', controller_1.LoginUser);
