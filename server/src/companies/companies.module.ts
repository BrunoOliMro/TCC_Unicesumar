import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { AuthModule } from '../auth/auth.module';
import { UtilsModule } from '../utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from '../database/entities/tbl_companies.entity';
import { CompanySequenceTimersEntity } from '../database/entities/tbl_companies_sequence_timers.entity';

@Module({
  providers: [CompaniesService],
  imports: [AuthModule, UtilsModule, TypeOrmModule.forFeature([CompanyEntity, CompanySequenceTimersEntity])],
  exports: [CompaniesService]
})
export class CompaniesModule { }
