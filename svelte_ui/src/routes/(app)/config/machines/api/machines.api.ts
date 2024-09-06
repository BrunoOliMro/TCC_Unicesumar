import { mainRouteApi, mainRouteApiString } from "$lib/api/api.global";
import type { BaseResponse } from "$lib/types/global.types";
import svelteCloak from "$lib/auth/SvelteCloak";
import type { GeneralMachineInfo, MachineGroup } from "../types/machines.types";
import ToasterHandler from "$lib/toaster/toaster";

// Returns CompanyMachineInfo
export async function findCompanyMachines(): Promise<EventSource> {

    const stream = new EventSource(
        mainRouteApiString +
        "/machine" +
        `?authorization=${svelteCloak.keycloak.token}`
    );

    return stream;

}

export async function findMachinesGeneralInfo(): Promise<BaseResponse<GeneralMachineInfo[]>> {

    const res = mainRouteApi.get(
        "/machine/general",
    );

    return res.then((res) => {
        return res.data;
    })
        .catch((err) => {
            ToasterHandler.createErrorToast(`Erro ao buscar máquinas \n${err.response.data.messsage || "Erro interno"}`)
            console.log(err)
        })

}

export function findMachineGroups(): Promise<BaseResponse<MachineGroup[]>> {
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