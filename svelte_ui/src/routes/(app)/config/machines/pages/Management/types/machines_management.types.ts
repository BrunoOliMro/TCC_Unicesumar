export type AddMachineData = {
    machine: string;
    machineGroupId: number;
    monthLoad: number;
    efficiency: number;
    workingDays: number;
}

export type EditMachineData = {
    machineId: number;
    machineIndex: number;
    machineGroupId: number;
    monthLoad: number;
    efficiency: number;
    workingDays: number;
}