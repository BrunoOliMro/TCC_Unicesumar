import axios from 'axios';

export const mainRouteApi = axios.create(
    {
        baseURL: `${import.meta.env["VITE_SERVER_ROUTE"]}/api/v1`,
    },
);

export const mainRouteApiString = `${import.meta.env["VITE_SERVER_ROUTE"]}/api/v1`;

export const staticItemsRoute = `${import.meta.env["VITE_SERVER_ROUTE"]}/static`;