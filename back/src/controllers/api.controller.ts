import { Router } from "express";
import { ValidationChain } from "express-validator";
import { FuncMiddleware } from "../middleware";
import { Request, Response } from "express";
export type RequestMethods = "post" | "get" | "delete" | "put"

type ControllersConfigType = {
  path: string;
  middleware: Array<FuncMiddleware | ValidationChain>;
  controller: (req: Request, res: Response) => void;
  method: RequestMethods;
};

export default abstract class ApiController {
  private router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    const config = this.getRouterConfig();
    for (const configItem of config) {
      this.router[configItem.method](configItem.path, [
        ...configItem.middleware,
        configItem.controller,
      ]);
    }
  }

  public abstract getRouterConfig(): ControllersConfigType[];

  public getRouter() {
    return this.router;
  }
}
