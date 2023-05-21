import { Request, Response } from "express";
import { body, query } from "express-validator";
import { validateMiddleware } from "../../middleware/middleware.validate";
import { isAuthMiddleware } from "../../middleware/middlware.is.auth";
import ApiController, { RequestMethods } from "../api.controller";
import { EntryControllerCount } from "./entry.controller.count";
import { EntryControllerCreate } from "./entry.controller.create";
import EntryControllerDelete from "./entry.controller.delete";
import { EntryControllerGetItems } from "./entry.controller.get.items";
import { EntryControllerUpdate } from "./entry.controller.update";

export default class EnrtryControllerBase extends ApiController {
  public create(req: Request, res: Response) {
    return new EntryControllerCreate().index(req, res);
  }

  public delete(req: Request, res: Response) {
    return new EntryControllerDelete().index(req, res);
  }

  public update(req: Request, res: Response) {
    return new EntryControllerUpdate().index(req, res);
  }

  public getAll(req: Request, res: Response) {
    return new EntryControllerGetItems().index(req, res);
  }

  public getEntryCount(req: Request, res: Response) {
    return new EntryControllerCount().index(req, res);
  }

  public getRouterConfig() {
    return [
      {
        method: "post" as RequestMethods,
        path: "/entry",
        middleware: [
          body("text").notEmpty(),
          validateMiddleware,
          isAuthMiddleware,
        ],
        controller: this.create,
      },

      {
        method: "get" as RequestMethods,
        path: "/entry",
        middleware: [query("page").isNumeric(), validateMiddleware],
        controller: this.getAll,
      },

      {
        method: "put" as RequestMethods,
        path: "/entry",
        middleware: [
          body("id").isNumeric(),
          body("text").notEmpty(),
          validateMiddleware,
          isAuthMiddleware,
        ],
        controller: this.update,
      },

      {
        method: "delete" as RequestMethods,
        path: "/entry",
        middleware: [
          body("id").isNumeric(),
          validateMiddleware,
          isAuthMiddleware,
        ],
        controller: this.delete,
      },

      {
        method: "get" as RequestMethods,
        path: "/entry-count",
        middleware: [],
        controller: this.getEntryCount,
      },
    ];
  }
}
