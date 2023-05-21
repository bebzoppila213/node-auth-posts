import { BaseController } from "../base.controller";
import { IController } from "../interface.controller";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { EntryModel } from "../../models/entry.model";
import { unlinkSync } from "fs";

type EntryControllerDeleteBody = {
  id: number;
};

export default class EntryControllerDelete
  extends BaseController
  implements IController
{
  private entryModel: EntryModel;

  constructor() {
    super();
    this.entryModel = new EntryModel();
  }

  public async index(req: Request, res: Response) {
    if (req.user === undefined) return this.sendFail(res, "Пользователь не авторизован");
    const data = matchedData(req) as EntryControllerDeleteBody;
    const resDelete = await this.entryModel.delete(req.user.id, data.id)
    if(!resDelete) return this.sendFail(res, "Элемента не существует");
    
    unlinkSync(`images/${resDelete.img}`);

    return this.sendOk(res, "Элемент удалён", resDelete)
  }
}
