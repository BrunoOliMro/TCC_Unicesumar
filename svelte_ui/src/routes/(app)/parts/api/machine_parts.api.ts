import { mainRouteApi, mainRouteApiString } from "$lib/api/api.global";
import type { AxiosResponse } from "axios";
import svelteCloak from "$lib/auth/SvelteCloak";
import type { BaseResponse } from "$lib/types/global.types";
import type { ProcessNeededItemInfo, UpdatePointQtdInfo } from "../types/machine_parts.types";
import ToasterHandler from "$lib/toaster/toaster";

export async function findMachineProcesses(machineId: number, machineIndex: number): Promise<EventSource> {

    // const splittedMachine = machine.split("-");
    // const queryParams = {
    //     machine: splittedMachine.slice(0, splittedMachine.length - 1).join("-"),
    //     machine_index: Number(splittedMachine.at(-1)),
    // };

    const queryParams = {
        machine_id: machineId,
        machine_index: machineIndex
    }

    const stream = new EventSource(
        mainRouteApiString +
        "/machine/processes" +
        `?machine_id=${queryParams.machine_id}&machine_index=${queryParams.machine_index}&authorization=${svelteCloak.keycloak.token}`
    );
    return stream;

}

export async function updatePointQtd(
    pointInfo: UpdatePointQtdInfo
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.patch(
        "/point",
        {
            process_id: pointInfo.processId,
            odf_id: pointInfo.odfId,
            finished_qtd: pointInfo.finishedQtd,
            refused_qtd: pointInfo.refusedQtd,
            missing_qtd: pointInfo.missingQtd
        }
    );

}

export async function finishGroupingPoint(
    groupingId: number
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.patch(
        "/point/group/finish",
        {
            group_id: groupingId
        }
    );

}

export async function findProcessNeededItemsInfo(
    processId: number
): Promise<BaseResponse<ProcessNeededItemInfo[]>> {

    const res = mainRouteApi.get(
        `/process/detail/items?process_id=${processId}`,
    );

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar itens  \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })

}