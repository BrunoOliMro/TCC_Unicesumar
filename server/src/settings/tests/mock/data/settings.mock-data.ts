import { CompanySettingsEntity } from "../../../../database/entities/tbl_companies_settings.entity";
import { SequencePriorityEntity } from "../../../../database/entities/tbl_sequence_priorities.entity";

export const mockSequencePriorities: SequencePriorityEntity[] = [
    {
        company_id: 1,
        id: 1,
        priority: "Data de entrega",
        priority_index: 1
    },
    {
        company_id: 1,
        id: 1,
        priority: "Crítico",
        priority_index: 2
    },
    {
        company_id: 1,
        id: 1,
        priority: "Preço",
        priority_index: 3
    },
]

export const mockGeneralSettings: CompanySettingsEntity = {
    company_id: 1,
    id: 1,
    sequence_days: 5
}

export const mockInvalidDays = [0, 6];