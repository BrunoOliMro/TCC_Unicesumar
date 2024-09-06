export type AddItemProcess = {
    itemId: number;
    machineId: number;
    opNum: number;
    executTime: number;
    setupTime: number;
}

export type EditItemProcess = {
    processId: number;
    itemId: number;
    machineId: number;
    opNum: number;
    executTime: number;
    setupTime: number;
}

export type CompanyProcessInfo = {
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
    machine_id: number;
    machine_name: string;
    machine_index: number;
    finished_qtd: number;
    refused_qtd: number;
    missing_qtd: number;
    av_qtd: number;
    remodel_index?: number;
    item_grouping?: string;
    grouping_id?: number;
    item_type: string;
    type_hex: string;
    start_datetime: string;
    end_datetime: string;
    invalid_sequence_reason: string;
    company_id: number;
}

export type OdfProcessGeneralInfo = {
    odf_id: number;
    odf_qtd: number;
    process_id: number;
    op_num: number;
    machine: string;
}

export type ToolInfo = {
    id?: number;
    tool_id: number;
    tool: string;
}

export type ProcessMaterialInfo = {
    id?: number;
    material_id: number;
    material_name: string;
    material_qtd: number;
}

export type ProcessChildrenItemInfo = { item_img: string, item: string, item_id: number, item_qtd: number }