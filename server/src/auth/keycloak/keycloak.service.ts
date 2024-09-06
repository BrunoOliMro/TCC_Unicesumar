import { Inject, Injectable } from '@nestjs/common';
import axios from "axios";
import { ResponseService } from '../../utils/response/response.service';
import { AxiosService } from '../../utils/axios/axios.service';
import { KeycloakGroupInfo } from './types/keycloak.types';

@Injectable()
export class KeycloakService {

    constructor(
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(AxiosService) private axiosService: AxiosService
    ) { }

    async findAdmToken(): Promise<string> {
        return "token"
    }

    async findGroupInfoByPath(): Promise<KeycloakGroupInfo> {
        return {
            id: "ID",
            attributes: {},
            clientRoles: {},
            name: "usuario",
            path: "path",
            realmRoles: [],
            subGroups: []
        }
    }

    async addUserToGroupById(userId: string, groupId: string): Promise<void> {
        return;
    }

    async deleteUserFromGroupById(userId: string, groupId: string): Promise<void> {
        return;
    }

}
