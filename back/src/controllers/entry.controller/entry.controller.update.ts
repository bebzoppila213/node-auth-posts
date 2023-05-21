import { BaseController } from "../base.controller";
import { IController } from "../interface.controller";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { EntryModel } from "../../models/entry.model";

type EntryControllerUpdateBody = {
  id: string;
  text: string;
};

export class EntryControllerUpdate
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
    const data = matchedData(req) as EntryControllerUpdateBody;

    const files = req.files as any;
    let filePath = "";

    if (files) {
      files.photo.mv(
        "images/" + req.user.id + req.user.email + files.photo.name
      );
      filePath = req.user.id + req.user.email + files.photo.name;
    }

    await this.entryModel.update(req.user.id, Number(data.id), data.text, filePath);
    this.sendOk(res, "Данные успешно обновлены", {text: data.text, img: filePath});
  }
}
