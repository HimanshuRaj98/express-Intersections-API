import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function AuthMiddleware(request: Request, response: Response, next: NextFunction) {
    let token: string;
    try {
        const authorization = request.get("authorization");
        if (!authorization) {
            return response.status(401).json({
                error: 'access_token is required in auth header. Please login and try again.',
                data: null
            })
        }
        if (authorization.toLowerCase().startsWith("bearer ")) {
            token = authorization.substring(7);
            verify(token, process.env.JWT_SECRET!, (err, _) => {
                if (err) {
                    return response.status(401).json({
                        error: 'Token has expired, Please login again.',
                        data: null
                    })
                }
            })
        }
        
    } catch(error) {
        return response.status(500).json({
            error: 'Something bad happened during access_token decode. Please try again',
            data: null
        })
    }

    return next()
}

const base64urldecode = async (base64token: string): Promise<string> => {
    const buffer = Buffer.from(base64token, "base64url");
    const token = buffer.toString("ascii");
    return token;
  };