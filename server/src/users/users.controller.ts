import { Controller, Get, Inject, Headers, Body, Post, Patch, Delete, Query } from '@nestjs/common';
import { UserEntity } from '../database/entities/tbl_users.entity';
import { ResponseService } from '../utils/response/response.service';
import { CompaniesService } from '../companies/companies.service';
import { NextResponse } from '../utils/response/types/response.types';
import { UsersService } from './users.service';
import { HeaderDTO } from '../global/DTO/global.dto';
import { AddUserDTO, DeleteUserDTO, EditUserDTO, FindUserInfoQueryParamsDTO } from './DTO/users.dto';
import { Roles } from 'nest-keycloak-connect';

@Controller('users')
export class UsersController {

    constructor(
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(UsersService) private service: UsersService
    ) { }

    @Roles({ roles: ["realm:HUB_admin"] })
    @Get()
    async findUsers(
        @Headers() headers: HeaderDTO
    ): Promise<NextResponse<UserEntity[]>> {
        return this.responsesService.dataFetched(
            await this.service.findUsers(
                this.companiesService.findCompanyIdWithToken(headers.authorization)
            )
        );
    }

    @Roles({ roles: ["realm:HUB_admin"] })
    @Get("user")
    async findUserInfo(
        @Headers() headers: HeaderDTO,
        @Query() userInfo: FindUserInfoQueryParamsDTO
    ): Promise<NextResponse<UserEntity>> {
        return this.responsesService.dataFetched(
            await this.service.findNextUserInfoById(
                this.companiesService.findCompanyIdWithToken(headers.authorization),
                userInfo.user_id
            )
        );
    }

    @Roles({ roles: ["realm:HUB_admin"] })
    @Post()
    async createUser(
        @Headers() headers: HeaderDTO,
        @Body() userInfo: AddUserDTO
    ): Promise<NextResponse<undefined>> {

        await this.service.createUser(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            userInfo
        );

        return this.responsesService.dataAdded();
    }

    @Roles({ roles: ["realm:HUB_admin"] })
    @Patch()
    async editUser(
        @Headers() headers: HeaderDTO,
        @Body() userInfo: EditUserDTO
    ): Promise<NextResponse<undefined>> {

        await this.service.editUser(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            userInfo
        );

        return this.responsesService.dataUpdated();
    }

    @Roles({ roles: ["realm:HUB_admin"] })
    @Delete()
    async deleteUser(
        @Headers() headers: HeaderDTO,
        @Body() userInfo: DeleteUserDTO
    ): Promise<NextResponse<undefined>> {

        await this.service.deleteUser(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            userInfo
        );

        return this.responsesService.dataDeleted();
    }

}
