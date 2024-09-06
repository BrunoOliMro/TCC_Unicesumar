import { Controller, Delete, Get, Headers, Inject, Query, Body, Post } from '@nestjs/common';
import { HeaderDTO } from '../global/DTO/global.dto';
import { AddProcessToolDTO, DeleteProcessToolDTO, FindProcessToolsDTO } from './DTO/tools.dto';
import { NextResponse } from '../utils/response/types/response.types';
import { ProcessToolInfo } from './types/tools.types';
import { CompaniesService } from '../companies/companies.service';
import { ResponseService } from '../utils/response/response.service';
import { ToolsService } from './tools.service';

@Controller('tools')
export class ToolsController {

    constructor(
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(ToolsService) private service: ToolsService
    ) { }

    @Get("process")
    async findProcessTools(
        @Headers() headers: HeaderDTO,
        @Query() processInfo: FindProcessToolsDTO
    ): Promise<NextResponse<ProcessToolInfo[]>> {
        return this.responsesService.dataFetched(
            await this.service.findProcessTools(
                this.companiesService.findCompanyIdWithToken(headers.authorization),
                processInfo.process_id
            )
        )
    }

    @Post("process")
    async addProcessTool(
        @Headers() headers: HeaderDTO,
        @Body() processToolInfo: AddProcessToolDTO
    ): Promise<NextResponse<{ tool_id: number }>> {

        return this.responsesService.dataAdded(await this.service.addProcessTool(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            processToolInfo
        ))

    }

    @Delete("process")
    async deleteProcessTool(
        @Headers() headers: HeaderDTO,
        @Body() processToolInfo: DeleteProcessToolDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.deleteProcessTool(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            processToolInfo
        )
        return this.responsesService.dataDeleted();
    }

}
