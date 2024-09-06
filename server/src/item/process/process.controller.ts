import { Controller, Inject, Sse, Headers, Get, Post, Body, Patch, Delete, Param, Query } from '@nestjs/common';
import { ProcessService } from './process.service';
import { Observable } from 'rxjs';
import { Stringified } from '../../global/interfaces/global.interface';
import { CompaniesService } from '../../companies/companies.service';
import { HeaderDTO } from '../../global/DTO/global.dto';
import { NextResponse } from '../../utils/response/types/response.types';
import { CompanyItemProcessInfo, ProcessNeededItemInfo, SequenceCount } from './types/process.types';
import { CreateItemProcessDTO, DeleteItemProcessDTO, EditItemProcessDTO, FindPartNumberProcessesDTO, FindProcessNeededItemsInfoDTO } from './DTO/process.dto';
import { ResponseService } from '../../utils/response/response.service';
import { ItemProcessInfo } from '../types/item.types';
import { Roles } from 'nest-keycloak-connect';

@Controller('process')
export class ProcessController {

    constructor(
        @Inject(ProcessService) private service: ProcessService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService
    ) { }

    @Roles({ roles: ["Next_admin"] })
    @Sse()
    async findAllItemProcesses(
        @Headers() headers: HeaderDTO,
    ): Promise<Observable<Stringified<CompanyItemProcessInfo>>> {
        return await this.service.findAllCompanyProcessesStream(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
        );
    }

    @Roles({ roles: ["Next_admin"] })
    @Get("item")
    async findItemProcesses(
        @Headers() headers: HeaderDTO,
        @Query() partNumberInfo: FindPartNumberProcessesDTO
    ): Promise<NextResponse<ItemProcessInfo[]>> {
        return this.responsesService.dataFetched(await this.service.findAllItemProcesses(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            partNumberInfo.item_id
        ));
    }

    @Roles({ roles: ["Next_admin"] })
    @Get("sequence-count")
    async findProcessesSequenceCount(
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<SequenceCount>> {
        return this.responsesService.dataFetched(await this.service.findProcessesSequenceCount(
            this.companiesService.findCompanyIdWithToken(headers.authorization)
        ));
    }

    @Roles({ roles: ["Next_user"] })
    @Get("detail/items")
    async findProcessNeededItemsInfo(
        @Headers() headers: HeaderDTO,
        @Query() processInfo: FindProcessNeededItemsInfoDTO
    ): Promise<NextResponse<ProcessNeededItemInfo[]>> {
        return this.responsesService.dataFetched(await this.service.findProcessNeededItemsInfo(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            processInfo.process_id
        ));
    }

    @Roles({ roles: ["Next_admin"] })
    @Post()
    async createItemProcess(
        @Headers() headers: HeaderDTO,
        @Body() itemProcessInfo: CreateItemProcessDTO
    ): Promise<NextResponse<{ process_id: number, item: string }>> {
        return this.responsesService.dataAdded(await this.service.createItemProcess(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            itemProcessInfo
        ));
    }

    @Roles({ roles: ["Next_admin"] })
    @Patch()
    async editItemProcess(
        @Headers() headers: HeaderDTO,
        @Body() itemProcessInfo: EditItemProcessDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.editItemProcess(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            itemProcessInfo
        );
        return this.responsesService.dataUpdated();
    }

    @Roles({ roles: ["Next_admin"] })
    @Delete()
    async deleteItemProcess(
        @Headers() headers: HeaderDTO,
        @Body() itemProcessInfo: DeleteItemProcessDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.deleteItemProcess(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            itemProcessInfo.process_id
        );
        return this.responsesService.dataDeleted();
    }


}
