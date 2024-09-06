export type GroupingProcessInfo = {
    id: number;
    item_grouping: string;
    machine_name: string;
    part_number: string;
    odf: string;
    odf_id: number;
    odf_qtd: number;
    op_num: number;
    process_id: number;
}

export type GroupingFullInfo = {
    machine_name: string;
    item_grouping: string;
    id: number;
}