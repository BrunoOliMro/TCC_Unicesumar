export type ActiveMachineEntity = {
    id: number;
    machine_name: string;
    machine_index: number;
    machine_group: string;
    machine_delayed: 0 | 1;
}