import { ChildrenItemEntity } from "../../../../../database/entities/tbl_children_items.entity"

export const mockOdfChildrenItems: { process_id: number, odf_id: number, ship_date: string, item: string, item_id: number, item_qtd: number, odf_qtd: number }[] = [
    {
        item: "item-1",
        process_id: 1,
        item_id: 1,
        item_qtd: 10,
        odf_id: 1,
        odf_qtd: 10,
        ship_date: "20241020"
    },
    {
        item: "item-2",
        process_id: 1,
        item_id: 2,
        item_qtd: 5,
        odf_id: 1,
        odf_qtd: 10,
        ship_date: "20241020"
    },
    {
        item: "item-3",
        process_id: 1,
        item_id: 4,
        item_qtd: 15,
        odf_id: 1,
        odf_qtd: 10,
        ship_date: "20241025"
    },
]

export const mockProcessesChildrenItem: { [processId: number]: { item: string, item_id: number, item_qtd: number }[] } = {
    1: [
        {
            item: "item-1",
            item_id: 1,
            item_qtd: 10,
        },
        {
            item: "item-3",
            item_id: 3,
            item_qtd: 5,
        },
        {
            item: "item-2",
            item_id: 2,
            item_qtd: 15,
        },
    ],
    2: [
        {
            item: "item-1",
            item_id: 1,
            item_qtd: 10,
        },
        {
            item: "item-2",
            item_id: 2,
            item_qtd: 5,
        },
        {
            item: "item-3",
            item_id: 3,
            item_qtd: 15,
        },
    ]
}

export const mockProcessChildItemRelation: ChildrenItemEntity = {
    id: 1,
    child_item_id: 1,
    item_qtd: 10,
    parent_process_id: 1
}