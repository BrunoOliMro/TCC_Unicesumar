import { CompanyProcessEntity } from "../../../database/entities/vw_company_processes.entity"

export type SequenceCount = {

    total: CompanyProcessEntity[],
    sequenced: CompanyProcessEntity[],

}

export type CompanyItemProcessInfo = {
    process_id: number;
    item_id: number;
    item: string;
    price: number;
    type: string;
    execut_time: number;
    setup_time: number;
    machine_name: string;
    op_num: number;
}

export type ProcessNeededItemInfo = {
    item: string;
    img: string;
    needed_qtd: number;
    stock_qtd?: number;
}