import { Controller, Inject, Patch, Body, Headers, Sse, Get } from '@nestjs/common';
import { PointService } from './point.service';
import { CompaniesService } from '../companies/companies.service';
import { ResponseService } from '../utils/response/response.service';
import { NextResponse } from '../utils/response/types/response.types';
import { HeaderDTO } from '../global/DTO/global.dto';
import { FinishGroupPointingDTO, UpdatePointQtdDTO } from './DTO/point.dto';
import { Roles } from 'nest-keycloak-connect';
import { Stringified } from '../global/interfaces/global.interface';
import { PointHistoryEntity } from '../database/entities/tbl_point_history.entity';
import { Observable } from 'rxjs';


@Controller('point')
export class PointController {

    constructor(
        @Inject(PointService) private service: PointService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService
    ) { }

    @Roles({ roles: ["Next_admin"] })
    @Sse()
    async findPointHistory(
        @Headers() headers: HeaderDTO,
    ): Promise<Observable<Stringified<PointHistoryEntity>>> {

        return await this.service.findPointHistory(
            this.companiesService.findCompanyIdWithToken(headers.authorization)
        )

    }

    @Roles({ roles: ["Next_admin"] })
    @Patch()
    async updatePointQtd(
        @Headers() headers: HeaderDTO,
        @Body() pointInfo: UpdatePointQtdDTO
    ): Promise<NextResponse<undefined>> {

        await this.service.updatePointQtd(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            pointInfo
        );

        return this.responsesService.dataUpdated();

    }

    @Roles({ roles: ["Next_admin"] })
    @Patch("group/finish")
    async finishPointings(
        @Headers() headers: HeaderDTO,
        @Body() pointInfo: FinishGroupPointingDTO
    ): Promise<NextResponse<undefined>> {

        await this.service.finishGroupingPoint(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            pointInfo
        );

        return this.responsesService.dataUpdated();

    }

}
