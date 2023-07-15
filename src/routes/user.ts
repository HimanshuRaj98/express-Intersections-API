import { Router } from "express";
import { CreateUser, LoginUser } from "../controller";

const userRouter = Router()

userRouter.post('/create', CreateUser)
userRouter.post('/login', LoginUser)

export {
    userRouter
};