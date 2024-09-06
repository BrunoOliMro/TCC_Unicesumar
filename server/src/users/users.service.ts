import { HttpException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../database/entities/tbl_users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserDTO, DeleteUserDTO, EditUserDTO } from './DTO/users.dto';
import { CompaniesService } from '../companies/companies.service';
import axios from "axios";
import { UserInfo } from './types/users.types';
import { ResponseService } from '../utils/response/response.service';
import { KeycloakService } from '../auth/keycloak/keycloak.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(KeycloakService) private keycloakService: KeycloakService
    ) { }

    async findNextUserInfoById(companyId: number, userId: number): Promise<UserEntity> {
        // Retorna entidade de usuário
        return {}
    }

    async findUserInfoById(companyId: number, userId: number): Promise<UserInfo> {

        return {
            CEP: null,
            company_id: 1,
            email: "email",
            gender: "Outro",
            id: 1,
            keycloak_id: "id",
            name: "nome",
            phone: "telefone",
            user_department: "Departamento",
            user_function: "Função",
            username: "Usuário"
        }

    }

    async findUsers(
        companyId: number
    ): Promise<UserEntity[]> {

        // Retorna entidade de usuário
        return []

    }

    async createUser(
        companyId: number,
        userInfo: AddUserDTO
    ): Promise<void> {

        return;

    }

    async editUser(
        companyId: number,
        userInfo: EditUserDTO
    ): Promise<void> {

        return;

    }

    async deleteUser(
        companyId: number,
        userInfo: DeleteUserDTO
    ): Promise<void> {

        return;

    }

}
