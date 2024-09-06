import { OdfEntity } from "../../database/entities/tbl_odfs.entity";

export type OdfGeneralInfo = OdfEntity & { part_number: string, start_datetime?: string, end_datetime?: string }

export type OdfProcessGeneralInfo = {
    odf_id: number;
    odf_qtd: number;
    process_id: number;
    op_num: number;
    machine: string;
}

export type OdfProcessQtdInfo = {

    process_id: number;
    odf_id: number;
    op_num: number;
    execut_time: number;
    setup_time: number;
    odf_qtd: number;
    finished_qtd: number;
    missing_qtd: number;
    refused_qtd: number;

}

export type OdfProcessFullInfo = {
    odf_id: number;
    odf: string;
    odf_qtd: number;
    process_id: number;
    part_number: string;
    part_number_id: number;
    type: string;
    type_hex: string;
    price: number;
    execut_time: number;
    setup_time: number;
    machine_name: string;
    machine_index: number;
    op_num: number;
    start_datetime: string;
    end_datetime: string;
    grouping_name: string;
    invalid_sequence_reason: string;
}