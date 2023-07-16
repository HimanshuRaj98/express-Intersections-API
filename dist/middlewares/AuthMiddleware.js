"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
async function AuthMiddleware(request, response, next) {
    let token;
    try {
        const authorization = request.get("authorization");
        if (!authorization) {
            return response.status(401).json({
                error: 'access_token is required in auth header. Please login and try again.',
                data: null
            });
        }
        if (authorization.toLowerCase().startsWith("bearer ")) {
            token = authorization.substring(7);
            (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET, (err, _) => {
                if (err) {
                    return response.status(401).json({
                        error: 'Token has expired, Please login again.',
                        data: null
                    });
                }
            });
        }
    }
    catch (error) {
        return response.status(500).json({
            error: 'Something bad happened during access_token decode. Please try again',
            data: null
        });
    }
    return next();
}
exports.AuthMiddleware = AuthMiddleware;
const base64urldecode = async (base64token) => {
    const buffer = Buffer.from(base64token, "base64url");
    const token = buffer.toString("ascii");
    return token;
};
