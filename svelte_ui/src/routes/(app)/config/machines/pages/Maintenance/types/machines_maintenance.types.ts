export type MachineMaintenance = {
    id: number;
    machine_id: number;
    maintenance_uuid: string;
    machine: string;
    machine_index: number;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
}

export type DeleteMachineMaintenance = {
    maintenanceUuid: string;
    machineIndex: number;
    machineId: number;
}

export type AddMachineMaintenance = {
    machineId: number;
    machineIndex: number;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
}