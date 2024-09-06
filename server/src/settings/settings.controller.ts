import { Body, Controller, Delete, Get, Inject, Patch, Post, Headers } from '@nestjs/common';
import { NextResponse } from '../utils/response/types/response.types';
import { CompanySettingsEntity } from '../database/entities/tbl_companies_settings.entity';
import { SettingsService } from './settings.service';
import { AddInvalidDaysDTO, DeleteInvalidDayDTO, UpdateGeneralSettingsDTO, UpdateSequencePrioritiesDTO } from './DTO/settings.dto';
import { CompaniesService } from '../companies/companies.service';
import { HeaderDTO } from '../global/DTO/global.dto';
import { ResponseService } from '../utils/response/response.service';
import { SequencePriorityEntity } from '../database/entities/tbl_sequence_priorities.entity';
import { Roles } from 'nest-keycloak-connect';

@Controller('settings')
export class SettingsController {

    constructor(
        @Inject(SettingsService) private service: SettingsService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService
    ) { }

    @Roles({ roles: ["Next_admin"] })
    @Get()
    async findGeneralSettings(
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<CompanySettingsEntity>> {
        return this.responsesService.dataFetched(await this.service.findGeneralSettings(
            this.companiesService.findCompanyIdWithToken(headers.authorization)
        ))
    }

    @Roles({ roles: ["Next_admin"] })
    @Get("sequence-priorities")
    async findSequencePriorities(
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<SequencePriorityEntity[]>> {
        return this.responsesService.dataFetched(await this.service.findSequencePriorities(
            this.companiesService.findCompanyIdWithToken(headers.authorization)
        ));
    }

    @Roles({ roles: ["Next_admin"] })
    @Get("days/invalid")
    async findInvalidDays(
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<number[]>> {
        return this.responsesService.dataFetched(await this.service.findInvalidDays(
            this.companiesService.findCompanyIdWithToken(headers.authorization)
        ));
    }

    @Roles({ roles: ["Next_admin"] })
    @Post("days/invalid")
    async addInvalidDays(
        @Body() invalidDayInfo: AddInvalidDaysDTO,
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.addInvalidDays(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            invalidDayInfo.invalid_days
        );
        return this.responsesService.dataAdded();
    }

    @Roles({ roles: ["Next_admin"] })
    @Patch("sequence-priorities")
    async updateSequencePriorities(
        @Headers() headers: HeaderDTO,
        @Body() sequencePriorities: UpdateSequencePrioritiesDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.updateSequencePriorities(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            sequencePriorities
        );
        return this.responsesService.dataUpdated();
    }

    @Roles({ roles: ["Next_admin"] })
    @Patch()
    async updateGeneralSettings(
        @Body() generalSettings: UpdateGeneralSettingsDTO,
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.updateGeneralSettings(this.companiesService.findCompanyIdWithToken(headers.authorization),
            generalSettings);
        return this.responsesService.dataUpdated();
    }

    @Roles({ roles: ["Next_admin"] })
    @Delete("days/invalid")
    async deleteInvalidDay(
        @Body() invalidDayInfo: DeleteInvalidDayDTO,
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.deleteInvalidDay(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            invalidDayInfo.invalid_day
        );
        return this.responsesService.dataDeleted();
    }

}
