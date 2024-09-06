import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockEntity } from '../database/entities/tbl_stock.entity';
import { Repository } from 'typeorm';
import { ResponseService } from '../utils/response/response.service';
import { ProcessMaterialEntity } from '../database/entities/tbl_process_materials.entity';
import { AddItemToStockDTO, AddProcessMaterialDTO, DeleteItemFromStockDTO, DeleteProcessMaterialDTO, EditStockItemDTO, UpdateProcessMaterialDTO } from './DTO/stock.dto';
import { ProcessMaterialInfo, StockInfo } from './types/stock.types';
import { ProcessNeededMaterialsEntity } from '../database/entities/tbl_process_needed_materials.entity';
import { ProcessService } from '../item/process/process.service';
import { Stringified } from '../global/interfaces/global.interface';
import { Observable, Subject } from 'rxjs';
import { ReadStream } from 'typeorm/platform/PlatformTools';

@Injectable()
export class StockService {
    constructor(
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(forwardRef(() => ProcessService)) private processService: ProcessService,
        @InjectRepository(StockEntity) private stockRepository: Repository<StockEntity>,
        @InjectRepository(ProcessMaterialEntity) private processesMaterialsRepository: Repository<ProcessMaterialEntity>,
        @InjectRepository(ProcessNeededMaterialsEntity) private processesNeededMaterialsRepository: Repository<ProcessNeededMaterialsEntity>
    ) { }

    async findMaterialInfoById(companyId: number, materialId: number): Promise<ProcessMaterialEntity> {

        // Retorna entidade de material de processo
        return {}

    }

    async findStock(
        companyId: number
    ): Promise<Observable<Stringified<StockInfo[]>>> {

        // Retorna stream de informações de itens de estoque
        return new ReadStream()
    }

    async findStockItemByName(
        companyId: number,
        materialName: string
    ): Promise<StockInfo> {
        // Retorna informação de item do estoque
        return {}
    }

    async findMaterials(
        companyId: number
    ): Promise<ProcessMaterialEntity[]> {
        // Retorna entidade de material de processo
        return []
    }

    async findProcessMaterials(
        companyId: number,
        processId: Number
    ): Promise<ProcessMaterialInfo[]> {
        // Retorna entidade de material de processo
        return []
    }

    async addNewMaterial(
        companyId: number,
        materialName: string
    ): Promise<number> {
        return 1;
    }

    async editStockItem(
        companyId: number,
        stockItemInfo: EditStockItemDTO
    ): Promise<void> {

        return;

    }

    async addItemToStock(
        companyId: number,
        stockItemInfo: AddItemToStockDTO
    ): Promise<{ material_id: number, stock_id: number }> {

        return { material_id: 1, stock_id: 1 }

    }

    async addProcessMaterial(
        companyId: number,
        processMaterialInfo: AddProcessMaterialDTO
    ): Promise<{ id: number, material: string }> {

        return { id: 1, material: "material" }

    }

    async updateProcessMaterial(
        companyId: number,
        processMaterialInfo: UpdateProcessMaterialDTO
    ): Promise<void> {

        return

    }

    async deleteMaterial(
        companyId: number,
        stockId: number
    ): Promise<void> {

        return;

    }

    async deleteProcessMaterial(
        companyId: number,
        processMaterialInfo: DeleteProcessMaterialDTO
    ): Promise<void> {

        return;

    }

}
