import { forwardRef, Module } from '@nestjs/common';
import { OdfController } from './odf.controller';
import { OdfService } from './odf.service';
import { UtilsModule } from '../utils/utils.module';
import { CompaniesModule } from '../companies/companies.module';
import { ItemModule } from '../item/item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OdfEntity } from '../database/entities/tbl_odfs.entity';
import { OdfQtdEntity } from '../database/entities/tbl_odfs_qtd.entity';
import { StockModule } from '../stock/stock.module';
import { CompanyProcessEntity } from '../database/entities/vw_company_processes.entity';
import { PointModule } from '../point/point.module';

@Module({
  controllers: [OdfController],
  providers: [OdfService],
  exports: [OdfService],
  imports: [UtilsModule, forwardRef(() => PointModule), StockModule, CompaniesModule, forwardRef(() => ItemModule), TypeOrmModule.forFeature([OdfEntity, OdfQtdEntity, CompanyProcessEntity])]
})
export class OdfModule { }
