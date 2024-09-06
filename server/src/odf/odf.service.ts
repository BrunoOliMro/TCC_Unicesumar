import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { OdfProcessGeneralInfo, OdfGeneralInfo, OdfProcessQtdInfo } from './types/odf.types';
import { ProcessService } from '../item/process/process.service';
import { AlterCriticOdfDTO, CreateODFDTO, UpdateODFInfo } from './DTO/odf.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OdfEntity } from '../database/entities/tbl_odfs.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { ItemService } from '../item/item.service';
import { ResponseService } from '../utils/response/response.service';
import { CompanyProcessEntity } from '../database/entities/vw_company_processes.entity';
import { ChildrenService } from '../item/children/children.service';
import { RandomizerService } from '../utils/randomizer/randomizer.service';
import { DateTime } from '../utils/datetime/obj/datetime.obj';
import { StockService } from '../stock/stock.service';
import { StatusService } from '../item/process/status/status.service';
import { ProcessStatusEntity } from '../database/entities/tbl_processes_status';
import { PointService } from '../point/point.service';
import { Stringified } from '../global/interfaces/global.interface';
import { Observable, Subject } from 'rxjs';
import { ReadStream } from 'typeorm/platform/PlatformTools';

@Injectable()
export class OdfService {

    constructor(
        @Inject(forwardRef(() => ProcessService)) private processService: ProcessService,
        @Inject(StatusService) private statusService: StatusService,
        @Inject(forwardRef(() => ItemService)) private itemService: ItemService,
        @Inject(StockService) private stockService: StockService,
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(forwardRef(() => ChildrenService)) private childrenService: ChildrenService,
        @Inject(RandomizerService) private randomizerService: RandomizerService,
        @Inject(forwardRef(() => PointService)) private pointService: PointService,
        @InjectRepository(OdfEntity) private odfsRepository: Repository<OdfEntity>,
        @InjectRepository(CompanyProcessEntity) private companyProcessesRepository: Repository<CompanyProcessEntity>
    ) { }

    async findOdfInfoById(companyId: number, odfId: number): Promise<OdfEntity> {
        // Retorna entidade de ODF
        return {}
    }

    async findOdfInfoByOdf(
        odf: string,
        companyId: number
    ): Promise<OdfEntity> {
        // Retorna entidade de ODF
        return {}
    }

    async findOdfProcessChildOdfs(
        companyId: number,
        odfId: number,
        processId: number
    ): Promise<OdfEntity[]> {

        // Retorna entidade de ODF
        return []

    }

    async findLastOdfProcessInfo(
        odfId: number
    ): Promise<CompanyProcessEntity> {

        // Retorna entidade de processo
        return {}

    }

    async findOdfProcesses(
        companyId: number,
        odfId: number
    ): Promise<CompanyProcessEntity[]> {

        // Retorna entidade de processo
        return [];

    }

    async findOdfProcessInfoById(
        companyId: number,
        odfId: number,
        processId: number
    ): Promise<CompanyProcessEntity> {

        // Retorna entidade de processo
        return {}

    }

    async findOdfProcessesQtd(
        companyId: number,
        odfId: number
    ): Promise<OdfProcessQtdInfo[]> {

        return [{
            execut_time: 10,
            finished_qtd: 5,
            missing_qtd: 1,
            odf_id: 1,
            odf_qtd: 20,
            op_num: 1,
            process_id: 1,
            refused_qtd: 1,
            setup_time: 10
        }]

    }

    async odfProcessIsFinished(
        companyId: number,
        odfId: number,
        processId: number
    ): Promise<boolean> {
        return true;
    }

    async checkAndFinishOdf(
        companyId: number,
        odfId: number
    ): Promise<void> {

        return

    }

    async addNewProcessToOdfItem(
        processId: number,
        odfsId: number[]
    ): Promise<void> {
        return;
    }

    async findAllOdfIds(
        companyId: number
    ): Promise<number[]> {
        return [1, 2]
    }

    async findOdfsWithItemById(
        companyId: number,
        itemId: number,
    ): Promise<OdfEntity[]> {
        // Retorna entidade de ODF
        return [];
    }

    async findChildOdfsWithItemById(
        companyId: number,
        itemId: number,
    ): Promise<OdfEntity[]> {
        // Retorna entidade de ODF
        return [];
    }

    async findOdfProcessesGeneralInfo(companyId: number, odfId: number): Promise<OdfProcessGeneralInfo[]> {
        return [
            {
                machine: "maquina",
                odf_id: 1,
                odf_qtd: 10,
                op_num: 1,
                process_id: 1
            }
        ]
    }

    async findAllOdfsWithItem(companyId: number): Promise<Observable<Stringified<OdfGeneralInfo>>> {

        // Retorna stream de informações de ODF
        return new ReadStream()

    }

    async startOdfPointingInfo(
        companyId: number,
        odfId: number,
        prePointingInfos?: {
            process_id: number,
            finished_qtd: number,
            missing_qtd: number,
            refused_qtd: number
        }[]
    ): Promise<void> {
        return
    }

    async createOdf(
        companyId: number,
        odfInfo: CreateODFDTO,
        extraInfos?: {
            parent_odf_id: number,
            parent_process_id: number
            prePointingInfos?: {
                process_id: number,
                finished_qtd: number,
                missing_qtd: number,
                refused_qtd: number
            }[],
            statusInfo?: {
                process_id: number,
                remodel_index?: number,
                grouping_id?: number,
            }[]
            critic?: 0 | 1
        }
    ): Promise<{ odf_id: number, item: string }> {

        return {
            item: "item",
            odf_id: 1
        }

    }

    async updateOdfInfo(
        companyId: number,
        odfInfo: UpdateODFInfo
    ): Promise<void> {

        return;

    }

    async updateOdfCriticStatus(
        companyId: number,
        odfInfo: AlterCriticOdfDTO
    ): Promise<void> {

        return

    }

    async deleteOdf(
        companyId: number,
        odfId: number
    ): Promise<void> {

        return;

    }

}