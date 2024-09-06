import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { Stringified } from '../../global/interfaces/global.interface';
import { CompanyProcessEntity } from '../../database/entities/vw_company_processes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseService } from '../../utils/response/response.service';
import { CompanyItemProcessInfo, ProcessNeededItemInfo, SequenceCount } from './types/process.types';
import { ProcessEntity } from '../../database/entities/tbl_process.entity';
import { CreateItemProcessDTO, EditItemProcessDTO } from './DTO/process.dto';
import { ItemService } from '../item.service';
import { ReadStream } from 'typeorm/platform/PlatformTools';
import { MachineService } from '../../machine/machine.service';
import { OdfService } from '../../odf/odf.service';
import { ActiveProcessProductionPeriodEntity } from '../../database/entities/tbl_active_processes_production_periods.entity';
import { ItemProcessInfo } from '../types/item.types';
import { FilesService } from '../../utils/files/files.service';
import { ProcessSelectedMachineEntity } from '../../database/entities/tbl_processes_selected_machines.entity';
import { StatusService } from './status/status.service';
import { CompaniesService } from '../../companies/companies.service';
import { ChildrenService } from '../children/children.service';

@Injectable()
export class ProcessService {

    constructor(
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(ItemService) private itemService: ItemService,
        @Inject(forwardRef(() => OdfService)) private odfService: OdfService,
        @Inject(forwardRef(() => MachineService)) private machinesService: MachineService,
        @Inject(FilesService) private filesService: FilesService,
        @Inject(StatusService) private statusService: StatusService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(forwardRef(() => ChildrenService)) private childrenService: ChildrenService,
        @InjectRepository(ProcessEntity) private processesRepository: Repository<ProcessEntity>,
        @InjectRepository(CompanyProcessEntity) private companyProcessesRepository: Repository<CompanyProcessEntity>,
        @InjectRepository(ProcessSelectedMachineEntity) private processesSelectedMachinesRepository: Repository<ProcessSelectedMachineEntity>,
        @InjectRepository(ActiveProcessProductionPeriodEntity) private activeProcessProductionPeriodsRepository: Repository<ActiveProcessProductionPeriodEntity>,
    ) { }

    async deleteProcessesFromOdf(odfId: number): Promise<void> {

        return;

    }

    async findProcessById(companyId: number, processId: number): Promise<ProcessEntity> {
        return;
    }

    async findProcessProductionPeriods(
        odfId: number,
        processId: number,
    ): Promise<ActiveProcessProductionPeriodEntity[]> {
        // Retorna entidade de períodos de produção do processo
        return []
    }

    async findProcessNeededItemsInfo(
        companyId: number,
        processId: number
    ): Promise<ProcessNeededItemInfo[]> {

        // Retorna entidade de itens necessários no processo
        return []

    }

    async deleteItemProcessesByItemId(
        itemId: number,
        companyId: number
    ): Promise<void> {
        return
    }

    async findAllCompanyProcessesStream(
        companyId: number
    ): Promise<Observable<Stringified<CompanyItemProcessInfo>>> {

        // Retorna stream de todos os processos da empresa
        return new ReadStream()

    }

    async findMachineFirstProductionPeriod(companyId: number, machineId: number, machineIndex: number): Promise<{
        start_datetime: string,
        end_datetime: string
    }> {

        return {
            end_datetime: "dataFinal",
            start_datetime: "dataInicial"
        }

    }

    async findMachineProcessesStream(
        companyId: number,
        machineName: string,
        machineIndex: number
    ): Promise<ReadStream> {
        // Retorna stream de processos de uma máquina
        return new ReadStream()
    }

    async findAllItemProcesses(
        companyId: number,
        itemId: number
    ): Promise<ItemProcessInfo[]> {

        return [
            {
                execut_time: 10,
                machine_name: "Maquina",
                op_num: 1,
                part_number: "item",
                part_number_id: 1,
                part_number_type: 1,
                price: 10,
                process_id: 1,
                setup_time: 10
            }
        ]

    }

    async createItemProcess(
        companyId: number,
        processInfo: CreateItemProcessDTO
    ): Promise<{ process_id: number, item: string }> {

        return { process_id: 1, item: "item" }

    }

    async editItemProcess(
        companyId: number,
        processInfo: EditItemProcessDTO
    ): Promise<void> {

        return;

    }

    async deleteItemProcess(
        companyId: number,
        processId: number
    ): Promise<void> {

        return;

    }

    async findRemodelProcesses(companyId: number): Promise<Observable<Stringified<CompanyProcessEntity & {
        item_img: string
    }>>> {

        // Retorna stream de todos os processos remodelados
        return new ReadStream()

    }

    async findProcessesSequenceCount(companyId: number): Promise<SequenceCount> {

        return {
            sequenced: 10,
            total: 20
        }

    }

}
