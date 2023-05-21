import { Response } from "express";

export abstract class BaseController {
  public sendFail(res: Response, messages = "Произошла ошибка", data?: any) {
    res
      .status(400)
      .send(JSON.stringify({ messages: messages, ok: false, data }));
  }

  public sendOk(res: Response, messages = "Всё хорошо", data?: any) {
    res
      .status(200)
      .send(JSON.stringify({ messages: messages, ok: true, data }));
  }
}
