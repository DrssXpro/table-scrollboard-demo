import { memo, useEffect, useMemo, useRef, useState } from "react";
import { ComponentConfigType } from "./config";

interface TableComponentProps {
  data: Record<string, string>[];

  config: ComponentConfigType;
}

interface HeaderComponentProps {
  headerTitles: string[];
  columnWidths: string[];
  config: ComponentConfigType;
}

interface BodyComponentProps {
  data: string[][];
  columnWidths: string[];
  config: ComponentConfigType;
}

const h = 400;

const TableHeader = memo((props: HeaderComponentProps) => {
  const { config, headerTitles, columnWidths } = props;

  const headerStyle = useMemo<React.CSSProperties>(() => {
    const headerConfig = config.rowConfig.header;
    const { headerHeight, headerBg, fontStyle } = headerConfig;
    return {
      height: `${headerHeight}px`,
      lineHeight: `${headerHeight}px`,
      background: `${headerBg}`,
      fontSize: `${fontStyle.size}px`,
      fontWeight: `${fontStyle.weight}`,
      color: `${fontStyle.color}`,
      fontStyle: `${fontStyle.skew}`,
    };
  }, [config.rowConfig.header]);

  return (
    <div
      className="w-full flex items-center"
      style={{
        ...headerStyle,
      }}
    >
      {headerTitles.map((title, index) => (
        <div key={index} style={{ width: columnWidths[index], textAlign: config.columnConfig.align }}>
          {title}
        </div>
      ))}
    </div>
  );
});

