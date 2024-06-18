export type AlignType = "left" | "center" | "right";

export type AnimationType = "none" | "row" | "page";

export type ColumnType = {
  title: string;
  columnWidth: number;
  mapField: string;
  defaultValue: string;
};

const tableData = [
  {
    date: "1",
    name: "Tom",
    address: "xx",
  },
  {
    date: "2",
    name: "Tom",
    address: "xx",
  },
  {
    date: "3",
    name: "Tom",
    address: "xx",
  },
  {
    date: "4",
    name: "Tom",
    address: "xx",
  },
  {
    date: "5",
    name: "Tom",
    address: "xx",
  },
  {
    date: "6",
    name: "Tom",
    address: "xx",
  },
  {
    date: "7",
    name: "Tom",
    address: "xx",
  },
  {
    date: "8",
    name: "Tom",
    address: "xx",
  },
];

const tableConfig = {
  dataset: tableData as Record<string, string>[],
  publicConfig: {
    animationStyle: "row" as AnimationType,
    animationTime: 2,
    hoverStop: false,
    oddBg: "#2A2A2CFF",
    evenBg: "#232324FF",
  },
  rowConfig: {
    header: {
      headerBg: "#B885851A",
      headerHeight: 40,
      show: true,
      fontStyle: {
        size: 14,
        weight: "normal",
        color: "#fff",
        skew: "normal",
      },
    },
    body: {
      isFixedHeight: false,
      rowHeight: 50,
      rowCount: 7,
      fontStyle: {
        size: 14,
        weight: "normal",
        color: "#fff",
        skew: "normal",
      },
    },
  },
  columnConfig: {
    fixedWidth: false,
    showIndex: false,
    align: "center" as AlignType,
    indexColumn: {
      title: "#",
      startIndex: 1,
      columnWidth: 50,
      fontStyle: {
        size: 14,
        weight: "normal",
        color: "",
        skew: "normal",
      },
    },
    columns: [] as ColumnType[],
  },
};

const initColumn = (title: string, mapField: string): ColumnType => ({
  title,
  mapField,
  defaultValue: "",
  columnWidth: 110,
});

export type ComponentConfigType = typeof tableConfig;

export { tableConfig, tableData, initColumn };
