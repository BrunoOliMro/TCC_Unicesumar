import { HolidayEntity } from "../../../../database/entities/tbl_holidays.entity";
import { mockHolidays } from "./data/holidays.mock-data";

export default class MockHolidaysService {

    async findCompanyHolidays(): Promise<HolidayEntity[]> {
        return mockHolidays;
    }

    async addCompanyHoliday(): Promise<void> {
        return;
    }

    async deleteCompanyHoliday(): Promise<void> {
        return;
    }

}