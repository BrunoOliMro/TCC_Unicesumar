import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/tbl_users.entity';
import { UtilsModule } from '../utils/utils.module';
import { CompaniesModule } from '../companies/companies.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [UtilsModule, CompaniesModule, AuthModule, TypeOrmModule.forFeature([UserEntity])]
})
export class UsersModule { }
