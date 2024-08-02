import { Response } from "express";

export function ResponseSuccess(res: Response, data?: any) {
  return res.status(200).json({
    success: true,
    message: "Success",
    data: data,
  });
}

export const ResponseError = (
  res: Response,
  status: number,
  type?: any,
  label?: any
) => {
  const obj: any = { success: false };
  if (status === 422) {
    const data = { type, label };
    obj["errors"] = data;
  } else if (status === 401) {
    if (type && label) {
      const data = { type, label };
      obj["errors"] = data;
    }
    obj["message"] = "Unauthorized";
  } else if (status === 404) {
    obj["message"] = "Not Found";
  } else if (status === 500) {
    obj["message"] = "Internal Server Error";
  }
  return res.status(status).json(obj);
};
