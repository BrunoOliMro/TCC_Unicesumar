import { Controller, Inject, Headers, Body, Get, Post, Delete, Patch, Query, Sse } from '@nestjs/common';
import { ItemService } from './item.service';
import { CompaniesService } from '../companies/companies.service';
import { HeaderDTO } from '../global/DTO/global.dto';
import { NextResponse } from '../utils/response/types/response.types';
import { GeneralItemInfo } from './types/item.types';
import { CreateItemDTO, DeleteItemDTO, EditItemDTO } from './DTO/item.dto';
import { ResponseService } from '../utils/response/response.service';
import { Roles } from 'nest-keycloak-connect';
import { Observable } from 'rxjs';
import { Stringified } from '../global/interfaces/global.interface';

@Controller('item')
export class ItemController {

    constructor(
        @Inject(ItemService) private service: ItemService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService
    ) { }

    @Roles({ roles: ["Next_admin"] })
    @Sse()
    async findItems(
        @Headers() headers: HeaderDTO
    ): Promise<Observable<Stringified<GeneralItemInfo>>> {
        return await this.service.findItems(
            this.companiesService.findCompanyIdWithToken(headers.authorization)
        );
    }

    @Roles({ roles: ["Next_admin"] })
    @Post()
    async createItem(
        @Headers() headers: HeaderDTO,
        @Body() itemInfo: CreateItemDTO
    ): Promise<NextResponse<{ item_id: number }>> {
        return this.responsesService.dataAdded<{ item_id: number }>(await this.service.createItem(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            itemInfo
        ));

    }

    @Roles({ roles: ["Next_admin"] })
    @Patch()
    async editItem(
        @Headers() headers: HeaderDTO,
        @Body() itemInfo: EditItemDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.editItem(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            itemInfo
        );
        return this.responsesService.dataUpdated();
    }

    @Roles({ roles: ["Next_admin"] })
    @Delete()
    async deleteItem(
        @Headers() headers: HeaderDTO,
        @Body() itemInfo: DeleteItemDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.deleteItem(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            itemInfo
        );
        return this.responsesService.dataDeleted();
    }

}
