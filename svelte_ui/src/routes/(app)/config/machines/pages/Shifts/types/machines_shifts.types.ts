export type MachineShiftInfo = {

    id: number
    machine_id: number;
    machine: string;
    machine_index: number;
    start_time: string;
    end_time: string;

}

export type AddMachineShift = {
    machineId: number;
    startTime: string;
    endTime: string;
    machineIndex: number;
}

export type DeleteMachineShift = {
    machineId: number;
    machineIndex: number;
    shiftId: number;
}