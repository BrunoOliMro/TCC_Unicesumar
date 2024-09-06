import { mainRouteApiString } from "$lib/api/api.global";
import svelteCloak from "$lib/auth/SvelteCloak";

export async function findPointHistory(): Promise<EventSource> {

    const stream = new EventSource(
        mainRouteApiString +
        "/point" +
        `?authorization=${svelteCloak.keycloak.token}`
    );
    return stream;

}