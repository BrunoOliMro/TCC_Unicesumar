import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { UtilsModule } from '../utils/utils.module';
import { ItemModule } from './item/item.module';
import { MachineModule } from './machine/machine.module';
import { OdfModule } from './odf/odf.module';
import { StockModule } from './stock/stock.module';
import { CompaniesModule } from '../companies/companies.module';
import { SequenceHistoryService } from './sequence_history/sequence_history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequenceHistoryEntity } from '../database/entities/tbl_sequence_history';
import { SequenceHistoryController } from './sequence_history/sequence_history.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [CoreService, SequenceHistoryService],
  controllers: [CoreController, SequenceHistoryController],
  imports: [UtilsModule, ItemModule, MachineModule, OdfModule, AuthModule, StockModule, CompaniesModule, TypeOrmModule.forFeature([SequenceHistoryEntity])]
})
export class CoreModule { }
