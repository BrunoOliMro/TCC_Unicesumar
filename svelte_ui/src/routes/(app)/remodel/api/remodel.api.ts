import type { AxiosResponse } from "axios";
import { mainRouteApi, mainRouteApiString } from "$lib/api/api.global";
import type { BaseResponse } from "$lib/types/global.types";
import svelteCloak from "$lib/auth/SvelteCloak";

export async function findRemodelProcesses(): Promise<EventSource> {

    return new EventSource(mainRouteApiString
        + `/process/status/remodel?authorization=${svelteCloak.keycloak.token}`);

}

export function deleteRemodelProcess(
    odfId: number,
    processId: number
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.delete(
        "/process/status/remodel", {
        data: {
            odf_id: odfId,
            process_id: processId
        },
    });

}

export function addRemodelProcess(
    odfId: number,
    processId: number,
    remodelIndex: number
): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.post(
        "/process/status/remodel", {
        odf_id: odfId,
        process_id: processId,
        remodel_index: remodelIndex
    }, {
    });

}