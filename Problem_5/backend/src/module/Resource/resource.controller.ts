import { NextFunction, Request, Response } from "express";
import { ResponseSuccess } from "../../utils/response.util";
import * as service from "./resource.service";

export async function createResource(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.info(
      `>> [resource] createResource data ${JSON.stringify(req.body)}`
    );
    await service.createAccount(req);
    return ResponseSuccess(res);
  } catch (error: any) {
    return next(error);
  }
}

export async function getAllResource(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.info(
      `>> [resource] createResource data ${JSON.stringify(req.body)}`
    );
    await service.createAccount(req);
    return ResponseSuccess(res);
  } catch (error: any) {
    return next(error);
  }
}
export async function getDetailResource(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.info(
      `>> [resource] createResource data ${JSON.stringify(req.body)}`
    );
    await service.createAccount(req);
    return ResponseSuccess(res);
  } catch (error: any) {
    return next(error);
  }
}
export async function updateResource(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.info(
      `>> [resource] createResource data ${JSON.stringify(req.body)}`
    );
    await service.createAccount(req);
    return ResponseSuccess(res);
  } catch (error: any) {
    return next(error);
  }
}
export async function deleteResource(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.info(
      `>> [resource] createResource data ${JSON.stringify(req.body)}`
    );
    await service.createAccount(req);
    return ResponseSuccess(res);
  } catch (error: any) {
    return next(error);
  }
}
