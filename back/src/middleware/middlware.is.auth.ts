import { FuncMiddleware } from ".";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { IUserRequest } from "../types/user";



export const isAuthMiddleware: FuncMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send(JSON.stringify({ messages: "Токен не продоставлен", ok: false }));

    token = token.split(' ')[1]
    if(!token) return res.status(401).send(JSON.stringify({ messages: "Токен не валиден", ok: false }));

    try {
        let user = jwt.verify(token, (process.env.TOKEN_SECRET as string)) as IUserRequest;
        req.user = user;
        next()
    } catch (error) {
        return res.status(401).send(JSON.stringify({ messages: "Токен не валиден", ok: false }));
    }
};
