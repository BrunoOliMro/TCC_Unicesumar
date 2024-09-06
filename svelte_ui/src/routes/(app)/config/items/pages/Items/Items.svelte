<script lang="ts">
  import Button from "$lib/components/Buttons/Button.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import NumberInput from "$lib/components/Inputs/NumberInput.svelte";
  import SelectInput from "$lib/components/Inputs/SelectInput.svelte";
  import TextInput from "$lib/components/Inputs/TextInput.svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import { addItem, editItem, findCompanyItems } from "./api/items.api";
  import type { GeneralItemInfo } from "./types/items.types";
  import ItemCard from "./components/ItemCard.svelte";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import SearchInput from "$lib/components/Filters/SearchInput.svelte";
  import { onDestroy, onMount } from "svelte";
  import PaginationSelectors from "$lib/components/Pagination/PaginationSelectors.svelte";
  import SimplePopup from "../../../../../../lib/components/Popups/SimplePopup.svelte";
  import type { ItemTypeInfo } from "../ItemTypes/types/item_types.types";
  import { findItemTypes } from "../ItemTypes/api/item_types.api";

  let editPopupIsOpen = false;

  let newItemInfos: {
    item: string;
    price: number;
    itemTypeId: number;
  } = {
    item: "",
    price: 0,
    itemTypeId: 0,
  };

  let editItemInfos: {
    price: number;
    itemTypeId: number;
  } = {
    price: 0,
    itemTypeId: 0,
  };

  let selectedItem: {
    item?: string;
    id: number;
  };

  let searchItem = "";

  let newItemType: string;

  let companyItems: GeneralItemInfo[] = [];
  let companyItemsStream: EventSource | null;

  const pace = 10;
  let currPage = 0;

  $: pages = Math.ceil(companyItems.length / pace);

  $: visibleItems = companyItems
    .filter((item) => {
      return (
        !searchItem ||
        searchItem.trim() === "" ||
        (item.part_number &&
          item.part_number.toUpperCase().includes(searchItem.toUpperCase())) ||
        (item.type &&
          item.type.toUpperCase().includes(searchItem.toUpperCase()))
      );
    })
    .slice(currPage * pace, (currPage + 1) * pace);

  const startStreams = async (): Promise<void> => {
    companyItemsStream = await findCompanyItems();
    companyItemsStream.onmessage = (ev) => {
      if (JSON.parse(ev.data).end) {
        companyItemsStream?.close();
        companyItemsStream = null;
        return;
      }
      companyItems = companyItems.concat(JSON.parse(ev.data));
    };
    companyItemsStream.onerror = (err) => {
      companyItemsStream?.close();
      companyItemsStream = null;
    };
  };

  let itemTypesToSelect: ItemTypeInfo[] = [
    {
      id: 0,
      type: "Normal",
      type_hex: "",
      company_id: 0,
    },
  ];

  const fetchItemTypes = async (): Promise<ItemTypeInfo[]> => {
    const res = await findItemTypes();
    itemTypesToSelect = [
      {
        id: 0,
        type: "Normal",
        type_hex: "",
        company_id: 0,
      },
    ];
    itemTypesToSelect = itemTypesToSelect.concat(res.data);
    return res.data;
  };

  let itemTypes: Promise<ItemTypeInfo[]> = fetchItemTypes();

  const handleEditItem = () => {
    const promise = editItem({
      itemId: selectedItem.id,
      price: editItemInfos.price,
      typeId: editItemInfos.itemTypeId,
    });
    ToasterHandler.createPromiseToast({
      loadingMessage: "Editando item",
      promise: promise,
    });
    promise.then(async () => {
      const editedItemIndex = companyItems.findIndex(
        (item) => item.id === selectedItem.id
      );
      if (editedItemIndex === -1) return;
      const typeInfos = (await itemTypes).find(
        (itemType) => itemType.id === editItemInfos.itemTypeId
      );
      Object.assign(companyItems[editedItemIndex], {
        price: editItemInfos.price,
        part_number_type: editItemInfos.itemTypeId,
        type: typeInfos ? typeInfos.type || "Sem tipo" : "Sem tipo",
        hex: typeInfos?.type_hex ?? undefined,
      });
      companyItems = companyItems;
    });
  };

  const handleAddItem = () => {
    const promise = addItem({
      item: newItemInfos.item,
      price: newItemInfos.price,
      typeId: newItemInfos.itemTypeId,
    });
    ToasterHandler.createPromiseToast({
      loadingMessage: "Adicionando item",
      promise: promise,
    });
    promise.then(async (res) => {
      const itemId = res.data.data.item_id;
      const typeInfos = (await itemTypes).find(
        (itemType) => itemType.id === editItemInfos.itemTypeId
      );
      companyItems.push({
        id: itemId,
        item_img: "noImg.png",
        part_number: newItemInfos.item,
        part_number_type: typeInfos?.id ?? undefined,
        price: newItemInfos.price,
        hex: typeInfos?.type_hex ?? undefined,
        type: typeInfos?.type ?? undefined,
      });
      companyItems = companyItems;
    });
  };

  const handleDeleteItem = (itemId: number) => {
    companyItems = companyItems.filter((item) => {
      return item.id !== itemId;
    });
  };

  onMount(() => {
    startStreams();
  });
  onDestroy(() => {
    if (companyItemsStream) {
      companyItemsStream.close();
    }
    companyItemsStream = null;
  });
