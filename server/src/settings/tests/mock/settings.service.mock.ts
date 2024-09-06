import { CompanySettingsEntity } from "../../../database/entities/tbl_companies_settings.entity";
import { SequencePriorityEntity } from "../../../database/entities/tbl_sequence_priorities.entity";
import { mockGeneralSettings, mockSequencePriorities } from "./data/settings.mock-data";

export default class MockSettingsService {

    async findGeneralSettings(): Promise<CompanySettingsEntity> {
        return mockGeneralSettings;
    }

    async findInvalidDays(): Promise<number[]> {
        return [0, 6];
    }

    async updateGeneralSettings(): Promise<void> {
        return;
    }

    async updateSequencePriorities(): Promise<void> {
        return;
    }

    async addInvalidDays(): Promise<void> {
        return;
    }

    async deleteInvalidDay(): Promise<void> {
        return;
    }

    async findSequencePriorities(): Promise<SequencePriorityEntity[]> {
        return mockSequencePriorities;
    }
}