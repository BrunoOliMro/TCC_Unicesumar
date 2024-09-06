import type { AxiosResponse } from "axios";
import type { BaseResponse } from "$lib/types/global.types";
import { mainRouteApi } from "$lib/api/api.global";
import type { ItemTypeInfo } from "../types/item_types.types";
import ToasterHandler from "../../../../../../../lib/toaster/toaster";

export function findItemTypes(): Promise<BaseResponse<ItemTypeInfo[]>> {

    const res = mainRouteApi.get(
        "/item-types",
        {
        }
    );

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar tipos de item  \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })

}

export function editItemType(
    itemTypeId: number,
    hex: string
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.patch(
        "/item-types",
        {
            item_type_id: itemTypeId,
            item_hex: hex,
        },
        {
        }
    );

}


export function deleteItemType(
    itemTypeId?: number
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.delete(
        "/item-types",
        {
            data: {
                item_type_id: itemTypeId
            },
        }
    );

}