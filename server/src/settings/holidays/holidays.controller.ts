import { Body, Controller, Delete, Get, Inject, Post, Headers } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { NextResponse } from '../../utils/response/types/response.types';
import { HolidayEntity } from '../../database/entities/tbl_holidays.entity';
import { AddHolidayDTO, DeleteHolidayDTO } from './DTO/holidays.dto';
import { CompaniesService } from '../../companies/companies.service';
import { HeaderDTO } from '../../global/DTO/global.dto';
import { ResponseService } from '../../utils/response/response.service';
import { Roles } from 'nest-keycloak-connect';

@Controller('holidays')
export class HolidaysController {

    constructor(
        @Inject(HolidaysService) private service: HolidaysService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService
    ) { }

    @Roles({ roles: ["Next_admin"] })
    @Get()
    async findCompanyHolidays(
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<HolidayEntity[]>> {
        return this.responsesService.dataFetched(await this.service.findCompanyHolidays(
            this.companiesService.findCompanyIdWithToken(headers.authorization)
        ))
    }

    @Roles({ roles: ["Next_admin"] })
    @Post()
    async addCompanyHoliday(
        @Body() holidayInfo: AddHolidayDTO,
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<HolidayEntity>> {
        await this.service.addCompanyHoliday(this.companiesService.findCompanyIdWithToken(headers.authorization),
            holidayInfo.holiday_date);
        return this.responsesService.dataAdded();
    }

    @Roles({ roles: ["Next_admin"] })
    @Delete()
    async deleteCompanyHoliday(
        @Body() holidayInfo: DeleteHolidayDTO,
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<HolidayEntity>> {
        await this.service.deleteCompanyHoliday(this.companiesService.findCompanyIdWithToken(headers.authorization),
            holidayInfo.holiday_id);
        return this.responsesService.dataDeleted();
    }

}
