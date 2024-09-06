import type { AxiosResponse } from "axios";
import { mainRouteApi, mainRouteApiString } from "$lib/api/api.global";
import type { BaseResponse } from "$lib/types/global.types";
import type { CompanyProcessInfo, OdfProcessGeneralInfo } from "../../Processes/types/processes.types";
import type { AddOdfInfo, EditOdfInfo } from "../types/odfs.types";
import { Datetime } from "$lib/utils/Datetime";
import svelteCloak from "$lib/auth/SvelteCloak";
import ToasterHandler from "$lib/toaster/toaster";

// Returns OdfGeneralInfo
export async function findCompanyOdfs(): Promise<EventSource> {

    const stream = new EventSource(
        mainRouteApiString +
        "/odf" +
        `?authorization=${svelteCloak.keycloak.token}`
    );

    return stream;

}

export function findOdfProcesses(odfId: number): Promise<BaseResponse<CompanyProcessInfo[]>> {
    const res = mainRouteApi.get(
        `/odf/processes?odf_id=${odfId}`,
    );

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar processos da ODF  \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })

}

export function findOdfProcessesGeneralInfo(odfId: number): Promise<BaseResponse<OdfProcessGeneralInfo[]>> {
    const res = mainRouteApi.get(`/odf/processes/general?odf_id=${odfId}`, {
    })
    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar processos da ODF \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })
}

export function addOdf(odfInfo: AddOdfInfo): Promise<AxiosResponse<BaseResponse<{ odf_id: number, item: string }>>> {
    return mainRouteApi.post(
        "/odf",
        {
            item_id: Number(odfInfo.itemId),
            odf: odfInfo.odf,
            odf_qtd: odfInfo.odfQtd,
            ship_date: Datetime.convertGMTDateToAppDate(odfInfo.shipDate)
        },
    );
}

export function editOdf(odfInfo: EditOdfInfo): Promise<AxiosResponse<BaseResponse<undefined>>> {
    return mainRouteApi.patch(
        "/odf",
        {
            odf_id: Number(odfInfo.odfId),
            odf_qtd: odfInfo.odfQtd,
            ship_date: Datetime.convertGMTDateToAppDate(odfInfo.shipDate)
        },
        {
        }
    );
}

export function deleteOdf(
    odfId: number
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.delete(
        "/odf",
        {
            data: {
                odf_id: odfId
            },
        }
    );
}

// export function toggleOdfActivation(
//     odfId: number,
//     active: boolean
// ): Promise<AxiosResponse<BaseResponse<undefined>>> {
//     return mainRouteApi.post(
//         "/odf/active",
//         {
//             odf_id: odfId,
//             active: active
//         },
//         {
//         }
//     );
// }

export function toggleOdfCritic(
    odfId: number,
    critic: boolean
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.patch(
        "/odf/critic",
        {
            odf_id: odfId,
            critic: critic
        },
        {
        }
    );
}