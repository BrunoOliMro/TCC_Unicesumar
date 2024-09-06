import type { AxiosResponse } from "axios";
import { mainRouteApi } from "$lib/api/api.global";
import type { BaseResponse } from "$lib/types/global.types";
import type { MachineGroupInfo } from "../types/machines_groups.types";
import ToasterHandler from "../../../../../../../lib/toaster/toaster";

export function findMachineGroups(): Promise<BaseResponse<MachineGroupInfo[]>> {

    const res = mainRouteApi.get(
        "/machine/groups",
    );

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar grupos de máquina \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })

}

export function addMachineGroup(machineGroup: string): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.post(
        "/machine/groups",
        {
            machine_group: machineGroup
        },
        {
        }
    );

}

export function deleteMachineGroup(
    machineGroupId: number
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.delete(
        "/machine/groups",
        {
            data: { machine_group_id: machineGroupId },
        }
    );

}