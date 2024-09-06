import { Module } from '@nestjs/common';
import { UtilsModule } from '../utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from '../database/entities/tbl_companies.entity';
import { CompaniesModule } from '../companies/companies.module';
import { SseAuthorization } from './middlewares/sse_auth.middleware';

@Module({
  providers: [SseAuthorization],
  imports: [UtilsModule, CompaniesModule, TypeOrmModule.forFeature([CompanyEntity])]
})
export class GlobalModule { }
