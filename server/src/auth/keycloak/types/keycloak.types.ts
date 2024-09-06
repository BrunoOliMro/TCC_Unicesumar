export type KeycloakGroupInfo = {
    id: string;
    name: string;
    path: string;
    attributes: { [attribute: string]: unknown }
    realmRoles: string[]
    clientRoles: { [role: string]: unknown }
    subGroups: KeycloakGroupInfo[]
}