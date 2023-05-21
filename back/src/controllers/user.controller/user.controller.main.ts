import ApiController, { RequestMethods } from "../api.controller";
import { UserControllerAuth } from "./user.controller.auth";
import { UserControllerRegister } from "./user.controller.register";
import { Request, Response } from "express";
import { body } from "express-validator";
import { validateMiddleware } from "../../middleware/middleware.validate";
import { UserControllerToken } from "./user.controller.token";
import { isAuthMiddleware } from "../../middleware/middlware.is.auth";

export default class UserControllerBase extends ApiController {
  public register(req: Request, res: Response) {
    return new UserControllerRegister().index(req, res);
  }

  public auth(req: Request, res: Response) {
    return new UserControllerAuth().index(req, res);
  }

  public authToken(req: Request, res: Response) {
    return new UserControllerToken().index(req, res);
  }

  public getRouterConfig() {
    return [
      {
        method: "post" as RequestMethods,
        path: "/register",
        middleware: [
          body("email").isEmail(),
          body("name").isLength({ max: 15, min: 4 }),
          body("password").isStrongPassword({
            minLength: 4,
            minNumbers: 2,
            minUppercase: 1,
            minSymbols: 0,
          }),
          validateMiddleware,
        ],
        controller: this.register,
      },

      {
        method: "post" as RequestMethods,
        path: "/auth",
        middleware: [
          body("email").isEmail(),
          body("password").isStrongPassword({
            minLength: 4,
            minNumbers: 2,
            minUppercase: 1,
            minSymbols: 0,
          }),
          validateMiddleware,
        ],
        controller: this.auth,
      },

      {
        method: "post" as RequestMethods,
        path: "/auth-token",
        middleware: [isAuthMiddleware],
        controller: this.authToken,
      },
    ];
  }
}
