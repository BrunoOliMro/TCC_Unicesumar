import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { ResponseService } from '../utils/response/response.service';
import { InjectRepository } from '@nestjs/typeorm';
import { OdfQtdEntity } from '../database/entities/tbl_odfs_qtd.entity';
import { Repository } from 'typeorm';
import { FinishGroupPointingDTO, UpdatePointQtdDTO } from './DTO/point.dto';
import { OdfService } from '../odf/odf.service';
import { GroupsService } from '../item/groups/groups.service';
import { DateTime } from '../utils/datetime/obj/datetime.obj';
import { ProcessService } from '../item/process/process.service';
import { PointHistoryEntity } from '../database/entities/tbl_point_history.entity';
import { Stringified } from '../global/interfaces/global.interface';
import { Observable, Subject } from 'rxjs';
import { StockService } from '../stock/stock.service';
import { StatusService } from '../item/process/status/status.service';
import { ReadStream } from 'typeorm/platform/PlatformTools';

@Injectable()
export class PointService {

    constructor(
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(forwardRef(() => OdfService)) private odfService: OdfService,
        @Inject(forwardRef(() => ProcessService)) private processService: ProcessService,
        @Inject(forwardRef(() => GroupsService)) private groupsService: GroupsService,
        @Inject(StockService) private stockService: StockService,
        @Inject(StatusService) private statusService: StatusService,
        @InjectRepository(OdfQtdEntity) private odfsQtdRepository: Repository<OdfQtdEntity>,
        @InjectRepository(PointHistoryEntity) private pointsHistoryRepository: Repository<PointHistoryEntity>
    ) { }

    async findOdfPoints(odfId: number): Promise<OdfQtdEntity[]> {
        // Retorna entidade de qtd de ODF
        return []
    }

    async findOdfProcessPointInfo(
        odfId: number,
        processId: number
    ): Promise<OdfQtdEntity> {

        // Retorna entidade de qtd de ODF
        return {}

    }

    async findPointHistory(
        companyId: number
    ): Promise<Observable<Stringified<PointHistoryEntity>>> {

        // Retorna stream de entidades de histórico de apontamento
        return new ReadStream()

    }

    async registerPoint(
        companyId: number,
        pointInfo: {
            odfId: number,
            processId: number,
        }
    ): Promise<void> {

        return;

    }

    async updatePointQtd(
        companyId: number,
        pointInfo: UpdatePointQtdDTO
    ): Promise<void> {

        return;

    }

    async finishGroupingPoint(
        companyId: number,
        groupingInfo: FinishGroupPointingDTO
    ): Promise<void> {

        return;

    }

    async insertPoints(points: OdfQtdEntity[]): Promise<void> {
        return;
    }

    async deleteOdfPoints(odfId: number): Promise<void> {
        return;
    }

}
