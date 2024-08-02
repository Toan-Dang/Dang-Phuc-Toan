import { Request, Response, NextFunction } from "express";
import { ResponseSuccess } from "../utils/response.util";
import * as service from "../service/users.service";

export async function getAllPersons(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.info(">>[users] getAllPersons");
    const result = await service.getAllPersons();
    return ResponseSuccess(res, result);
  } catch (error) {
    return next(error);
  }
}

export async function getPersonById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.info(">>[users] getPersonById");
    const { id } = req.params;
    console.log("id", id, "type", typeof id);

    const result = await service.getPersonById(parseInt(id));
    return ResponseSuccess(res, result);
  } catch (error) {
    return next(error);
  }
}

export async function addPerson(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.info(">>[users] addPerson");
    const result = await service.addPerson(req.body);
    return ResponseSuccess(res, result);
  } catch (error) {
    return next(error);
  }
}

export async function updatePerson(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.info(">>[users] updatePerson");
    const { id } = req.params;
    const result = await service.updatePerson(req.body, parseInt(id));
    return ResponseSuccess(res, result);
  } catch (error) {
    return next(error);
  }
}

export async function deletePerson(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.info(">>[users] deletePerson");
    const { id } = req.params;
    const result = await service.deletePerson(parseInt(id));
    return ResponseSuccess(res, result);
  } catch (error) {
    return next(error);
  }
}

// task 1.2.1
export async function getUsersByQueryString(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.info(">>[users] getUsersByQueryString");
    const { query } = req.params;
    const result = await service.getUsersByQueryString(query);
    return ResponseSuccess(res, result);
  } catch (error) {
    return next(error);
  }
}

// task 1.2.2
export async function updateMultiUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.info(`>>[users] updateMultiUsers, ${JSON.stringify(req.body)}`);
    await service.updateMultiUsers(req.body);
    return ResponseSuccess(res, null);
  } catch (error) {
    return next(error);
  }
}
