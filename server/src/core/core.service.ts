import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ResponseService } from '../utils/response/response.service';
import { DateTime } from '../utils/datetime/obj/datetime.obj';
import { Cron } from '@nestjs/schedule';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class CoreService {

    private lastJobDateTime = DateTime.now();

    constructor(
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(CompaniesService) private companiesService: CompaniesService
    ) { }

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