"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const context_1 = require("../../context");
async function loginUser(request, response) {
    const userContext = (0, context_1.UserContext)();
    const { username, password } = request.body;
    if (!username) {
        return response.status(400).json({
            data: null,
            error: 'Username is required'
        });
    }
    if (!password) {
        return response.status(400).json({
            data: null,
            error: 'Password is required'
        });
    }
    const loginResponse = await userContext.login(username, password);
    if (loginResponse[1].error) {
        return response.status(loginResponse[0]).json(loginResponse[1]);
    }
    return response.status(loginResponse[0]).json(loginResponse[1]);
}
exports.loginUser = loginUser;
