export type SequenceHistoryRegister = {
    id: number;
    obs: string;
    ended: 0 | 1;
    sequence_error: 0 | 1;
    start_timestamp: string;
    end_timestamp?: string;
    username: string;
}

export type GeneralSettings = {
    sequence_days: number;
}

export type EditGeneralSettingsInfo = {
    sequence_days: number;
}

export type SequencePriorityInfo = {

    id: number;
    priority: string;
    priority_index: number;

}

export type EditPriorities = {
    priority_id: number;
    priority_index: number;
}[]

export type TimerInfo = {
    id: number;
    company_id: number;
    sequence_time: string;
}