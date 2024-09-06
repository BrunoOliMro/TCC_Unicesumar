import { Controller, Get, Inject, Headers, Post, Body, Patch, Delete } from '@nestjs/common';
import { ResponseService } from '../../utils/response/response.service';
import { ItemTypesService } from './item_types.service';
import { CompaniesService } from '../../companies/companies.service';
import { HeaderDTO } from '../../global/DTO/global.dto';
import { NextResponse } from '../../utils/response/types/response.types';
import { PartNumberTypeEntity } from '../../database/entities/tbl_part_number_types.entity';
import { CreateItemTypeDTO, DeleteItemTypeDTO, EditItemTypeDTO } from './DTO/item_types.dto';
import { Roles } from 'nest-keycloak-connect';

@Controller('item-types')
export class ItemTypesController {

    constructor(
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(ItemTypesService) private service: ItemTypesService,
        @Inject(CompaniesService) private companiesService: CompaniesService
    ) { }

    @Roles({ roles: ["Next_admin"] })
    @Get()
    async findItemTypes(
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<PartNumberTypeEntity[]>> {
        const partNumberTypes = await this.service.findItemTypes(
            this.companiesService.findCompanyIdWithToken(headers.authorization)
        );
        return this.responsesService.dataFetched(partNumberTypes);
    }

    @Roles({ roles: ["Next_admin"] })
    @Post()
    async createItemType(
        @Headers() headers: HeaderDTO,
        @Body() itemTypeInfo: CreateItemTypeDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.createItemType(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            itemTypeInfo
        );
        return this.responsesService.dataAdded();
    }

    @Roles({ roles: ["Next_admin"] })
    @Patch()
    async editItemType(
        @Headers() headers: HeaderDTO,
        @Body() itemTypeInfo: EditItemTypeDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.editItemType(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            itemTypeInfo
        );
        return this.responsesService.dataUpdated();
    }

    @Roles({ roles: ["Next_admin"] })
    @Delete()
    async deleteItemType(
        @Headers() headers: HeaderDTO,
        @Body() itemTypeInfo: DeleteItemTypeDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.deleteItemType(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            itemTypeInfo
        );
        return this.responsesService.dataDeleted();
    }

}
