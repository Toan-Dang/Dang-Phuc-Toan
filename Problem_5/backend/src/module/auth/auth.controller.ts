import { NextFunction, Request, Response } from "express";
import { ResponseSuccess } from "../../utils/response.util";
import * as service from "./auth.service";
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    console.info(`>> [auth] login data ${JSON.stringify(req.body)}`);
    const result: any = await service.login(req);

    return ResponseSuccess(res, result);
  } catch (error: any) {
    return next(error);
  }
}

export async function createAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.info(`>> [auth] createAccount data ${JSON.stringify(req.body)}`);
    await service.createAccount(req);
    return ResponseSuccess(res);
  } catch (error: any) {
    return next(error);
  }
}
