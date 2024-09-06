import { Controller, Inject, Post, Headers, Body, Get, Delete } from '@nestjs/common';
import { CoreService } from './core.service';
import { NextResponse } from '../utils/response/types/response.types';
import { CompaniesService } from '../companies/companies.service';
import { HeaderDTO } from '../global/DTO/global.dto';
import { ResponseService } from '../utils/response/response.service';
import { AuthService } from '../auth/auth.service';
import { Roles } from 'nest-keycloak-connect';
import { AddSequenceTimerDTO, DeleteSequenceTimerDTO } from './DTO/core.dto';
import { CompanySequenceTimersEntity } from '../database/entities/tbl_companies_sequence_timers.entity';

@Controller('core')
export class CoreController {

    constructor(
        @Inject(CoreService) private service: CoreService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService,
    ) { }

    @Roles({ roles: ["Next_admin"] })
    @Get("timers")
    async findCompanyTimers(
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<CompanySequenceTimersEntity[]>> {

        return this.responsesService.dataFetched(await this.companiesService.findCompanySequenceTimers(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
        ))

    }

    @Roles({ roles: ["Next_admin"] })
    @Post()
    async sequence(
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<undefined>> {
        return this.responsesService.processExecuted();
    }

    @Roles({ roles: ["Next_admin"] })
    @Post("timers")
    async addSequenceTimer(
        @Headers() headers: HeaderDTO,
        @Body() sequenceTimerInfo: AddSequenceTimerDTO
    ): Promise<NextResponse<number>> {

        return this.responsesService.dataAdded(await this.service.addSequenceTimer(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            sequenceTimerInfo.sequence_timer
        ));

    }

    @Roles({ roles: ["Next_admin"] })
    @Delete("timers")
    async deleteSequenceTimer(
        @Headers() headers: HeaderDTO,
        @Body() sequenceTimerInfo: DeleteSequenceTimerDTO
    ): Promise<NextResponse<number>> {

        await this.service.deleteSequenceTimer(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            sequenceTimerInfo.sequence_timer_id
        )

        return this.responsesService.dataDeleted();

    }



}
