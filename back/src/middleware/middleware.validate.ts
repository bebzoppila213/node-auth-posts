import { FuncMiddleware } from ".";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateMiddleware: FuncMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  
  if (!result.isEmpty()) {
    res
      .status(400)
      .send(JSON.stringify({ messages: "Ошибка валидации", ok: false }));
    return;
  } else {
    next();
  }
};
