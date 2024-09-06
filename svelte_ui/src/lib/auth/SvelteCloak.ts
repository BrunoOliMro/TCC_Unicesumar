
import { type KeycloakConfig, } from "keycloak-js";


type RouterConfig = {
    [key: string]: {
        type: "client" | "realm",
        role: string
    }[];
};

type Options = {
    strict?: boolean;
    unauthorizedUrl?: string;
};

class SvelteCloakConfig {
    private _ROUTER_CONFIG: RouterConfig = {
        "/": [
            {
                type: "client",
                role: "Next_user"
            }
        ],
        "/parts/*": [
            {
                type: "client",
                role: "Next_user"
            }
        ],
        "/config/*": [
            {
                type: "client",
                role: "Next_admin"
            }
        ],
        "/stock": [
            {
                type: "client",
                role: "Next_admin"
            }
        ],
        "/remodel": [
            {
                type: "client",
                role: "Next_admin"
            }
        ],
        "/point_history": [
            {
                type: "client",
                role: "Next_admin"
            }
        ],
    };

    private _options: Options = {
        strict: false,
        unauthorizedUrl: "/",
    };

    private _keycloakConfig: KeycloakConfig = {
        clientId: import.meta.env["VITE_KC_CLIENT_ID"],
        realm: import.meta.env["VITE_KC_REALM"],
        url: import.meta.env["VITE_KC_CAS_URL"],
    };

    public keycloak: any;

    private _currentRoute = "";
    private _initCallback: () => any | void = () => { };

    public config(keycloakConfig: KeycloakConfig, options?: Options) {
        this._keycloakConfig = keycloakConfig;

        if (options) {
            this._options = Object.assign(this._options, options);
        }
    }

    public set initCallback(callback: () => any | void) {
        this._initCallback = callback;
    }

    public get initCallback() {
        return this._initCallback;
    }

    public get keycloakConfig() {
        return this._keycloakConfig;
    }

    public get unauthorizedUrl(): string {
        return this._options.unauthorizedUrl!;
    }

    public set currentRoute(currentRoute: string) {
        this._currentRoute = currentRoute;
    }

    private _findConfiguredRoute() {
        let parentConfiguredRoute = "";
        let isWildcardRoute = false;

        try {
            const routeToCheck = this._currentRoute.split("/");

            while (!parentConfiguredRoute && routeToCheck.length) {
                const joinedRoute = routeToCheck.join("/") || '/';
                const wildcardRoute = [...routeToCheck.slice(0, -1), "*"].join("/");


                if (this._ROUTER_CONFIG.hasOwnProperty(joinedRoute)) {
                    parentConfiguredRoute = joinedRoute;
                } else if (this._ROUTER_CONFIG.hasOwnProperty(wildcardRoute)) {
                    parentConfiguredRoute = wildcardRoute;
                    isWildcardRoute = true;
                }

                routeToCheck.pop();
            }

            if ((this._options?.strict && !parentConfiguredRoute) || isWildcardRoute) {
                throw new Error(
                    "SvelteCloak: Every route authorization must be defined while on strict mode"
                );
            }
        } catch (error: any) {
            console.log(error.message);
        }

        return parentConfiguredRoute;
    }

    public checkAuthorization() {
        const routePermissions = this._ROUTER_CONFIG[this._findConfiguredRoute()];

        let authorized = true;

        const hasAccess = routePermissions?.every(role => {
            if (role.type === "client") {
                return this.keycloak.hasResourceRole(role.role, import.meta.env["VITE_KC_ROLES_CLIENT"])
            } else {
                return this.keycloak.hasRealmRole(role.role)
            }
        })

        if (!hasAccess) {
            authorized = false
        }
        return authorized;

    }
}

const svelteCloak = new SvelteCloakConfig();

export default svelteCloak;