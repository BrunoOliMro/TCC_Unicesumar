import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanySettingsEntity } from '../database/entities/tbl_companies_settings.entity';
import { SettingsController } from './settings.controller';
import { UtilsModule } from '../utils/utils.module';
import { CompanyInvalidDayEntity } from '../database/entities/tbl_companies_invalid_days.entity';
import { HolidaysController } from './holidays/holidays.controller';
import { HolidaysService } from './holidays/holidays.service';
import { HolidayEntity } from '../database/entities/tbl_holidays.entity';
import { CompaniesModule } from '../companies/companies.module';
import { SequencePriorityEntity } from '../database/entities/tbl_sequence_priorities.entity';

@Module({
  providers: [SettingsService, HolidaysService],
  exports: [SettingsService, HolidaysService],
  imports: [UtilsModule, CompaniesModule, TypeOrmModule.forFeature([SequencePriorityEntity, CompanySettingsEntity, CompanyInvalidDayEntity, HolidayEntity])],
  controllers: [SettingsController, HolidaysController]
})
export class SettingsModule { }