</script>

<div
  class="
  flex
  w-full h-full
  companyItems"
>
  <div
    class="
w-1/2 h-full
flex flex-col justify-between
gap-base
viewItems"
  >
    <div
      class="
  w-full
  flex items-center justify-end
  searchDiv"
    >
      <SearchInput bind:value={searchItem}></SearchInput>
    </div>
    <div
      class="
      h-full w-full
      gap-base
      flex flex-col justify-between
      currentItems"
    >
      <div
        class="
    h-[600px]
    grid grid-cols-1
    content-start
    overflow-y-auto
    gap-base px-base
    currPageItems"
      >
        {#each visibleItems as item, i}
          <ItemCard
            {companyItems}
            itemId={item.id}
            itemColor={item.hex}
            price={item.price}
            partNumberType={item.type}
            itemImg={item.item_img}
            item={item.part_number}
            on:delete={() => handleDeleteItem(item.id)}
            on:edit={() => {
              editPopupIsOpen = true;
              selectedItem = { item: item.part_number, id: item.id };
            }}
          ></ItemCard>
        {/each}
      </div>
    </div>
    <div
      class="
    w-full h-[10%]
    flex items-center justify-end
    pagination"
    >
      <PaginationSelectors bind:currPage {pages}></PaginationSelectors>
    </div>
  </div>
  <div
    class="
      w-1/2 h-full min-h-full
      gap-base
      px-base
      flex flex-col
      manageItems"
  >
    <div
      class="
        w-full h-gap-vertical-1/3-box
        flex flex-col
        gap-base p-base
        border-solid border-2 border-light-gray
        rounded
        addItem"
    >
      <div
        class="
          w-full
          flex justify-center
          addItemTitle"
      >
        <Title text="Adicionar item"></Title>
      </div>
      <div
        class="
        w-full
        grid grid-cols-3
        gap-base
        addItemForm"
      >
        <InputForm type="vertical" label="Item">
          <TextInput bind:value={newItemInfos.item}></TextInput>
        </InputForm>
        <InputForm type="vertical" label="Preço">
          <NumberInput min={0} max={9999999} bind:value={newItemInfos.price}
          ></NumberInput>
        </InputForm>
        <InputForm type="vertical" label="Tipo do item">
          <SelectInput
            options={itemTypesToSelect.map((itemTypeInfo) => {
              return {
                text: itemTypeInfo.type,
                value: itemTypeInfo.id,
              };
            })}
            bind:value={newItemInfos.itemTypeId}
          ></SelectInput>
        </InputForm>
      </div>
      <div
        class="
        w-full
        pt-base
        flex justify-end items-center
        addItemButton"
      >
        <Button text="Adicionar" clickFunction={handleAddItem}></Button>
      </div>
    </div>
  </div>
</div>

<SimplePopup h="h-[35%]" w="w-[50%]" bind:isOpen={editPopupIsOpen}>
  <div
    class="
          w-full h-full
          justify-between
          gap-base
          flex flex-col
          itemEdit"
  >
    <div
      class="
          w-full
          flex justify-center
          editItemTitle"
    >
      <Title text="Editar item"></Title>
    </div>
    <div
      class="
        w-full
        grid grid-cols-3
        gap-base
        editItemForm"
    >
      <InputForm type="vertical" label="Preço">
        <NumberInput min={0} max={9999999} bind:value={editItemInfos.price}
        ></NumberInput>
      </InputForm>
      <InputForm type="vertical" label="Tipo do item">
        <SelectInput
          options={itemTypesToSelect.map((itemTypeInfo) => {
            return {
              text: itemTypeInfo.type,
              value: itemTypeInfo.id,
            };
          })}
          bind:value={editItemInfos.itemTypeId}
        ></SelectInput>
      </InputForm>
    </div>
    <div
      class="
        w-full
        pt-base
        flex justify-end items-center
        editItemButton"
    >
      <Button text="Editar" clickFunction={handleEditItem}></Button>
    </div>
  </div>
</SimplePopup>
