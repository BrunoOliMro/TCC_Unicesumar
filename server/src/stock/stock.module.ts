import { forwardRef, Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { UtilsModule } from '../utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from '../database/entities/tbl_stock.entity';
import { ProcessMaterialEntity } from '../database/entities/tbl_process_materials.entity';
import { ProcessNeededMaterialsEntity } from '../database/entities/tbl_process_needed_materials.entity';
import { CompaniesModule } from '../companies/companies.module';
import { ItemModule } from '../item/item.module';

@Module({
  providers: [StockService],
  controllers: [StockController],
  exports: [StockService],
  imports: [UtilsModule, CompaniesModule, forwardRef(() => ItemModule), TypeOrmModule.forFeature([StockEntity, ProcessMaterialEntity, ProcessNeededMaterialsEntity])]
})
export class StockModule { }
