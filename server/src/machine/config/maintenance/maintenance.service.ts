import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ResponseService } from '../../../utils/response/response.service';
import { InjectRepository } from '@nestjs/typeorm';
import { MachineMaintenanceEntity } from '../../../database/entities/tbl_machines_maintenance.entity';
import { In, Repository } from 'typeorm';
import { CompleteMachineMaintenanceInfo } from './types/maintenance.types';
import { DateTime } from '../../../utils/datetime/obj/datetime.obj';
import { StringCheckerService } from '../../../utils/string-checker/string-checker.service';
import { Period } from '../../../utils/period/obj/period.obj';
import { MachineRepository } from '../../../database/custom-repositories/machine/machine.repository';
import { uuid } from "uuidv4"

@Injectable()
export class MaintenanceService {

    constructor(
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(StringCheckerService) private stringCheckerService: StringCheckerService,
        @Inject(MachineRepository) private customMachinesRepository: MachineRepository,
        @InjectRepository(MachineMaintenanceEntity) private machinesMaintenanceRepository: Repository<MachineMaintenanceEntity>
    ) { }

    async findMachinesMaintenance(companyId: number): Promise<CompleteMachineMaintenanceInfo[]> {

        return [{
            end_date: "dataFinal",
            end_time: "tempoFinal",
            machine: "Maquina",
            machine_id: 1,
            machine_index: 1,
            maintenance_uuid: "uuid",
            start_date: "dataInicial",
            start_time: "tempoInicial"
        }]

    }

    async addMachineMaintenance(companyId: number, machineId: number, maintenancePeriod: {
        start_date: string,
        end_date: string,
        start_time: string,
        end_time: string
    }, machineIndex: number): Promise<void> {

        return;

    }

    async deleteMachineMaintenance(companyId: number, machineId: number, maintenanceUuid: string, machineIndex: number): Promise<void> {

        return;

    }

}
