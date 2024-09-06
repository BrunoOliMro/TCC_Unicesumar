export type ItemGroupingInfo = {
    id: number;
    item_grouping: string;
    machine_name: string;
}

export type CreateItemGrouping = {
    grouping: string;
    machineId: number;
}

export type DeleteItemGrouping = {
    groupingId: number;
}

export type GroupingProcessInfo = {
    id: number;
    odf_id: number;
    item_grouping: string;
    machine_name: string;
    part_number: string;
    odf: string;
    op_num: number;
    process_id: number;
}