import { Controller, Get, Inject, Query, Sse, Headers, Post, Body, Delete, Patch, HttpException } from '@nestjs/common';
import { NextResponse } from '../utils/response/types/response.types';
import { MachineService } from './machine.service';
import { CreateMachineDTO, DeleteMachineDTO, EditMachineDTO, MachineDTO } from './DTO/machine.dto';
import { Observable } from 'rxjs';
import { CompanyProcessEntity } from '../database/entities/vw_company_processes.entity';
import { Stringified } from '../global/interfaces/global.interface';
import { CompaniesService } from '../companies/companies.service';
import { HeaderDTO } from '../global/DTO/global.dto';
import { MachineFullInfo } from './types/machine.types';
import { ResponseService } from '../utils/response/response.service';
import { ActiveMachineEntity } from '../database/entities/vw_active_machines.entity';
import { Roles } from 'nest-keycloak-connect';

@Controller('machine')
export class MachineController {

    constructor(
        @Inject(MachineService) private service: MachineService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService
    ) { }

    @Roles({ roles: ["Next_user"] })
    @Sse("processes")
    async findMachineSequencedProcesses(
        @Query() machineInfo: MachineDTO,
        @Headers() headers: HeaderDTO
    ): Promise<Observable<Stringified<CompanyProcessEntity & {
        start_datetime: string,
        end_datetime: string,
        process_delayed: 0 | 1
    }>>> {
        return await this.service.findMachineSequencedProcesses(
            this.companiesService.findCompanyIdWithToken(headers.authorization), machineInfo.machine_id, machineInfo.machine_index);
    }

    @Roles({ roles: ["Next_admin"] })
    @Sse()
    async findMachines(
        @Headers() headers: HeaderDTO
    ): Promise<Observable<Stringified<MachineFullInfo>>> {
        return await this.service.findMachinesInfo(
            this.companiesService.findCompanyIdWithToken(headers.authorization)
        );
    }

    @Roles({ roles: ["Next_admin"] })
    @Get("general")
    async findMachinesGeneralInfo(
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<{ machine: string, id: number }[]>> {
        return this.responsesService.dataFetched(await this.service.findMachinesGeneralInfo(
            this.companiesService.findCompanyIdWithToken(headers.authorization)
        ));
    }


    @Roles({ roles: ["Next_user"] })
    @Sse("active")
    async findActiveMachines(
        @Headers() headers: HeaderDTO
    ): Promise<Observable<Stringified<(ActiveMachineEntity & { machine_delayed: 0 | 1 })[]>>> {
        // ): Promise<NextResponse<{ [machineGroup: string]: ActiveMachineEntity[] }>> {
        return await this.service.findActiveMachines(
            this.companiesService.findCompanyIdWithToken(headers.authorization)
        );
    }

    @Roles({ roles: ["Next_admin"] })
    @Post()
    async createMachine(
        @Headers() headers: HeaderDTO,
        @Body() machineInfo: CreateMachineDTO
    ): Promise<NextResponse<{ machine_id: number, machine_index: number }>> {
        return this.responsesService.dataAdded(await this.service.createMachine(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            machineInfo
        ));
    }

    @Roles({ roles: ["Next_admin"] })
    @Patch()
    async editMachine(
        @Headers() headers: HeaderDTO,
        @Body() machineInfo: EditMachineDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.editMachine(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            machineInfo
        );
        return this.responsesService.dataUpdated();
    }

    @Roles({ roles: ["Next_admin"] })
    @Delete()
    async deleteMachine(
        @Headers() headers: HeaderDTO,
        @Body() machineInfo: DeleteMachineDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.deleteMachine(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            machineInfo
        );
        return this.responsesService.dataDeleted();
    }

}
