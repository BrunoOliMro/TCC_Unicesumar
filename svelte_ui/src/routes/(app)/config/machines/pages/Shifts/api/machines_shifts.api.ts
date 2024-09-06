import { mainRouteApi } from "$lib/api/api.global";
import type { BaseResponse } from "$lib/types/global.types";
import type { AxiosResponse } from "axios";
import type { AddMachineShift, DeleteMachineShift, MachineShiftInfo } from "../types/machines_shifts.types";
import ToasterHandler from "$lib/toaster/toaster";


export function findMachinesShifts(): Promise<BaseResponse<MachineShiftInfo[]>> {

    const res = mainRouteApi.get(
        "/machine/config/shifts",
        {
        }
    );

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar turnos  \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })

}

export function addMachineShift(
    shiftInfo: AddMachineShift
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.post(
        "/machine/config/shifts",
        {
            machine_id: shiftInfo.machineId,
            machine_index: shiftInfo.machineIndex,
            start_time: shiftInfo.startTime,
            end_time: shiftInfo.endTime
        },
        {
        }
    );

}

export function deleteMachineShift(
    shiftInfo: DeleteMachineShift
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.delete(
        "/machine/config/shifts",
        {
            data: {
                machine_id: shiftInfo.machineId,
                machine_index: shiftInfo.machineIndex,
                shift_id: shiftInfo.shiftId
            },
        }
    );

}