const TableBody = (props: BodyComponentProps) => {
  type RowType = {
    ceils: string[];
    rowIndex: number;
    scrollKey: number;
  };

  const { data, config, columnWidths } = props;
  const { animationTime, animationStyle, hoverStop } = config.publicConfig;

  const animationRef = useRef({
    rowCount: 0,
    rowsData: [] as RowType[],
    rowHeight: 0,
    updater: 0,
    animationIndex: 0,
    animationTimer: 0,
  });

  const [bodyState, setBodyState] = useState<{
    rows: RowType[];
    heights: number[];
  }>(calcBodyState);

  // 行数据文字样式
  const rowFontStyle = useMemo<React.CSSProperties>(() => {
    const fontStyle = config.rowConfig.body.fontStyle;
    return {
      fontSize: `${fontStyle.size}px`,
      fontWeight: `${fontStyle.weight}`,
      color: `${fontStyle.color}`,
      fontStyle: `${fontStyle.skew}`,
    };
  }, [config.rowConfig.body.fontStyle]);

  useEffect(() => {
    setBodyState(calcBodyState);
    reAnimation();
  }, [config.rowConfig, config.columnConfig]);

  useEffect(() => {
    reAnimation();
  }, [config.publicConfig]);

  function calcRowHeight(rowCount: number) {
    const { header, body } = config.rowConfig;
    const totalHeight = h - header.headerHeight;
    return body.isFixedHeight ? body.rowHeight : totalHeight / rowCount;
  }

  function calcBodyState() {
    const rowLength = data.length;
    const rowCount = config.rowConfig.body.rowCount;
    let newData = data.map((i, index) => ({ ceils: i, rowIndex: index }));
    if (rowLength > rowCount && rowLength < 2 * rowCount) {
      newData = [...newData, ...newData];
    }
    const scrollData = newData.map((i, index) => ({ ...i, scrollKey: index }));
    const heights = new Array(data.length).fill(calcRowHeight(config.rowConfig.body.rowCount));
    animationRef.current.rowsData = scrollData;
    animationRef.current.rowHeight = heights[0];
    animationRef.current.rowCount = rowCount;
    return {
      rows: scrollData,
      heights,
    };
  }

  async function startAnimation(start = false) {
    let { animationIndex } = animationRef.current;
    const { rowCount, rowHeight, rowsData, updater } = animationRef.current;

    if (animationStyle === "none") return;

    if (start) {
      await new Promise((resolve) => setTimeout(resolve, animationTime * 1000));
      if (updater !== animationRef.current.updater) {
        return;
      }
    }

    let rows = rowsData.slice(animationIndex);
    rows.push(...rowsData.slice(0, animationIndex));
    rows = rows.slice(0, animationStyle === "row" ? rowCount + 1 : rowCount * 2);

    const rowLength = rowsData.length;
    const heights = new Array(rowLength).fill(rowHeight);
    const animationNum = animationStyle === "row" ? 1 : rowCount;
    heights.splice(0, animationNum, ...new Array(animationNum).fill(0));
    setBodyState((pre) => ({ ...pre, rows, heights }));

    animationIndex += animationNum;
    const back = animationIndex - rowLength;
    if (back >= 0) animationIndex = back;
    animationRef.current.animationIndex = animationIndex;
    animationRef.current.animationTimer = setTimeout(startAnimation, animationTime * 1000 + 300);
  }

  function stopAnimation() {
    const { updater, animationTimer } = animationRef.current;
    animationRef.current.updater = (updater + 1) % 999999;
    animationTimer && clearTimeout(animationTimer);
  }

  function reAnimation() {
    stopAnimation();
    startAnimation(true);
  }

  return (
    <div
      onMouseEnter={() => {
        hoverStop && stopAnimation();
      }}
      onMouseLeave={() => {
        if (hoverStop) {
          reAnimation();
        }
      }}
      className="flex flex-col"
    >
      {bodyState.rows.map((row, rowIndex) => (
        <div
          key={`row-${row.scrollKey}`}
          className="flex transition-all items-center overflow-hidden"
          style={{
            height: `${bodyState.heights[rowIndex]}px`,
            background: row.rowIndex % 2 === 0 ? config.publicConfig.evenBg : config.publicConfig.oddBg,
          }}
        >
          {row.ceils.map((ceil, ceilIndex) => (
            <div
              key={ceilIndex}
              style={{ ...rowFontStyle, width: columnWidths[ceilIndex], textAlign: config.columnConfig.align }}
            >
              {ceil}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const TableScrollBoradComponent = (props: TableComponentProps) => {
  const { config } = props;

  const headerTitles = useMemo(() => {
    const headers = config.columnConfig.showIndex ? [config.columnConfig.indexColumn.title] : [];
    config.columnConfig.columns.forEach((column) => {
      headers.push(column.title);
    });
    return headers;
  }, [config.columnConfig]);

  const rowsData = useMemo(() => {
    const columnConfig = config.columnConfig;
    const columns = config.columnConfig.columns;
    let startIndex = columnConfig.indexColumn.startIndex;
    return new Array(config.dataset.length).fill(0).map((_, index) => {
      const rowData = config.dataset[index];
      const row = columnConfig.showIndex ? [`${startIndex++}`] : [];
      return [...row, ...columns.map((item) => rowData[item.mapField] || item.defaultValue)];
    });
  }, [config.columnConfig]);

  const columnWidths = useMemo(() => {
    const columns = config.columnConfig.columns;
    const indexColumn = config.columnConfig.indexColumn;
    const showIndex = config.columnConfig.showIndex;
    const contentTotalWidth = columns.map((col) => col.columnWidth).reduce((prev, current) => prev + current, 0);
    const totalWidth = showIndex ? contentTotalWidth + indexColumn.columnWidth : contentTotalWidth;

    if (config.columnConfig.fixedWidth) {
      const contentColumnWidths = columns.map((col) => `${col.columnWidth}px`);
      return showIndex ? [`${indexColumn.columnWidth}px`, ...contentColumnWidths] : contentColumnWidths;
    } else {
      const contentColumnWidths = columns.map((col) => `calc(${((col.columnWidth / totalWidth) * 100).toFixed(2)}%)`);
      return showIndex
        ? [`calc(${((indexColumn.columnWidth / totalWidth) * 100).toFixed(2)}%)`, ...contentColumnWidths]
        : contentColumnWidths;
    }
  }, [config.columnConfig]);

  return (
    <div className="w-full h-full overflow-hidden">
      {config.rowConfig.header.show && (
        <TableHeader headerTitles={headerTitles} config={config} columnWidths={columnWidths} />
      )}
      <TableBody data={rowsData} config={config} columnWidths={columnWidths} />
    </div>
  );
};

export default TableScrollBoradComponent;
