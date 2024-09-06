import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MachineGroupsEntity } from '../../database/entities/tbl_machine_groups.entity';
import { ILike, Repository } from 'typeorm';
import { ResponseService } from '../../utils/response/response.service';

@Injectable()
export class GroupsService {

    constructor(
        @InjectRepository(MachineGroupsEntity) private machinesGroupsRepository: Repository<MachineGroupsEntity>,
        @Inject(ResponseService) private responsesService: ResponseService
    ) { }

    async findGroupingInfoById(
        companyId: number,
        groupingId: number
    ): Promise<MachineGroupsEntity> {

        // Retorna entidade de grupo de maquina
        return {}

    }

    async findMachineGroupByName(
        companyId: number,
        machineGroup: string
    ): Promise<MachineGroupsEntity> {

        // Retorna entidade de grupo de maquina
        return {}

    }

    async findMachineGroups(
        companyId: number
    ): Promise<MachineGroupsEntity[]> {
        // Retorna entidade de grupo de maquina
        return []
    }

    async createMachineGroup(
        companyId: number,
        machineGroup: string
    ): Promise<void> {

        return;

    }

    async deleteMachineGroup(
        companyId: number,
        machineGroupId: number
    ): Promise<void> {

        return;

    }

}
