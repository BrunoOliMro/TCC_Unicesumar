import { Body, Controller, Delete, Get, Headers, Inject, Param, Patch, Post } from '@nestjs/common';
import { NextResponse } from '../../utils/response/types/response.types';
import { CompaniesService } from '../../companies/companies.service';
import { ResponseService } from '../../utils/response/response.service';
import { ChildrenService } from './children.service';
import { HeaderDTO } from '../../global/DTO/global.dto';
import { AddChildItemDTO, FindProcessChildItemsParamsDTO, DeleteChildItemDTO, EditChildItemDTO } from './DTO/children.dto';

@Controller('children')
export class ChildrenController {

    constructor(
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(ChildrenService) private service: ChildrenService
    ) { }

    @Get("/:process_id")
    async findProcessChildItems(
        @Headers() headers: HeaderDTO,
        @Param() params: FindProcessChildItemsParamsDTO
    ): Promise<NextResponse<{ item: string, item_id: number, item_qtd: number }[]>> {
        return this.responsesService.dataFetched(
            await this.service.findProcessChildItems(
                this.companiesService.findCompanyIdWithToken(headers.authorization),
                params.process_id
            )
        );
    }

    @Post()
    async addProcessChildItem(
        @Headers() headers: HeaderDTO,
        @Body() processChildrenInfo: AddChildItemDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.addChildItem(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            processChildrenInfo
        );
        return this.responsesService.dataAdded();
    }

    @Patch()
    async editProcessChildItem(
        @Headers() headers: HeaderDTO,
        @Body() processChildrenInfo: EditChildItemDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.editChildItem(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            processChildrenInfo
        );
        return this.responsesService.dataUpdated();
    }

    @Delete()
    async deleteProcessChildItem(
        @Headers() headers: HeaderDTO,
        @Body() processChildrenInfo: DeleteChildItemDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.deleteChildItem(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            processChildrenInfo
        );
        return this.responsesService.dataAdded();
    }

}
