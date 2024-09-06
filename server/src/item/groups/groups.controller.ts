import { Controller, Get, Headers, Body, Inject, Post, Delete, Param } from '@nestjs/common';
import { NextResponse } from '../../utils/response/types/response.types';
import { GroupingEntity } from '../../database/entities/tbl_groupings.entity';
import { HeaderDTO } from '../../global/DTO/global.dto';
import { GroupsService } from './groups.service';
import { ResponseService } from '../../utils/response/response.service';
import { CompaniesService } from '../../companies/companies.service';
import { AddProcessToGroupingDTO, CreateGroupingDTO, DeleteGroupingDTO, DeleteProcessFromGroupingDTO, FindGroupingProcessesParams } from './DTO/groups.dto';
import { GroupingFullInfo, GroupingProcessInfo } from './types/groups.types';
import { Roles } from 'nest-keycloak-connect';

@Controller('item/groups')
export class GroupsController {

    constructor(
        @Inject(GroupsService) private service: GroupsService,
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
    ) { }

    @Roles({ roles: ["Next_admin"] })
    @Get()
    async findItemGroupings(
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<GroupingFullInfo[]>> {
        return this.responsesService.dataFetched(
            await this.service.findItemGroupings(
                this.companiesService.findCompanyIdWithToken(headers.authorization)
            )
        );
    }

    @Roles({ roles: ["Next_admin"] })
    @Get("/:grouping_id")
    async findGroupingProcesses(
        @Headers() headers: HeaderDTO,
        @Param() params: FindGroupingProcessesParams
    ): Promise<NextResponse<GroupingProcessInfo[]>> {
        return this.responsesService.dataFetched(
            await this.service.findGroupingProcesses(
                this.companiesService.findCompanyIdWithToken(headers.authorization),
                params.grouping_id
            )
        )
    }

    @Roles({ roles: ["Next_admin"] })
    @Post()
    async createItemGrouping(
        @Headers() headers: HeaderDTO,
        @Body() groupingInfo: CreateGroupingDTO
    ): Promise<NextResponse<GroupingEntity[]>> {
        await this.service.createItemGrouping(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            groupingInfo
        )
        return this.responsesService.dataAdded();
    }

    @Roles({ roles: ["Next_admin"] })
    @Post("process")
    async addProcessToGrouping(
        @Headers() headers: HeaderDTO,
        @Body() addProcessInfo: AddProcessToGroupingDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.addProcessToGrouping(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            addProcessInfo
        )
        return this.responsesService.dataAdded();
    }

    @Roles({ roles: ["Next_admin"] })
    @Delete()
    async deleteItemGrouping(
        @Headers() headers: HeaderDTO,
        @Body() groupingInfo: DeleteGroupingDTO
    ): Promise<NextResponse<GroupingEntity[]>> {
        await this.service.deleteItemGrouping(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            groupingInfo
        )
        return this.responsesService.dataDeleted();
    }

    @Roles({ roles: ["Next_admin"] })
    @Delete("process")
    async DeleteProcessFromGroupingDTO(
        @Headers() headers: HeaderDTO,
        @Body() groupingInfo: DeleteProcessFromGroupingDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.deleteProcessFromGrouping(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            groupingInfo
        );
        return this.responsesService.dataDeleted();
    }

}
