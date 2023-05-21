import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { UserModel } from "../../models/user.model";
import { BaseController } from "../base.controller";
import { IController } from "../interface.controller";
import utilsComparePassword from "../../utils/utils.compare.password"
import jwt from "jsonwebtoken"

type AuthBodyType = {
  email: string;
  password: string;
};

export class UserControllerAuth extends BaseController implements IController {
  private userModel: UserModel;

  constructor() {
    super();
    this.userModel = new UserModel();
  }

  public async index(req: Request, res: Response) {
    const data = matchedData(req) as AuthBodyType;

    const user = await this.userModel.find(data.email);
    if (user === null) return this.sendFail(res, "Пользователя не существует");

    const pasIsValid = await utilsComparePassword(data.password, user.password)
    if(!pasIsValid) return this.sendFail(res, "Не верный пароль");
    
    let payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, (process.env.TOKEN_SECRET as string));

    this.sendOk(res, "Пользователь успешно авторизован", {...user, password: "", token});
  }
}
