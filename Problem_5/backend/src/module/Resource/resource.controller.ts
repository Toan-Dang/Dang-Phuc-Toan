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
    const result = await service.createResource(req.body);
    return ResponseSuccess(res, result);
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
      `>> [resource] getAllResource`
    );
    const result = await service.getAllResource();
    console.log("resutl", result);
    
    return ResponseSuccess(res, result);
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
      `>> [resource] getDetailResource params ${JSON.stringify(req.params)}`
    );
    const { id } = req.params;
    const result = await service.getDetailResource(parseInt(id));
    return ResponseSuccess(res, result);
  } catch (error: any) {
    return next(error);
  }
}
export async function filterResource(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.info(
      `>> [resource] filterResource query ${JSON.stringify(req.query)}`
    );
    const { name } = req.query;
    const result = await service.filterResource(name as string);
    return ResponseSuccess(res, result);
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
      `>> [resource] updateResource data ${JSON.stringify(req.body)}`
    );
    const {id, name, description} = req.body
    await service.updateResource(id, name, description);
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
      `>> [resource] deleteResource data ${JSON.stringify(req.body)}`
    );
    const {id} = req.body
    await service.deleteResource(parseInt(id));
    return ResponseSuccess(res);
  } catch (error: any) {
    return next(error);
  }
}
