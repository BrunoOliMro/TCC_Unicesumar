import { Body, Controller, Delete, Get, Inject, Post, Headers } from '@nestjs/common';
import { NextResponse } from '../../../utils/response/types/response.types';
import { CompleteMachineMaintenanceInfo } from './types/maintenance.types';
import { MaintenanceService } from './maintenance.service';
import { AddMachineMaintenanceDTO, DeleteMachineMaintenanceDTO } from './DTO/maintenance.dto';
import { CompaniesService } from '../../../companies/companies.service';
import { HeaderDTO } from '../../../global/DTO/global.dto';
import { ResponseService } from '../../../utils/response/response.service';

@Controller('machine/config/maintenance')
export class MaintenanceController {

    constructor(
        @Inject(MaintenanceService) private service: MaintenanceService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService
    ) { }

    @Get()
    async findMachinesMaintenance(
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<CompleteMachineMaintenanceInfo[]>> {
        return this.responsesService.dataFetched(
            await this.service.findMachinesMaintenance(this.companiesService.findCompanyIdWithToken(headers.authorization))
        );
    }

    @Post()
    async addMachineMaintenance(
        @Body() maintenanceInfo: AddMachineMaintenanceDTO,
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.addMachineMaintenance(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            maintenanceInfo.machine_id,
            {
                start_date: maintenanceInfo.start_date,
                end_date: maintenanceInfo.end_date,
                start_time: maintenanceInfo.start_time,
                end_time: maintenanceInfo.end_time,
            },
            maintenanceInfo.machine_index
        );
        return this.responsesService.dataAdded();
    }

    @Delete()
    async deleteMachineMaintenance(
        @Body() maintenanceInfo: DeleteMachineMaintenanceDTO,
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.deleteMachineMaintenance(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            maintenanceInfo.machine_id,
            maintenanceInfo.maintenance_uuid,
            maintenanceInfo.machine_index
        );
        return this.responsesService.dataDeleted();
    }

}
