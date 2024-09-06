import { ChildrenItemEntity } from "../../../../database/entities/tbl_children_items.entity";
import { mockOdfChildrenItems, mockProcessChildItemRelation, mockProcessesChildrenItem } from "./data/children.mock-data";

export class MockChildrenService {

    async findOdfChildItems(
    ): Promise<{ process_id: number, odf_id: number, ship_date: string, item: string, item_id: number, item_qtd: number, odf_qtd: number }[]> {
        return mockOdfChildrenItems
    }

    async findProcessesChildItems(
    ): Promise<{ [processId: number]: { item: string, item_id: number, item_qtd: number }[] }> {
        return {};
    }

    async findProcessChildItems(
    ): Promise<{ item: string, item_id: number, item_qtd: number }[]> {
        return mockProcessesChildrenItem[1];
    }

    async addChildItem(): Promise<void> {
        return;
    }

    async findProcessChildItemRelation(): Promise<ChildrenItemEntity> {
        return mockProcessChildItemRelation;
    }

    async editChildItem(): Promise<void> {
        return;
    }

    async deleteChildItem(): Promise<void> {
        return;
    }

}