import { mainRouteApi, mainRouteApiString } from "$lib/api/api.global";
import type { AxiosResponse } from "axios";
import type { BaseResponse } from "$lib/types/global.types";
import svelteCloak from "../../../lib/auth/SvelteCloak";

// Returns ActiveMachineEntity[]
export async function findNextActiveMachines(): Promise<EventSource> {

    const stream = new EventSource(
        mainRouteApiString +
        "/machine/active" +
        `?authorization=${svelteCloak.keycloak.token}`
    )

    return stream;

}

export function executeCore(): Promise<AxiosResponse<BaseResponse<undefined>>> {

    return mainRouteApi.post(
        "/core",
        {},
    )

}