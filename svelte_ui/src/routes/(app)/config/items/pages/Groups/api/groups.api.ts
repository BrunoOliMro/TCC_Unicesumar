import type { AxiosResponse } from "axios";
import { mainRouteApi } from "$lib/api/api.global";
import type { BaseResponse } from "$lib/types/global.types";
import type { CreateItemGrouping, DeleteItemGrouping, GroupingProcessInfo, ItemGroupingInfo } from "../types/groups.types";
import ToasterHandler from "$lib/toaster/toaster";


export function findItemGroupings(): Promise<BaseResponse<ItemGroupingInfo[]>> {
    const res = mainRouteApi.get(
        "/item/groups",
        {
        }
    );

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar grupamentos \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })
}

export function findGroupingProcesses(groupingId: number): Promise<BaseResponse<GroupingProcessInfo[]>> {
    const res = mainRouteApi.get(
        `/item/groups/${groupingId}`,
        {
        }
    );

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar processos dos grupamentos \n${err.response.data.messsage || "Erro interno"}`);
            console.log(err)
        })
}

export function addProcessToGrouping(
    groupingId: number,
    odfId: number,
    processId: number
): Promise<AxiosResponse<BaseResponse<undefined>>> {
    return mainRouteApi.post(
        "/item/groups/process",
        {
            grouping_id: groupingId,
            process_id: processId,
            odf_id: odfId
        },
        {
        }
    )
}

export function createItemGrouping(
    groupingInfo: CreateItemGrouping
): Promise<AxiosResponse<BaseResponse<undefined>>> {
    return mainRouteApi.post(
        "/item/groups",
        {
            grouping: groupingInfo.grouping,
            machine_id: groupingInfo.machineId
        },
        {
        }
    )
}

export function deleteItemGrouping(
    groupingInfo: DeleteItemGrouping
): Promise<AxiosResponse<BaseResponse<undefined>>> {
    return mainRouteApi.delete(
        "/item/groups",
        {
            data: {
                grouping_id: groupingInfo.groupingId
            },
        }
    )
}

export function deleteGroupingProcess(
    processId: number,
    odfId: number,
): Promise<AxiosResponse<BaseResponse<undefined>>> {
    return mainRouteApi.delete(
        "/item/groups/process",
        {
            data: {
                process_id: processId,
                odf_id: odfId
            },
        }
    )
}