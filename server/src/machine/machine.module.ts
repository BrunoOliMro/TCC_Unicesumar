import { forwardRef, Module } from '@nestjs/common';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';
import { UtilsModule } from '../utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveMachineEntity } from '../database/entities/vw_active_machines.entity';
import { MachineEntity } from '../database/entities/tbl_machines.entity';
import { MachineShiftEntity } from '../database/entities/tbl_machine_shifts.entity';
import { ShiftsController } from './config/shifts/shifts.controller';
import { ShiftsService } from './config/shifts/shifts.service';
import { MaintenanceController } from './config/maintenance/maintenance.controller';
import { MaintenanceService } from './config/maintenance/maintenance.service';
import { MachineMaintenanceEntity } from '../database/entities/tbl_machines_maintenance.entity';
import { DatabaseModule } from '../database/database.module';
import { CompaniesModule } from '../companies/companies.module';
import { MachineGroupsEntity } from '../database/entities/tbl_machine_groups.entity';
import { GroupsController } from './groups/groups.controller';
import { GroupsService } from './groups/groups.service';
import { ItemModule } from '../item/item.module';
import { MachineInfoEntity } from '../database/entities/tbl_machines_info.entity';

@Module({
  controllers: [MachineController, ShiftsController, MaintenanceController, GroupsController],
  exports: [MachineService],
  providers: [MachineService, ShiftsService, MaintenanceService, GroupsService],
  imports: [UtilsModule, DatabaseModule, forwardRef(() => ItemModule), CompaniesModule, TypeOrmModule.forFeature([MachineInfoEntity, ActiveMachineEntity, MachineGroupsEntity, MachineMaintenanceEntity, MachineEntity, MachineShiftEntity])]
})
export class MachineModule { }
