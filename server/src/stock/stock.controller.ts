import { Controller, Get, Inject, Headers, Post, Body, Patch, Delete, Query, Sse } from '@nestjs/common';
import { NextResponse } from '../utils/response/types/response.types';
import { CompaniesService } from '../companies/companies.service';
import { ResponseService } from '../utils/response/response.service';
import { StockService } from './stock.service';
import { HeaderDTO } from '../global/DTO/global.dto';
import { ProcessMaterialInfo, StockInfo } from './types/stock.types';
import { AddItemToStockDTO, AddProcessMaterialDTO, DeleteItemFromStockDTO, DeleteProcessMaterialDTO, EditStockItemDTO, FindProcessMaterialsDTO, UpdateProcessMaterialDTO } from './DTO/stock.dto';
import { ProcessMaterialEntity } from '../database/entities/tbl_process_materials.entity';
import { Roles } from 'nest-keycloak-connect';
import { Observable } from 'rxjs';
import { Stringified } from '../global/interfaces/global.interface';

@Controller('stock')
export class StockController {

    constructor(
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(StockService) private service: StockService
    ) { }

    @Roles({ roles: ["Next_admin"] })
    @Sse()
    async findStockItems(
        @Headers() headers: HeaderDTO
    ): Promise<Observable<Stringified<StockInfo[]>>> {
        return await this.service.findStock(
            this.companiesService.findCompanyIdWithToken(headers.authorization)
        )
    }

    @Roles({ roles: ["Next_admin"] })
    @Get("process")
    async findProcessMaterials(
        @Headers() headers: HeaderDTO,
        @Query() processInfo: FindProcessMaterialsDTO
    ): Promise<NextResponse<ProcessMaterialInfo[]>> {
        return this.responsesService.dataFetched(
            await this.service.findProcessMaterials(
                this.companiesService.findCompanyIdWithToken(headers.authorization),
                processInfo.process_id
            )
        );
    }

    @Roles({ roles: ["Next_admin"] })
    @Get("material")
    async findMaterials(
        @Headers() headers: HeaderDTO,
    ): Promise<NextResponse<ProcessMaterialEntity[]>> {
        return this.responsesService.dataFetched(
            await this.service.findMaterials(
                this.companiesService.findCompanyIdWithToken(headers.authorization),
            )
        );
    }

    @Roles({ roles: ["Next_admin"] })
    @Post()
    async addMaterialToStock(
        @Headers() headers: HeaderDTO,
        @Body() stockMaterialInfo: AddItemToStockDTO
    ): Promise<NextResponse<{ material_id: number, stock_id: number }>> {

        return this.responsesService.dataAdded(await this.service.addItemToStock(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            stockMaterialInfo
        ));

    }

    @Roles({ roles: ["Next_admin"] })
    @Post("process")
    async addProcessMaterial(
        @Headers() headers: HeaderDTO,
        @Body() processMaterialInfo: AddProcessMaterialDTO
    ): Promise<NextResponse<{ id: number, material: string }>> {

        return this.responsesService.dataAdded(await this.service.addProcessMaterial(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            processMaterialInfo
        ));

    }

    @Roles({ roles: ["Next_admin"] })
    @Patch()
    async editStockItem(
        @Headers() headers: HeaderDTO,
        @Body() editStockInfo: EditStockItemDTO
    ): Promise<NextResponse<undefined>> {

        await this.service.editStockItem(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            editStockInfo
        );

        return this.responsesService.dataUpdated();

    }

    @Roles({ roles: ["Next_admin"] })
    @Patch("process")
    async updateProcessMaterial(
        @Headers() headers: HeaderDTO,
        @Body() updateProcessMaterialInfo: UpdateProcessMaterialDTO
    ): Promise<NextResponse<undefined>> {

        await this.service.updateProcessMaterial(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            updateProcessMaterialInfo
        );

        return this.responsesService.dataUpdated();
    }

    @Roles({ roles: ["Next_admin"] })
    @Delete()
    async deleteMaterial(
        @Headers() headers: HeaderDTO,
        @Body() deleteMaterialInfo: DeleteItemFromStockDTO
    ): Promise<NextResponse<undefined>> {

        await this.service.deleteMaterial(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            deleteMaterialInfo.stock_id
        );

        return this.responsesService.dataDeleted();

    }

    @Roles({ roles: ["Next_admin"] })
    @Delete("process")
    async deleteProcessMaterial(
        @Headers() headers: HeaderDTO,
        @Body() deleteProcessMaterialInfo: DeleteProcessMaterialDTO
    ): Promise<NextResponse<undefined>> {

        await this.service.deleteProcessMaterial(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            deleteProcessMaterialInfo
        );

        return this.responsesService.dataDeleted();
    }

}
