import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PartNumberTypeEntity } from '../../database/entities/tbl_part_number_types.entity';
import { CreateItemTypeDTO, DeleteItemTypeDTO, EditItemTypeDTO } from './DTO/item_types.dto';
import { ResponseService } from '../../utils/response/response.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemTypesService {

    constructor(
        @Inject(ResponseService) private responsesService: ResponseService,
        @InjectRepository(PartNumberTypeEntity) private itemTypeRepository: Repository<PartNumberTypeEntity>
    ) { }

    async itemTypeExists(
        companyId: number,
        itemType: string
    ): Promise<boolean> {

        return true;

    }

    async findItemTypes(
        companyId: number
    ): Promise<PartNumberTypeEntity[]> {

        // Retorna entidade de tipo de item
        return []

    }

    async createItemType(
        companyId: number,
        itemTypeInfo: CreateItemTypeDTO
    ): Promise<void> {

        return;

    }

    async editItemType(
        companyId: number,
        itemTypeInfo: EditItemTypeDTO
    ): Promise<void> {

        return;

    }

    async deleteItemType(
        companyId: number,
        itemTypeInfo: DeleteItemTypeDTO
    ): Promise<void> {

        return;

    }

}
