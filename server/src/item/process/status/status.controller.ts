import { Body, Controller, Delete, Headers, Inject, Post, Sse } from '@nestjs/common';
import { StatusService } from './status.service';
import { CompaniesService } from '../../../companies/companies.service';
import { Roles } from 'nest-keycloak-connect';
import { HeaderDTO } from '../../../global/DTO/global.dto';
import { Observable } from 'rxjs';
import { Stringified } from '../../../global/interfaces/global.interface';
import { CompanyProcessEntity } from '../../../database/entities/vw_company_processes.entity';
import { ProcessService } from '../process.service';
import { AddRemodelProcessDTO, DeleteRemodelProcessDTO } from './DTO/status.dto';
import { NextResponse } from '../../../utils/response/types/response.types';
import { ResponseService } from '../../../utils/response/response.service';

@Controller('process/status')
export class StatusController {

    constructor(
        @Inject(StatusService) private service: StatusService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(ProcessService) private processService: ProcessService
    ) { }

    @Roles({ roles: ["Next_admin"] })
    @Sse("remodel")
    async findRemodelProcesses(
        @Headers() headers: HeaderDTO
    ): Promise<Observable<Stringified<CompanyProcessEntity & {
        item_img: string
    }>>> {
        return await this.processService.findRemodelProcesses(
            this.companiesService.findCompanyIdWithToken(headers.authorization)
        );
    }

    @Roles({ roles: ["Next_admin"] })
    @Post("remodel")
    async addRemodelProcess(
        @Headers() headers: HeaderDTO,
        @Body() remodelProcessInfo: AddRemodelProcessDTO
    ): Promise<NextResponse<undefined>> {

        await this.service.addRemodelProcess(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            remodelProcessInfo
        );

        return this.responsesService.dataAdded();
    }

    @Roles({ roles: ["Next_admin"] })
    @Delete("remodel")
    async deleteRemodelProcess(
        @Headers() headers: HeaderDTO,
        @Body() remodelProcessInfo: DeleteRemodelProcessDTO
    ): Promise<NextResponse<undefined>> {

        await this.service.deleteOdfRemodelItem(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            remodelProcessInfo
        );

        return this.responsesService.dataDeleted();
    }

}
