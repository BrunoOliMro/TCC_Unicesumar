export type CompanyMachineInfo = {
    id: number;
    machine: string;
    machine_index: number;
    machine_group_id: number;
    month_load: number;
    working_days: number;
    efficiency: number;
    company_id?: number;
    machine_group?: string;
}

export type MachineGroup = {
    id: number;
    machine_group: string;
    company_id: number;
}

export type GeneralMachineInfo = {
    id: number;
    machine: string;
}