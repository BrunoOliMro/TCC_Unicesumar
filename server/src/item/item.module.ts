import { forwardRef, Module } from '@nestjs/common';
import { ProcessService } from './process/process.service';
import { ProcessController } from './process/process.controller';
import { UtilsModule } from '../utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyProcessEntity } from '../database/entities/vw_company_processes.entity';
import { CompaniesModule } from '../companies/companies.module';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { PartNumberEntity } from '../database/entities/tbl_part_numbers.entity';
import { ProcessEntity } from '../database/entities/tbl_process.entity';
import { MachineModule } from '../machine/machine.module';
import { OdfModule } from '../odf/odf.module';
import { ItemTypesController } from './item_types/item_types.controller';
import { ItemTypesService } from './item_types/item_types.service';
import { PartNumberTypeEntity } from '../database/entities/tbl_part_number_types.entity';
import { ActiveProcessProductionPeriodEntity } from '../database/entities/tbl_active_processes_production_periods.entity';
import { GroupsService } from './groups/groups.service';
import { GroupsController } from './groups/groups.controller';
import { GroupingEntity } from '../database/entities/tbl_groupings.entity';
import { ProcessStatusEntity } from '../database/entities/tbl_processes_status';
import { ChildrenController } from './children/children.controller';
import { ChildrenItemEntity } from '../database/entities/tbl_children_items.entity';
import { ChildrenService } from './children/children.service';
import { StockModule } from '../stock/stock.module';
import { ProcessSelectedMachineEntity } from '../database/entities/tbl_processes_selected_machines.entity';
import { StatusController } from './process/status/status.controller';
import { StatusService } from './process/status/status.service';
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';
import { ToolsModule } from '../tools/tools.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [
    ProcessService, ItemService, ItemTypesService, GroupsService, ChildrenService, StatusService, ImageService],
  controllers: [ProcessController, ItemController, ItemTypesController, GroupsController, ChildrenController, StatusController, ImageController],
  exports: [ProcessService, ItemService, GroupsService, ChildrenService, StatusService],
  imports: [
    MulterModule.register(),
    UtilsModule, StockModule,
    forwardRef(() => MachineModule), forwardRef(() => OdfModule),
    CompaniesModule, ToolsModule,
    TypeOrmModule.forFeature([CompanyProcessEntity, PartNumberEntity, ChildrenItemEntity, ProcessSelectedMachineEntity,
      ActiveProcessProductionPeriodEntity, ProcessEntity, PartNumberTypeEntity, GroupingEntity, ProcessStatusEntity])]
})
export class ItemModule { }
