import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error);

  const message =
    error instanceof Error
      ? error.message
      : "Something went wrong";

  return res.status(500).json({
    success: false,
    message,
    data: null,
  });
};