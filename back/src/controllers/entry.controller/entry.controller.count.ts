import { EntryModel } from "../../models/entry.model";
import { BaseController } from "../base.controller";
import { IController } from "../interface.controller";
import { Request, Response } from "express";

export class EntryControllerCount
  extends BaseController
  implements IController
{
  private entryModel: EntryModel;

  constructor() {
    super();
    this.entryModel = new EntryModel();
  }

  public async index(req: Request, res: Response) {
    const entryCount = await this.entryModel.getCount()
    
    return this.sendOk(res, "вфвцф", {count: entryCount._count.id});
  }
}