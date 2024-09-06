import { Body, Controller, Delete, Get, Inject, Post, Headers } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { NextResponse } from '../../../utils/response/types/response.types';
import { MachineShiftInfo } from './types/shifts.types';
import { AddMachineShiftDTO, DeleteMachineShiftDTO } from './DTO/shifts.dto';
import { CompaniesService } from '../../../companies/companies.service';
import { HeaderDTO } from '../../../global/DTO/global.dto';
import { ResponseService } from '../../../utils/response/response.service';

@Controller('/machine/config/shifts')
export class ShiftsController {

    constructor(
        @Inject(ShiftsService) private service: ShiftsService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService
    ) { }

    @Get()
    async findMachinesShifts(
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<MachineShiftInfo[]>> {
        return this.responsesService.dataFetched(await this.service.findMachinesShifts(
            this.companiesService.findCompanyIdWithToken(headers.authorization)
        ))
    }

    @Post()
    async addMachineShift(
        @Body() machineShiftInfo: AddMachineShiftDTO,
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.addMachineShift(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            machineShiftInfo.machine_id,
            machineShiftInfo.start_time,
            machineShiftInfo.end_time,
            machineShiftInfo.machine_index
        );
        return this.responsesService.dataAdded();
    }

    @Delete()
    async deleteMachineShift(
        @Body() body: DeleteMachineShiftDTO,
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.deleteMachineShift(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            body.machine_id,
            body.shift_id,
            body.machine_index,
        );
        return this.responsesService.dataDeleted();
    }

}
