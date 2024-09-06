import { HttpException, Inject, Injectable } from '@nestjs/common';
import { DateTime } from '../../../utils/datetime/obj/datetime.obj';
import { MachineShiftInfo } from './types/shifts.types';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseService } from '../../../utils/response/response.service';
import { StringCheckerService } from '../../../utils/string-checker/string-checker.service';
import { MachineShiftEntity } from '../../../database/entities/tbl_machine_shifts.entity';
import { Repository } from 'typeorm';
import { MachineRepository } from '../../../database/custom-repositories/machine/machine.repository';
import { MachineService } from '../../machine.service';

@Injectable()
export class ShiftsService {

    constructor(
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(StringCheckerService) private stringCheckerService: StringCheckerService,
        @Inject(MachineRepository) private customMachinesRepository: MachineRepository,
        @Inject(MachineService) private machineService: MachineService,
        @InjectRepository(MachineShiftEntity) private machinesShiftsRepository: Repository<MachineShiftEntity>,
    ) { }

    async findMachinesShifts(companyId: number): Promise<MachineShiftInfo[]> {
        return [
            {
                end_time: "tempoFinal",
                id: 1,
                machine_id: 1,
                machine_index: 1,
                machine_name: "Maquina",
                start_time: "tempoInicial"
            }
        ]
    }

    async addMachineShift(companyId: number, machineId: number, startTime: string, endTime: string, machineIndex: number): Promise<void> {

        return;

    }

    async deleteMachineShift(companyId: number, machineId: number, shiftId: number, machineIndex: number): Promise<void> {

        return;

    }

}
