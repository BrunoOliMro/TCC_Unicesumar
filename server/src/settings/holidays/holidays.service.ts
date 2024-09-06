import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ResponseService } from '../../utils/response/response.service';
import { StringCheckerService } from '../../utils/string-checker/string-checker.service';
import { InjectRepository } from '@nestjs/typeorm';
import { HolidayEntity } from '../../database/entities/tbl_holidays.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HolidaysService {

    constructor(
        @Inject(ResponseService) private responsesService: ResponseService,
        @Inject(StringCheckerService) private stringCheckerService: StringCheckerService,
        @InjectRepository(HolidayEntity) private holidaysRepository: Repository<HolidayEntity>
    ) { }

    async findCompanyHolidays(companyId: number): Promise<HolidayEntity[]> {

        // Retorna entidade de feriados
        return []

    }

    async addCompanyHoliday(companyId: number, holidayDate: string): Promise<void> {

        return;

    }

    async deleteCompanyHoliday(companyId: number, holidayId: number): Promise<void> {

        return;

    }

}
