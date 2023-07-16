"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserContext = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
let userContext = null;
class UserContext {
    _users = [];
    constructor() {
        this.createDefaultUser();
    }
    async login(username, password) {
        const user = this._users.find(user => user.username === username);
        if (!user) {
            return [
                404,
                {
                    data: null,
                    error: 'User does not exist'
                },
            ];
        }
        const correctPassword = await (0, bcrypt_1.compare)(password, user.password);
        if (correctPassword) {
            return [
                200,
                {
                    error: null,
                    data: {
                        accessToken: (0, jsonwebtoken_1.sign)({
                            username: user.username,
                            name: user.name
                        }, process.env.JWT_SECRET, { expiresIn: '1h' })
                    }
                }
            ];
        }
        return [
            401,
            {
                error: 'Wrong password. Please try again.',
                data: null
            }
        ];
    }
    async create(username, password, name = '') {
        const userExist = this._users.some(user => user.username === username);
        if (userExist) {
            return [
                409,
                {
                    data: null,
                    error: 'Username already exists'
                }
            ];
        }
        if (password.length < 8) {
            return [
                400,
                {
                    data: null,
                    error: 'Password should be more than 8 characters'
                }
            ];
        }
        const user = {
            username,
            password: await (0, bcrypt_1.hash)(password, 10),
            name
        };
        this._users.push(user);
        return [
            201,
            {
                data: null,
                error: null
            }
        ];
    }
    async createDefaultUser() {
        const user = {
            username: 'turfadmin',
            password: await (0, bcrypt_1.hash)('turf_password', 10),
            name: 'TurfJS Admin'
        };
        this._users.push(user);
    }
}
function getUserContext() {
    if (!userContext) {
        userContext = new UserContext();
    }
    return userContext;
}
exports.getUserContext = getUserContext;
