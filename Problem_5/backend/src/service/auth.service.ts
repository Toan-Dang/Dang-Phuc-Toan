import moment from "moment";
import { Request } from "express";
import AppError from "../utils/appError";
import { signJwt } from "../utils/jwt.util";
import { JWT } from "../utils/constants.util";
import * as jwtService from "../service/jwt.service";
import { createNewAccount, findAccountByEmail } from "./account.service";

export async function login(req: Request) {
  console.log("login service");

  const { email, password } = req.body;

  const user: any = await findAccountByEmail(email);

  // check exists email
  if (!user) {
    throw new AppError("email exist", 400);
  }

  // check exists password
  if (!jwtService.validateHash(user.password, password)) {
    throw new AppError("incorrect_password", 400);
  }

  const endToday = moment().endOf("day");
  const expiresIn = endToday.diff(moment(), "seconds");

  const accessToken = signJwt({ user: user }, JWT.SECRET, {
    expiresIn,
  });

  return accessToken;
}

export async function createAccount(req: Request) {
  const user = req.body;

  // check exists email
  if (await findAccountByEmail(user.email)) {
    throw new AppError("email exist", 400);
  }

  await createNewAccount(user);
}
