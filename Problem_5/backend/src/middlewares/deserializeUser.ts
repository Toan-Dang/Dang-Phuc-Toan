import { NextFunction, Request, Response } from "express";
import { JWT } from "../utils/constants.util";
import { verifyJwt } from "../utils/jwt.util";
import { ResponseError } from "../utils/response.util";

export const deserializeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token
    console.log("deserializeUser");
    let access_token = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      return ResponseError(res, 401);
    }

    // Validate Access Token
    const decoded: any = verifyJwt(access_token, JWT.SECRET);

    if (!decoded) {
      return ResponseError(res, 401);
    }
    res.locals.auth = decoded;
    return next();
  } catch (err: any) {
    next(err);
  }
};
