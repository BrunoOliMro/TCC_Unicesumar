import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CompaniesService } from "../../companies/companies.service";

@Injectable()
export class CheckCompany implements NestMiddleware {

    constructor(
        @Inject(CompaniesService) private companiesService: CompaniesService
    ) { }

    async use(req: Request, _res: Response, next: NextFunction) {

        await this.companiesService.findCompanyInfo(
            this.companiesService.findCompanyIdWithToken(req.headers.authorization)
        );

        return next();

    }

}