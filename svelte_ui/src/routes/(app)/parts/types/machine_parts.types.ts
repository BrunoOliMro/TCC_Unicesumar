export type MachineProcess = {
    id: number;
    odf_id: number;
    odf: string;
    odf_qtd: number;
    ship_date: string;
    execut_time: number;
    setup_time: number;
    op_num: number;
    critic: number;
    item: string;
    price: number;
    item_id: number;
    machine_name: string;
    finished_qtd: number;
    refused_qtd: number;
    missing_qtd: number;
    av_qtd: number;
    status: number;
    remodel_index?: number;
    item_grouping?: string;
    grouping_id?: number;
    company_id: number;
    process_delayed: 0 | 1;
    start_datetime: string;
    end_datetime: string;
    type_hex?: string;
    part_number_type: string;

    item_img: string;
}

export type UpdatePointQtdInfo = {

    processId: number;
    odfId: number;
    finishedQtd: number;
    missingQtd: number;
    refusedQtd: number;

}

export type ProcessNeededItemInfo = {
    item: string;
    img: string;
    needed_qtd: number;
    stock_qtd?: number;
}