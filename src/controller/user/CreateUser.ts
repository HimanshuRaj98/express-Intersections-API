import { Request, Response } from "express";
import { User } from "../../context/User";
import { UserContext } from "../../context";

export async function createUser(request: Request, response: Response) {
    const userContext = UserContext();
    const user: User = request.body;
    if (!user.username) {
        return response.status(400).json({
            data: null,
            error: 'Username is required'
        })
    }
    if (!user.password) {
        return response.status(400).json({
            data: null,
            error: 'Password is required'
        })
    }
    const createResponse = await userContext.create(user.username, user.password, user.name);
    if (createResponse[1].error) {
        return response.status(createResponse[0]).json(createResponse[1]);
    }
    return response.status(createResponse[0]).json(createResponse[1])
}