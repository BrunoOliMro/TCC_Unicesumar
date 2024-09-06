import { HttpException, Injectable, Inject } from '@nestjs/common';
import { ProcessToolInfo } from './types/tools.types';
import { InjectRepository } from '@nestjs/typeorm';
import { ToolEntity } from '../database/entities/tbl_tools.entity';
import { Repository } from 'typeorm';
import { AddProcessToolDTO, DeleteProcessToolDTO } from './DTO/tools.dto';
import { ResponseService } from '../utils/response/response.service';
import { ProcessToolEntity } from '../database/entities/tbl_process_tools.entity';
import { ProcessService } from '../item/process/process.service';

@Injectable()
export class ToolsService {

    constructor(
        @InjectRepository(ToolEntity) private toolsRepository: Repository<ToolEntity>,
        @InjectRepository(ProcessToolEntity) private processesToolsRepository: Repository<ProcessToolEntity>,
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(ProcessService) private processService: ProcessService
    ) { }

    async findToolById(companyId: number, toolId: number): Promise<ToolEntity> {

        // Retorna entidade de ferramental
        return {}

    }

    async findProcessTools(
        companyId: number,
        processId: number
    ): Promise<ProcessToolInfo[]> {

        // Retorna entidade de ferramental de processo
        return []

    }

    async addProcessTool(
        companyId: number,
        processToolInfo: AddProcessToolDTO
    ): Promise<{ tool_id: number }> {

        return { tool_id: 1 }

    }

    async deleteProcessTool(
        companyId: number,
        processToolInfo: DeleteProcessToolDTO
    ): Promise<void> {

        return;

    }

}
