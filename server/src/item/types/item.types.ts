import { ProcessEntity } from "../../database/entities/tbl_process.entity";

export type ItemFullInfo = {

    part_number: string;
    price: number;
    processes: ProcessEntity[];

}

export type GeneralItemInfo = {

    id: number;
    part_number: string;
    price: number;
    company_id: number;
    type: string;
    part_number_type: number;
    hex: string;
    item_img: string;

}
export type ItemProcessInfo = {
    process_id: number;
    part_number_id: number;
    price: number;
    part_number_type: number;
    part_number: string;
    execut_time: number;
    setup_time: number;
    machine_name: string;
    op_num: number;
}