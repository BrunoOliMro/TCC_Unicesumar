import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartNumberEntity } from '../database/entities/tbl_part_numbers.entity';
import { Repository } from 'typeorm';
import { ResponseService } from '../utils/response/response.service';
import { GeneralItemInfo } from './types/item.types';
import { CreateItemDTO, DeleteItemDTO, EditItemDTO } from './DTO/item.dto';
import { ProcessService } from './process/process.service';
import { FilesService } from '../utils/files/files.service';
import { OdfService } from '../odf/odf.service';
import { Observable, Subject } from 'rxjs';
import { Stringified } from '../global/interfaces/global.interface';
import { CompaniesService } from '../companies/companies.service';
import { ReadStream } from 'typeorm/platform/PlatformTools';

@Injectable()
export class ItemService {

    constructor(
        @InjectRepository(PartNumberEntity) private partNumbersRepository: Repository<PartNumberEntity>,
        @Inject(forwardRef(() => ProcessService)) private processService: ProcessService,
        @Inject(forwardRef(() => OdfService)) private odfService: OdfService,
        @Inject(FilesService) private filesService: FilesService,
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(CompaniesService) private companiesService: CompaniesService
    ) { }

    async itemExistsById(
        companyId: number,
        itemId: number
    ): Promise<boolean> {

        return true;

    }

    async findItem(
        companyId: number,
        itemId: number
    ): Promise<PartNumberEntity> {
        // Retorna entidade de item
        return {}
    }

    async findItems(
        companyId: number
    ): Promise<Observable<Stringified<GeneralItemInfo>>> {

        // Retorna stream de itens
        return new ReadStream()

    }

    async createItem(
        companyId: number,
        itemInfo: CreateItemDTO
    ): Promise<{ item_id: number }> {

        return {
            item_id: 1
        }

    }

    async editItem(
        companyId: number,
        itemInfo: EditItemDTO
    ): Promise<void> {

        return;

    }

    async deleteItem(
        companyId: number,
        itemInfo: DeleteItemDTO
    ): Promise<void> {

        return;

    }

}
