import { forwardRef, Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { UtilsModule } from '../utils/utils.module';
import { CompaniesModule } from '../companies/companies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OdfQtdEntity } from '../database/entities/tbl_odfs_qtd.entity';
import { OdfModule } from '../odf/odf.module';
import { ItemModule } from '../item/item.module';
import { PointHistoryEntity } from '../database/entities/tbl_point_history.entity';
import { StockModule } from '../stock/stock.module';

@Module({
  providers: [PointService],
  controllers: [PointController],
  exports: [PointService],
  imports: [UtilsModule, StockModule, CompaniesModule,
    ItemModule, forwardRef(() => OdfModule),
    TypeOrmModule.forFeature([OdfQtdEntity, PointHistoryEntity])]
})
export class PointModule { }
