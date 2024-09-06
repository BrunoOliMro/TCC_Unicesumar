import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MachineRepository } from './custom-repositories/machine/machine.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbEntities } from './entities';
import { UtilsModule } from '../utils/utils.module';
import { customRepositories } from './custom-repositories';

@Module({
  providers: [DatabaseService, MachineRepository],
  imports: [UtilsModule, TypeOrmModule.forFeature(dbEntities)],
  exports: customRepositories
})
export class DatabaseModule { }
