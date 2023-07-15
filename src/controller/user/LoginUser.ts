import { Request, Response } from "express";
import { User } from "../../context/User";
import { UserContext } from "../../context";

export async function loginUser(request: Request, response: Response) {
    const userContext = UserContext();
    const { username, password } = request.body;
    if (!username) {
        return response.status(400).json({
            data: null,
            error: 'Username is required'
        })
    }
    if (!password) {
        return response.status(400).json({
            data: null,
            error: 'Password is required'
        })
    }
    const loginResponse = await userContext.login(username, password);
    if (loginResponse[1].error) {
        return response.status(loginResponse[0]).json(loginResponse[1]);
    }
    return response.status(loginResponse[0]).json(loginResponse[1])
}