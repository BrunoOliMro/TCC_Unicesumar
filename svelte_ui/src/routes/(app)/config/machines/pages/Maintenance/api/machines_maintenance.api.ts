import type { AxiosResponse } from "axios";
import { mainRouteApi } from "$lib/api/api.global";
import type { BaseResponse } from "$lib/types/global.types";
import type { AddMachineMaintenance, DeleteMachineMaintenance, MachineMaintenance } from "../types/machines_maintenance.types";
import { Datetime } from "$lib/utils/Datetime";
import ToasterHandler from "$lib/toaster/toaster";

export function findMachinesMaintenance(): Promise<BaseResponse<MachineMaintenance[]>> {

    const res = mainRouteApi.get(
        "/machine/config/maintenance",
    );

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar manutenções  \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })

}

export function deleteMachineMaintenance(
    maintenanceInfo: DeleteMachineMaintenance
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.delete(
        "/machine/config/maintenance",
        {
            data: {
                machine_id: maintenanceInfo.machineId,
                machine_index: maintenanceInfo.machineIndex,
                maintenance_uuid: maintenanceInfo.maintenanceUuid
            },
        }
    );

}

export function addMachineMaintenance(
    maintenanceInfo: AddMachineMaintenance
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.post(
        "/machine/config/maintenance",
        {
            machine_id: maintenanceInfo.machineId,
            machine_index: maintenanceInfo.machineIndex,
            start_date: Datetime.convertGMTDateToAppDate(maintenanceInfo.startDate),
            end_date: Datetime.convertGMTDateToAppDate(maintenanceInfo.endDate),
            start_time: maintenanceInfo.startTime,
            end_time: maintenanceInfo.endTime,
        },
        {
        }
    );

}