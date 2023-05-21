import { BaseController } from "../base.controller";
import { IController } from "../interface.controller";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { UserModel } from "../../models/user.model";
import jwt from "jsonwebtoken"

type RegisterBodyType = {
  email: string;
  name: string;
  password: string;
};

export class UserControllerRegister
  extends BaseController
  implements IController
{
  private userModel: UserModel;

  constructor() {
    super();
    this.userModel = new UserModel();
  }

  public async index(req: Request, res: Response) {
    const data = matchedData(req) as RegisterBodyType;

    const resCreate = await this.userModel.create(data.name, data.email, data.password);
    if(!resCreate.status) return this.sendFail(res, "Не удалось создать пользователя");

    let payload = { id: resCreate.user?.id, email: resCreate.user?.email };
    const token = jwt.sign(payload, (process.env.TOKEN_SECRET as string));
    this.sendOk(res, "Пользователь успешно создан", {...resCreate.user, password: "", token});
  }
}
