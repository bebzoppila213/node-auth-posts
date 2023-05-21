import { BaseController } from "../base.controller";
import { IController } from "../interface.controller";
import { Request, Response } from "express";


export class UserControllerToken extends BaseController implements IController{

    public index(req: Request, res: Response){
        if(req.user === undefined) return this.sendFail(res, "Пользователь не авторизован")
        this.sendOk(res, "Пользователь авторизован", req.user);
    }
}