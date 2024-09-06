import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { ActiveMachineEntity } from '../database/entities/vw_active_machines.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MachineEntity } from '../database/entities/tbl_machines.entity';
import { ResponseService } from '../utils/response/response.service';
import { Observable, Subject } from 'rxjs';
import { CompanyProcessEntity } from '../database/entities/vw_company_processes.entity';
import { Stringified } from '../global/interfaces/global.interface';
import { MachineFullInfo } from './types/machine.types';
import { CreateMachineDTO, DeleteMachineDTO, EditMachineDTO } from './DTO/machine.dto';
import { GroupsService } from './groups/groups.service';
import { ProcessService } from '../item/process/process.service';
import { DateTime } from '../utils/datetime/obj/datetime.obj';
import { FilesService } from '../utils/files/files.service';
import { MachineInfoEntity } from '../database/entities/tbl_machines_info.entity';
import { CompaniesService } from '../companies/companies.service';
import { ReadStream } from 'typeorm/platform/PlatformTools';

@Injectable()
export class MachineService {

    constructor(
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(GroupsService) private groupsService: GroupsService,
        @Inject(FilesService) private filesService: FilesService,
        @Inject(forwardRef(() => ProcessService)) private processService: ProcessService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @InjectRepository(ActiveMachineEntity) private activeMachinesRepository: Repository<ActiveMachineEntity>,
        @InjectRepository(MachineEntity) private machinesRepository: Repository<MachineEntity>,
        @InjectRepository(MachineInfoEntity) private machinesInfoRepository: Repository<MachineInfoEntity>
    ) { }

    async findMachineByName(
        companyId: number,
        machine: string
    ): Promise<MachineEntity[]> {

        // Retorna entidade de maquina
        return []

    }

    async findMachineById(
        companyId: number,
        machineId: number
    ): Promise<MachineEntity> {

        // Retorna entidade de maquina
        return {};

    }

    async findMachinesInfo(
        companyId: number
    ): Promise<Observable<Stringified<MachineFullInfo>>> {

        // Retorna stream de máquinas
        return new ReadStream()

    }

    async findMachinesGeneralInfo(companyId: number): Promise<{ machine: string, id: number }[]> {

        return [{
            id: 1,
            machine: "maquina"
        }]

    }

    async createMachine(
        companyId: number,
        machineInfo: CreateMachineDTO
    ): Promise<{ machine_id: number, machine_index: number }> {

        return {
            machine_id: 1,
            machine_index: 1
        }

    }

    async editMachine(
        companyId: number,
        machineInfo: EditMachineDTO
    ): Promise<void> {

        return;

    }

    async deleteMachine(
        companyId: number,
        machineInfo: DeleteMachineDTO
    ): Promise<void> {

        return;

    }

    async findActiveMachines(companyId: number): Promise<Observable<Stringified<(ActiveMachineEntity & { machine_delayed: 0 | 1 })[]>>> {

        // Retorna stream de máquinas ativas
        return new ReadStream()

    }

    async findMachineSequencedProcesses(companyId: number, machineId: number, machineIndex: number): Promise<Observable<Stringified<CompanyProcessEntity & {
        start_datetime: string,
        end_datetime: string,
        process_delayed: 0 | 1,
        item_img: string
    }>>> {

        // Retorna stream de processos da máquina
        return new ReadStream()

    }

}
