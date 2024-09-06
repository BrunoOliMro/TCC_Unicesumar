import { HttpException, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ResponseService } from '../utils/response/response.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../database/entities/tbl_companies.entity';
import { Repository } from 'typeorm';
import { CompanySequenceTimersEntity } from '../database/entities/tbl_companies_sequence_timers.entity';

@Injectable()
export class CompaniesService {

    constructor(
        @Inject(AuthService) private authService: AuthService,
        @Inject(ResponseService) private responsesService: ResponseService,
        @InjectRepository(CompanyEntity) private companiesRepository: Repository<CompanyEntity>,
        @InjectRepository(CompanySequenceTimersEntity) private companiesSequenceTimersRepository: Repository<CompanySequenceTimersEntity>
    ) { }

    async findCompanies(): Promise<CompanyEntity[]> {
        return [
            {
                company: "Empresa",
                id: 1,
                root_company_id: 1,
                timezone: "America/Sao_Paulo"
            }
        ]
    }

    findCompanyIdWithToken(token: string): number {
        return parseInt(this.authService.verifyToken(token.replace("Bearer ", "")).company);
        // return 1;
    }

    async findCompanyInfo(companyId: number): Promise<CompanyEntity> {

        return {
            company: "Empresa",
            id: 1,
            root_company_id: 1,
            timezone: "America/Sao_Paulo"
        };

    }

    async findCompanySequenceTimers(companyId: number): Promise<CompanySequenceTimersEntity[]> {

        return [
            {
                company_id: 1,
                id: 1,
                sequence_time: "07:00"
            }
        ]

    }

    async addSequenceTimer(
        companyId: number,
        sequenceTimer: string
    ): Promise<number> {
        return 1;
    }

    async deleteSequenceTimer(
        companyId: number,
        sequenceTimerId: number
    ): Promise<void> {
        return;
    }

}
