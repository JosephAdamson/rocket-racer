import { NextFunction, Request, Response } from "express";
import APIError from "../errors/APIError";


const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    let errorCode: number = 500;
    if (error instanceof APIError) {
        errorCode = error.statusCode;
    }
    res.status(errorCode).json({
        success: false,
        message: error.message,
        code: errorCode
    });
    next();
}

export default errorHandler;