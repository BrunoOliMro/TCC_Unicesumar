import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MachineEntity } from '../../entities/tbl_machines.entity';
import { Repository } from 'typeorm';
import { ResponseService } from '../../../utils/response/response.service';

@Injectable()
export class MachineRepository {

    constructor(
        @Inject(ResponseService) private responsesService: ResponseService,
        @InjectRepository(MachineEntity) private machinesRepository: Repository<MachineEntity>
    ) { }

    async checkIfMachineIsFromCompany(machineId: number, companyId: number): Promise<void> {

        return;

    }

}
