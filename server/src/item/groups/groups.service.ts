import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { GroupingEntity } from '../../database/entities/tbl_groupings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddProcessToGroupingDTO, CreateGroupingDTO, DeleteGroupingDTO, DeleteProcessFromGroupingDTO } from './DTO/groups.dto';
import { MachineService } from '../../machine/machine.service';
import { ResponseService } from '../../utils/response/response.service';
import { GroupingFullInfo, GroupingProcessInfo } from './types/groups.types';
import { OdfService } from '../../odf/odf.service';
import { StatusService } from '../process/status/status.service';

@Injectable()
export class GroupsService {

    constructor(
        @Inject(MachineService) private machineService: MachineService,
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(forwardRef(() => OdfService)) private odfService: OdfService,
        @Inject(StatusService) private statusService: StatusService,
        @InjectRepository(GroupingEntity) private groupingsRepository: Repository<GroupingEntity>,
    ) { }

    async findItemGroupings(
        companyId: number
    ): Promise<GroupingFullInfo[]> {
        return [
            {
                id: 1,
                item_grouping: "Grupo",
                machine_name: "Maquina"
            }
        ]
    }

    async findGroupingProcesses(
        companyId: number,
        groupingId: number
    ): Promise<GroupingProcessInfo[]> {

        return [
            {
                id: 1,
                item_grouping: "Grupo",
                machine_name: "Maquina",
                odf: "ODF",
                odf_id: 1,
                odf_qtd: 10,
                op_num: 1,
                part_number: "item",
                process_id: 1
            }
        ]

    }

    async createItemGrouping(
        companyId: number,
        groupingInfo: CreateGroupingDTO
    ): Promise<void> {
        return;
    }

    async checkIfGroupingExist(companyId: number, groupingId: number): Promise<void> {
        return;
    }

    async addProcessToGrouping(
        companyId: number,
        addProcessInfo: AddProcessToGroupingDTO
    ): Promise<void> {

        return;

    }

    async deleteProcessFromGrouping(
        companyId: number,
        deleteProcessInfo: DeleteProcessFromGroupingDTO
    ): Promise<void> {

        return;

    }

    async deleteItemGrouping(
        companyId: number,
        groupingInfo: DeleteGroupingDTO
    ): Promise<void> {
        return;
    }

}
