import { Controller, Inject, Headers, Sse, Post, Body, Patch, Delete, Get, Query } from '@nestjs/common';
import { OdfService } from './odf.service';
import { CompaniesService } from '../companies/companies.service';
import { HeaderDTO } from '../global/DTO/global.dto';
import { AlterCriticOdfDTO, CreateODFDTO, DeleteOdfDTO, FindOdfProcessesQuery, UpdateODFInfo } from './DTO/odf.dto';
import { ResponseService } from '../utils/response/response.service';
import { NextResponse } from '../utils/response/types/response.types';
import { OdfProcessGeneralInfo, OdfGeneralInfo } from './types/odf.types';
import { Roles } from 'nest-keycloak-connect';
import { CompanyProcessEntity } from '../database/entities/vw_company_processes.entity';
import { Observable } from 'rxjs';
import { Stringified } from '../global/interfaces/global.interface';

@Controller('odf')
export class OdfController {

    constructor(
        @Inject(OdfService) private service: OdfService,
        @Inject(CompaniesService) private companiesService: CompaniesService,
        @Inject(ResponseService) private responsesService: ResponseService
    ) { }

    @Roles({ roles: ["Next_admin"] })
    @Sse()
    async findAllOdfs(
        @Headers() headers: HeaderDTO
    ): Promise<Observable<Stringified<OdfGeneralInfo>>> {
        return await this.service.findAllOdfsWithItem(
            this.companiesService.findCompanyIdWithToken(headers.authorization)
        );
    }

    @Roles({ roles: ["Next_admin"] })
    @Get("processes")
    async findOdfProcesses(
        @Headers() headers: HeaderDTO,
        @Query() odfInfo: FindOdfProcessesQuery
    ): Promise<NextResponse<CompanyProcessEntity[]>> {
        return this.responsesService.dataFetched(await this.service.findOdfProcesses(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            odfInfo.odf_id
        ));
    }

    @Roles({ roles: ["Next_admin"] })
    @Get("processes/general")
    async findOdfProcessesGeneralInfo(
        @Headers() headers: HeaderDTO,
        @Query() odfInfo: FindOdfProcessesQuery
    ): Promise<NextResponse<OdfProcessGeneralInfo[]>> {
        return this.responsesService.dataFetched(await this.service.findOdfProcessesGeneralInfo(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            odfInfo.odf_id
        ));
    }

    @Roles({ roles: ["Next_admin"] })
    @Post()
    async createOdf(
        @Headers() headers: HeaderDTO,
        @Body() odfInfo: CreateODFDTO
    ): Promise<NextResponse<{ odf_id: number, item: string }>> {
        return this.responsesService.dataAdded<{ odf_id: number, item: string }>(await this.service.createOdf(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            odfInfo
        ));
    }

    // @Roles({ roles: ["Next_admin"] })
    // @Post('active')
    // async changeOdfActivation(
    //     @Headers() headers: HeaderDTO,
    //     @Body() odfInfo: ChangeODFActivationDTO
    // ): Promise<NextResponse<void>> {
    //     await this.service.changeOdfActivation(
    //         this.companiesService.findCompanyIdWithToken(headers.authorization),
    //         odfInfo
    //     );
    //     return this.responsesService.dataUpdated();
    // }

    @Roles({ roles: ["Next_admin"] })
    @Patch()
    async updateOdfInfo(
        @Headers() headers: HeaderDTO,
        @Body() odfInfo: UpdateODFInfo
    ): Promise<NextResponse<undefined>> {
        await this.service.updateOdfInfo(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            odfInfo
        );
        return this.responsesService.dataUpdated();
    }

    @Roles({ roles: ["Next_admin"] })
    @Patch('critic')
    async updateOdfCriticStatus(
        @Headers() headers: HeaderDTO,
        @Body() odfInfo: AlterCriticOdfDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.updateOdfCriticStatus(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            odfInfo
        );

        return this.responsesService.dataUpdated();
    }

    @Roles({ roles: ["Next_admin"] })
    @Delete()
    async deleteOdf(
        @Headers() headers: HeaderDTO,
        @Body() odfInfo: DeleteOdfDTO
    ): Promise<NextResponse<undefined>> {
        await this.service.deleteOdf(
            this.companiesService.findCompanyIdWithToken(headers.authorization),
            odfInfo.odf_id
        );

        return this.responsesService.dataDeleted();
    }
}
