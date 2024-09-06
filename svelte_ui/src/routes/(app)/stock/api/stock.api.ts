import type { AxiosResponse } from "axios"
import { mainRouteApi, mainRouteApiString } from "$lib/api/api.global"
import type { BaseResponse } from "$lib/types/global.types"
import type { MaterialInfo } from "../types/stock.types"
import svelteCloak from "$lib/auth/SvelteCloak"
import ToasterHandler from "$lib/toaster/toaster"


// Returns StockInfo
export async function findStock(): Promise<EventSource> {
    const stream = new EventSource(
        mainRouteApiString
        + "/stock" +
        `?authorization=${svelteCloak.keycloak.token}`
    )
    return stream;
}

export function findMaterials(): Promise<BaseResponse<MaterialInfo[]>> {
    const res = mainRouteApi.get("/stock/material")

    return res.then((res) => {
        return res.data
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar materiais  \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })
}

export function addMaterial(materialName: string, materialQtd: number): Promise<AxiosResponse<BaseResponse<{ material_id: number, stock_id: number }>>> {
    return mainRouteApi.post("/stock", {
        material_name: materialName,
        material_qtd: materialQtd
    });
}

export function deleteMaterial(stockId: number): Promise<AxiosResponse<BaseResponse<undefined>>> {
    return mainRouteApi.delete("/stock", {
        data: {
            stock_id: stockId
        },
    })
}

export function updateStockQtd(stockId: number, qtd: number): Promise<AxiosResponse<BaseResponse<undefined>>> {
    return mainRouteApi.patch("/stock", {
        stock_id: stockId,
        material_qtd: qtd
    }, {
    })
}