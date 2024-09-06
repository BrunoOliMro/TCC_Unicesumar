import { MachineEntity } from "../../database/entities/tbl_machines.entity";

export type MachineFullInfo = MachineEntity & { machine_group: string }