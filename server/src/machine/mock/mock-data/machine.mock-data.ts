import { MachineEntity } from "../../../database/entities/tbl_machines.entity";
import { ActiveMachineEntity } from "../../../database/entities/vw_active_machines.entity";

export const mockActiveMachines: ActiveMachineEntity[] = [
    {
        id: 3,
        machine_name: "LAS01",
        machine_index: 0,
        company_id: 1,
        machine_group: "Laser",
    },
    {
        id: 2,
        machine_name: "LAS01",
        machine_index: 1,
        company_id: 1,
        machine_group: "Laser",
    },
    {
        id: 4,
        machine_name: "DBR01",
        machine_index: 0,
        company_id: 1,
        machine_group: "Dobra",
    },
    {
        id: 1,
        machine_name: "SLD01",
        machine_index: 0,
        company_id: 1,
        machine_group: "Solda",
    },
    {
        id: 3,
        machine_name: "SLD01",
        machine_index: 1,
        company_id: 1,
        machine_group: "Solda",
    },
];

export const mockCompanyMachines: MachineEntity[] = [
    {
        id: 1,
        machine: "LAS01",
        company_id: 1,
        machine_group_id: 1,
    },
    {
        id: 2,
        machine: "DRB01",
        company_id: 1,
        machine_group_id: 2,
    },
    {
        id: 3,
        machine: "SLD01",
        company_id: 1,
        machine_group_id: 3,
    },
];