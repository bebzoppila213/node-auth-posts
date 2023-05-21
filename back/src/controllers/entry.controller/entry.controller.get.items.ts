import { BaseController } from "../base.controller";
import { IController } from "../interface.controller";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { EntryModel } from "../../models/entry.model";

type EntryControllerGetItemsQueryType = {
  page: string;
};

export class EntryControllerGetItems
  extends BaseController
  implements IController
{
  private entryModel: EntryModel;

  constructor() {
    super();
    this.entryModel = new EntryModel();
  }

  public async index(req: Request, res: Response) {
    const data = matchedData(req) as EntryControllerGetItemsQueryType;
    const allEntries = await this.entryModel.getAll(parseInt(data.page))
    
    return this.sendOk(res, "вфвцф", allEntries);
  }
}
