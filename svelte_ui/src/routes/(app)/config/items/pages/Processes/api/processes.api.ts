import type { AxiosResponse } from "axios";
import { mainRouteApi, mainRouteApiString } from "$lib/api/api.global";
import type { BaseResponse } from "$lib/types/global.types";
import type { AddItemProcess, EditItemProcess, ProcessChildrenItemInfo, ProcessMaterialInfo, ToolInfo } from "../types/processes.types";
import svelteCloak from "$lib/auth/SvelteCloak";
import ToasterHandler from "$lib/toaster/toaster";


export async function findCompanyProcesses(): Promise<EventSource> {

    return new EventSource(
        mainRouteApiString +
        "/process" +
        `?authorization=${svelteCloak.keycloak.token}`
    );

}

export async function findProcessChildItems(processId: number): Promise<BaseResponse<ProcessChildrenItemInfo[]>> {

    const res = mainRouteApi.get(
        `/children/${processId}`
    )

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar itens filho  \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })

}

export function addItemProcess(
    processInfo: AddItemProcess
): Promise<AxiosResponse<BaseResponse<{ process_id: number, item: string }>>> {

    return mainRouteApi.post(
        "/process",
        {
            item_id: Number(processInfo.itemId),
            machine_id: processInfo.machineId,
            op_num: processInfo.opNum,
            execut_time: processInfo.executTime,
            setup_time: processInfo.setupTime
        },
    )
}

export function addProcessTool(
    processId: number,
    tool: string
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.post(
        "/tools/process",
        {
            process_id: processId,
            tool_name: tool
        },
    )
}

export function addProcessMaterial(
    processId: number,
    materialId: number,
    materialQtd: number
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.post(
        "/stock/process",
        {
            process_id: processId,
            material_id: materialId,
            material_qtd: materialQtd
        },
    )
}

export function addChildItem(
    parentProcessId: number,
    itemId: number,
    itemQtd: number
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.post(
        "/children",
        {
            parent_process_id: parentProcessId,
            children_item_id: itemId,
            item_qtd: itemQtd
        },
    );

}

export function updateChildItem(
    parentProcessId: number,
    itemId: number,
    itemQtd: number
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.patch(
        "/children",
        {
            parent_process_id: parentProcessId,
            children_item_id: itemId,
            item_qtd: itemQtd
        },
    );

}

export function editItemProcess(
    processInfo: EditItemProcess
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.patch(
        "/process",
        {
            process_id: processInfo.processId,
            item_id: Number(processInfo.itemId),
            machine_id: processInfo.machineId,
            op_num: processInfo.opNum,
            execut_time: processInfo.executTime,
            setup_time: processInfo.setupTime
        },
        {
        }
    )

}

export function deleteItemProcess(
    processId: number
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.delete(
        "/process",
        {
            data: {
                process_id: processId
            },
        }
    );

}

export function findProcessTools(
    processId: number
): Promise<BaseResponse<ToolInfo[]>> {

    const res = mainRouteApi.get(
        `/tools/process?process_id=${processId}`,
        {
        }
    );

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar ferramentais \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })
}

export function findProcessMaterials(
    processId: number
): Promise<BaseResponse<ProcessMaterialInfo[]>> {

    const res = mainRouteApi.get(
        `/stock/process?process_id=${processId}`,
    );

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar materiais \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })
}

export function updateItemProcessMaterial(
    materialId: number,
    materialQtd: number,
    processId: number
): Promise<AxiosResponse<BaseResponse<undefined>>> {
    return mainRouteApi.patch(
        "/stock/process",
        {
            process_id: processId,
            material_id: materialId,
            material_qtd: materialQtd
        },
    )
}

export function deleteChildItem(
    parentProcessId: number,
    itemId: number,
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.delete(
        "/children",
        {
            data: {
                parent_process_id: parentProcessId,
                children_item_id: itemId,
            }
        },
    );

}

export function deleteProcessTool(
    toolId: number,
    processId: number
): Promise<AxiosResponse<BaseResponse<undefined>>> {
    return mainRouteApi.delete(
        "/tools/process",
        {
            data: {
                process_id: processId,
                tool_id: toolId
            },
        }
    )
}

export function deleteProcessMaterial(
    materialId: number,
    processId: number
): Promise<AxiosResponse<BaseResponse<undefined>>> {
    return mainRouteApi.delete(
        "/stock/process",
        {
            data: {
                process_id: processId,
                material_id: materialId
            },
        }
    )
}