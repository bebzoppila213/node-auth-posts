import { Request, Response, NextFunction } from "express";
export type FuncMiddleware = (req: Request, res: Response, next: NextFunction) => void
