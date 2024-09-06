export type CompanyItemProcessInfo = {
    process_id: number;
    item_id: number;
    item: string;
    price?: number;
    type?: string;
    execut_time: number;
    setup_time: number;
    machine_name: string;
    op_num: number;
}

export type GeneralItemInfo = {
    id: number;
    part_number: string;
    price: number;
    company_id?: number;
    type?: string;
    part_number_type?: number;
    hex?: string;
    item_img: string;
}

export type AddItem = {
    item: string;
    typeId: number;
    price: number;
}

export type EditItem = {
    itemId: number;
    typeId: number;
    price: number;
}

export type AddItemProcess = {
    itemId: number;
    machineId: number;
    opNum: number;
    executTime: number;
    setupTime: number;
}