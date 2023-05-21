import { EntryModel } from "../../models/entry.model";
import { BaseController } from "../base.controller";
import { IController } from "../interface.controller";
import { Request, Response } from "express";
import { matchedData } from "express-validator";

type EntryControllerCreateBody = {
    text: string;
};

export class EntryControllerCreate
  extends BaseController
  implements IController
{
  private entryModel: EntryModel;

  constructor() {
    super();
    this.entryModel = new EntryModel();
  }

  public async index(req: Request, res: Response) {
    if(req.user === undefined) return this.sendFail(res, "Пользователь не авторизован")
    if(!req.files) return this.sendFail(res, "Фаил не продоставлен")

    const data = matchedData(req) as EntryControllerCreateBody;

    const files = req.files as any;
    files.photo.mv("images/" + req.user.id + req.user.email + files.photo.name);
    let fileName = req.user.id + req.user.email + files.photo.name
    
    const entry = await this.entryModel.create(1, data.text, fileName)
    return this.sendOk(res, "Данные успешно добавлены", entry);
  }
}
