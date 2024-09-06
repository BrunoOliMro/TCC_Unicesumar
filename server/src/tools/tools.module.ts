import { forwardRef, Module } from '@nestjs/common';
import { UtilsModule } from '../utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolEntity } from '../database/entities/tbl_tools.entity';
import { CompaniesModule } from '../companies/companies.module';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';
import { ProcessToolEntity } from '../database/entities/tbl_process_tools.entity';
import { ItemModule } from '../item/item.module';

@Module({
    imports: [UtilsModule, forwardRef(() => ItemModule), CompaniesModule, TypeOrmModule.forFeature([ToolEntity, ProcessToolEntity])],
    providers: [ToolsService],
    controllers: [ToolsController],
    exports: [ToolsService]

})
export class ToolsModule { }
