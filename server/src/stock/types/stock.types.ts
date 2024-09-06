import { ProcessMaterialEntity } from "../../database/entities/tbl_process_materials.entity";
import { StockEntity } from "../../database/entities/tbl_stock.entity";

export type StockInfo = StockEntity & ProcessMaterialEntity

export type ProcessMaterialInfo = {
    id: number;
    material_id: number;
    material_qtd: number;
    material_name: string;
}