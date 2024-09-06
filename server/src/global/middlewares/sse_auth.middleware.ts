import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class SseAuthorization implements NestMiddleware {

    use(req: Request, _res: Response, next: NextFunction) {

        if (!req.headers.authorization && req.query['authorization']) req.headers.authorization = `Bearer ${req.query['authorization']}`;
        return next();

    }

}