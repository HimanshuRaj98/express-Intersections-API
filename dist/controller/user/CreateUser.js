"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const context_1 = require("../../context");
async function createUser(request, response) {
    const userContext = (0, context_1.UserContext)();
    const user = request.body;
    if (!user.username) {
        return response.status(400).json({
            data: null,
            error: 'Username is required'
        });
    }
    if (!user.password) {
        return response.status(400).json({
            data: null,
            error: 'Password is required'
        });
    }
    const createResponse = await userContext.create(user.username, user.password, user.name);
    if (createResponse[1].error) {
        return response.status(createResponse[0]).json(createResponse[1]);
    }
    return response.status(createResponse[0]).json(createResponse[1]);
}
exports.createUser = createUser;
