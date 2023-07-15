import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export interface User {
    username: string;
    password: string;
    name: string;
}

let userContext: UserContext | null = null;

class UserContext {
    _users: User[] = [];

    constructor() {
        this.createDefaultUser();
    }

    async login(username: string, password: string): Promise<[number, { data: any; error: string | null; }]> {
        const user = this._users.find(user => user.username === username);
        if (!user) {
            return [
                404,
                {
                    data: null,
                    error: 'User does not exist'
                },
            ]
        }
        const correctPassword = await compare(password, user.password);
        if (correctPassword) {
            return [
                200,
                {
                    error: null,
                    data: {
                        accessToken: sign({
                            username: user.username,
                            name: user.name
                        }, process.env.JWT_SECRET!, { expiresIn: '1h' })
                    }
                }
            ]
        }
        return [
            401,
            {
                error: 'Wrong password. Please try again.',
                data: null
            }
        ]
    }

    async create(username: string, password: string, name = ''): Promise<[number, { data: any; error: string | null; }]> {
        const userExist = this._users.some(user => user.username === username);
        if (userExist) {
            return [
                409,
                {
                    data: null,
                    error: 'Username already exists'
                }
            ]
        }
        if (password.length < 8) {
            return [
                400,
                {
                    data: null,
                    error: 'Password should be more than 8 characters'
                }
            ]
        }
        const user: User = {
            username,
            password: await hash(password, 10),
            name
        }
        this._users.push(user);
        return [
            201,
            {
                data: null,
                error: null
            }
        ]
    }

    async createDefaultUser() {
        const user: User = {
            username: 'turfadmin',
            password: await hash('turf_password', 10),
            name: 'TurfJS Admin'
        }
        this._users.push(user);
    }
}

export function getUserContext() {
    if (!userContext) {
        userContext = new UserContext();
    }
    return userContext;
}