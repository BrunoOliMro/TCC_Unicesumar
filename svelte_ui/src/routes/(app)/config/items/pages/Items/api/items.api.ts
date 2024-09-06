import type { BaseResponse } from "$lib/types/global.types";
import { mainRouteApi, mainRouteApiString } from "$lib/api/api.global";
import type { AddItem, AddItemProcess, CompanyItemProcessInfo, EditItem } from "../types/items.types";
import type { AxiosResponse } from "axios";
import svelteCloak from "$lib/auth/SvelteCloak";
import type { ProcessMaterialInfo } from "../../Processes/types/processes.types";
import ToasterHandler from "$lib/toaster/toaster";

// Returns GeneralItemInfo
export async function findCompanyItems(): Promise<EventSource> {

    const stream = new EventSource(
        mainRouteApiString +
        "/item" +
        `?authorization=${svelteCloak.keycloak.token}`
    );
    return stream;

}

export async function findToolImg(
    itemId: number
): Promise<BaseResponse<string | undefined>> {

    const res = mainRouteApi.get(
        `/item/image/tool?tool_id=${itemId}`,
    );

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar imagem \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })

}

export async function findItemTecDraw(
    itemId: number
): Promise<BaseResponse<string | undefined>> {

    const res = mainRouteApi.get(
        `/item/image/tec-draw?item_id=${itemId}`,
    );

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar desenho técnico \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })

}

export function findItemProcesses(
    itemId: number
): Promise<BaseResponse<CompanyItemProcessInfo[]>> {

    const res = mainRouteApi.get(
        `/process/item?item_id=${itemId}`,
    );

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar processos do item \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })

}

export function findItemProcessMaterials(
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

export async function findItemProcessChildItems(processId: number): Promise<BaseResponse<{ item: string, item_id: number, item_qtd: number }[]>> {

    const res = mainRouteApi.get(
        `/children/${processId}`
    )

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar itens filho \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })

}

export function addItem(
    itemInfo: AddItem
): Promise<AxiosResponse<BaseResponse<{ item_id: number }>>> {

    return mainRouteApi.post(
        "/item",
        {
            part_number: itemInfo.item,
            part_number_type_id: itemInfo.typeId,
            price: itemInfo.price
        },
    );

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


export function addItemProcessTool(
    processId: number,
    tool: string
): Promise<AxiosResponse<BaseResponse<{ tool_id: number }>>> {

    return mainRouteApi.post(
        "/tools/process",
        {
            process_id: processId,
            tool_name: tool
        },
    )
}

export function addItemProcessMaterial(
    processId: number,
    materialId: number,
    materialQtd: number
): Promise<AxiosResponse<BaseResponse<{ id: number, material: string }>>> {

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

export function addToolImg(
    toolId: number,
    file: string
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('tool_id', toolId.toString())

    return mainRouteApi.post(
        "/item/image/tool",
        formData
    );

}

export function addItemImg(
    itemId: number,
    file: string
): Promise<AxiosResponse<BaseResponse<undefined>>> {


    const formData = new FormData();
    formData.append('file', file);
    formData.append('tool_id', itemId.toString())

    return mainRouteApi.post(
        "/item/image",
        formData
    );

}

export function addItemTecDraw(
    itemId: number,
    file: string
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('item_id', itemId.toString())

    return mainRouteApi.post(
        "/item/image/tec-draw",
        formData
    );

}

export function editItem(
    itemInfo: EditItem
): Promise<AxiosResponse<BaseResponse<undefined>>> {
    return mainRouteApi.patch(
        "/item",
        {
            part_number_id: itemInfo.itemId,
            part_number_type_id: itemInfo.typeId,
            price: itemInfo.price
        },
    );

}

export function updateProcessMaterial(
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

export function deleteItem(
    itemId: number
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.delete(
        "/item",
        {
            data: {
                part_number_id: itemId
            },
        },
    );

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

export function deleteItemProcessTool(
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


export function deleteItemProcessMaterial(
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


export function addItemType(
    itemType: string,
    hex: string
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.post(
        "/item-types",
        {
            item_type: itemType,
            item_hex: hex,
        },
        {
        }
    );

}