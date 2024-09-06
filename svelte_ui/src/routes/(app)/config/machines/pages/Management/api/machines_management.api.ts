import type { AxiosResponse } from "axios";
import type { AddMachineData, EditMachineData } from "../types/machines_management.types";
import type { BaseResponse } from "$lib/types/global.types";
import { mainRouteApi } from "$lib/api/api.global";

export function addMachine(
    info: AddMachineData
): Promise<AxiosResponse<BaseResponse<{ machine_id: number, machine_index: number }>>> {

    return mainRouteApi.post(
        "/machine",
        {
            machine_group_id: info.machineGroupId,
            machine: info.machine,
            efficiency: info.efficiency,
            month_load: info.monthLoad,
            working_days: info.workingDays
        },
    );

}

export function editMachine(
    info: EditMachineData
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.patch(
        "/machine",
        {
            machine_group_id: info.machineGroupId,
            machine_index: info.machineIndex,
            machine_id: info.machineId,
            efficiency: info.efficiency,
            month_load: info.monthLoad,
            working_days: info.workingDays
        },
    );

}

export function deleteMachine(
    machineId: number,
    machineIndex: number
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.delete(
        "/machine",
        {
            data: {
                machine_id: machineId,
                machine_index: machineIndex
            }
        },
    );

}