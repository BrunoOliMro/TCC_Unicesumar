import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcessStatusEntity } from '../../../database/entities/tbl_processes_status';
import { Repository } from 'typeorm';
import { AddRemodelProcessDTO, DeleteRemodelProcessDTO } from './DTO/status.dto';
import { ProcessService } from '../process.service';
import { OdfService } from '../../../odf/odf.service';
import { ResponseService } from '../../../utils/response/response.service';

@Injectable()
export class StatusService {

    constructor(
        @Inject(forwardRef(() => OdfService)) private odfService: OdfService,
        @Inject(ResponseService) private responsesService: ResponseService,
        @InjectRepository(ProcessStatusEntity) private processesStatusRepository: Repository<ProcessStatusEntity>,
    ) { }

    async finishProcess(odfId: number, processId: number): Promise<void> {
        return;
    }

    async findOdfProcessesStatus(odfId: number): Promise<ProcessStatusEntity[]> {
        // Retorna entidade de status de processo
        return []
    }

    async upsertStatus(statusInfo: ProcessStatusEntity[]): Promise<void> {
        return;
    }

    async deleteOdfStatus(odfId: number): Promise<void> {

        return;

    }

    async findProcessStatus(odfId: number, processId: number): Promise<ProcessStatusEntity> {

        // Retorna entidade de status de processo
        return {}

    }


    async addRemodelProcess(
        companyId: number,
        processInfo: AddRemodelProcessDTO
    ): Promise<void> {

        return;

    }

    async deleteProcessStatus(processId: number): Promise<void> {
        return;
    }

    async deleteOdfRemodelItem(
        companyId: number,
        remodelProcessInfo: DeleteRemodelProcessDTO
    ): Promise<void> {
        return;
    }

}
