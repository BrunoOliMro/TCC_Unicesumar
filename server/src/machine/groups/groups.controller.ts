import { Controller, Get, Headers, Post, Delete, Body, Inject } from '@nestjs/common';
import { HeaderDTO } from '../../global/DTO/global.dto';
import { NextResponse } from '../../utils/response/types/response.types';
import { GroupsService } from './groups.service';
import { MachineGroupsEntity } from '../../database/entities/tbl_machine_groups.entity';
import { CompaniesService } from '../../companies/companies.service';
import { CreateMachineGroupDTO, DeleteMachineGroupDTO } from './DTO/groups.dto';
import { ResponseService } from '../../utils/response/response.service';
import { Roles } from 'nest-keycloak-connect';

@Controller('machine/groups')
export class GroupsController {

    constructor(
        @Inject(GroupsService) private service: GroupsService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService
    ) { }

    @Roles({ roles: ["Next_admin"] })
    @Get()
    async findMachineGroups(
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<MachineGroupsEntity[]>> {
        return this.responsesService.dataFetched(await this.service.findMachineGroups(
            this.companiesService.findCompanyIdWithToken(headers.authorization)
        ));
    }

    @Roles({ roles: ["Next_admin"] })
    @Post()
    async createMachineGroup(
        @Headers() headers: HeaderDTO,
        @Body() machineGroupInfo: CreateMachineGroupDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.createMachineGroup(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            machineGroupInfo.machine_group
        );
        return this.responsesService.dataAdded();
    }

    @Roles({ roles: ["Next_admin"] })
    @Delete()
    async deleteMachineGroup(
        @Headers() headers: HeaderDTO,
        @Body() machineGroupInfo: DeleteMachineGroupDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.deleteMachineGroup(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            machineGroupInfo.machine_group_id
        );
        return this.responsesService.dataDeleted();
    }

}
