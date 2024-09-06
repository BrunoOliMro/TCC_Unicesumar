import { Injectable } from '@nestjs/common';
import { CompanySettingsEntity } from '../database/entities/tbl_companies_settings.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateGeneralSettingsDTO, UpdateSequencePrioritiesDTO } from './DTO/settings.dto';
import { CompanyInvalidDayEntity } from '../database/entities/tbl_companies_invalid_days.entity';
import { SequencePriorityEntity } from '../database/entities/tbl_sequence_priorities.entity';

@Injectable()
export class SettingsService {

    constructor(
        @InjectRepository(CompanyInvalidDayEntity) private companiesInvalidDaysRepository: Repository<CompanyInvalidDayEntity>,
        @InjectRepository(CompanySettingsEntity) private companiesSettingsRepository: Repository<CompanySettingsEntity>,
        @InjectRepository(SequencePriorityEntity) private sequencePrioritiesRepository: Repository<SequencePriorityEntity>
    ) { }

    async findGeneralSettings(companyId: number): Promise<CompanySettingsEntity> {

        // Retorna entidade de configuração de empresa
        return {}

    }

    async findInvalidDays(companyId: number): Promise<number[]> {

        return [0, 5]

    }

    async updateGeneralSettings(companyId: number, settings: UpdateGeneralSettingsDTO): Promise<void> {

        return;

    }

    async updateSequencePriorities(companyId: number, priorities: UpdateSequencePrioritiesDTO): Promise<void> {

        return;

    }

    async addInvalidDays(companyId: number, invalidDays: number[]): Promise<void> {

        return;

    }

    async deleteInvalidDay(companyId: number, invalidDay: number): Promise<void> {

        return;

    }

    async findSequencePriorities(
        companyId: number
    ): Promise<SequencePriorityEntity[]> {

        // Retorna entidade de prioridade de sequenciamento
        return []

    }

}
