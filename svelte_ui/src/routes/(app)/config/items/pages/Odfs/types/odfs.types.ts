export type OdfGeneralInfo = {
    id: number;
    odf: string;
    odf_qtd: number;
    ship_date: string;
    critic: number;
    part_number_id: number;
    // active: 0 | 1;
    company_id?: number;
    part_number: string;
    start_datetime?: string;
    end_datetime?: string;
}

export type AddOdfInfo = {
    odf: string;
    itemId: number;
    shipDate: string;
    odfQtd: number;
}

export type EditOdfInfo = {
    odfId: number;
    shipDate: string;
    odfQtd: number;
}