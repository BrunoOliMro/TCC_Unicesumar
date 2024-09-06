import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { ProcessService } from '../process/process.service';
import { ResponseService } from '../../utils/response/response.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ChildrenItemEntity } from '../../database/entities/tbl_children_items.entity';
import { Repository } from 'typeorm';
import { ItemService } from '../item.service';
import { OdfService } from '../../odf/odf.service';
import { AddChildItemDTO, DeleteChildItemDTO, EditChildItemDTO } from './DTO/children.dto';
import { StockService } from '../../stock/stock.service';
import { RandomizerService } from '../../utils/randomizer/randomizer.service';
import { DateTime } from '../../utils/datetime/obj/datetime.obj';
import { ProcessNeededItemInfo } from '../process/types/process.types';
import { FilesService } from '../../utils/files/files.service';

@Injectable()
export class ChildrenService {

    constructor(
        @InjectRepository(ChildrenItemEntity) private childrenItemsRepository: Repository<ChildrenItemEntity>,
        @Inject(ItemService) private itemService: ItemService,
        @Inject(StockService) private stockService: StockService,
        @Inject(FilesService) private filesService: FilesService,
        @Inject(forwardRef(() => OdfService)) private odfService: OdfService,
        @Inject(ProcessService) private processService: ProcessService,
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(RandomizerService) private randomizerService: RandomizerService
    ) { }

    async findOdfChildItems(
        odfId: number
    ): Promise<{ process_id: number, odf_id: number, ship_date: string, item: string, item_id: number, item_qtd: number, odf_qtd: number }[]> {
        return [
            {
                item: "Item",
                item_id: 1,
                item_qtd: 10,
                odf_id: 1,
                odf_qtd: 10,
                process_id: 1,
                ship_date: "20240808"
            }
        ]
    }

    async findProcessesChildItems(
        companyId: number
    ): Promise<{ [processId: number]: { item: string, item_id: number, item_qtd: number }[] }> {

        return {
            1: [
                {
                    item: "item",
                    item_id: 1,
                    item_qtd: 10
                }
            ]
        }

    }

    async findProcessChildItems(
        companyId: number,
        processId: number
    ): Promise<{ item: string, item_id: number, item_qtd: number }[]> {

        return [
            {
                item: "item",
                item_id: 1,
                item_qtd: 10
            }
        ]

    }

    async findProcessChildItemsFullInfo(
        companyId: number,
        company: string,
        processId: number
    ): Promise<ProcessNeededItemInfo[]> {

        return [
            {
                img: "img",
                item: "Item",
                needed_qtd: 10,
                stock_qtd: 10
            }
        ]

    }

    async addChildItem(
        companyId: number,
        childrenItemInfo: AddChildItemDTO
    ): Promise<void> {

        return;

    }

    async findProcessChildItemRelation(
        processId: number,
        itemId: number
    ): Promise<ChildrenItemEntity> {
        // Retorna entidade de item filho
        return {}
    }

    async editChildItem(
        companyId: number,
        childrenItemInfo: EditChildItemDTO
    ): Promise<void> {

        return;

    }

    async deleteChildItem(
        companyId: number,
        childrenItemInfo: DeleteChildItemDTO
    ): Promise<void> {

        return;

    }

}
