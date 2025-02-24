import type { Cursor, IThemeSpec } from '@visactor/vrender';
import type { ProgressBarStyle } from '../../body-helper/style/ProgressBarStyle';
import { regUrl } from '../../tools/global';
import type {
  CellRange,
  ChartColumnDefine,
  ColumnDefine,
  ColumnTypeOption,
  ICustomRender,
  ImageColumnDefine,
  MappingRule,
  ProgressbarColumnDefine,
  TextColumnDefine
} from '../../ts-types';
import { dealWithCustom } from '../component/custom';
import { Group } from '../graphic/group';
import { getProp } from '../utils/get-prop';
import { createChartCellGroup } from './cell-type/chart-cell';
import { createImageCellGroup } from './cell-type/image-cell';
import { createProgressBarCell } from './cell-type/progress-bar-cell';
import { createSparkLineCellGroup } from './cell-type/spark-line-cell';
import { createCellGroup } from './cell-type/text-cell';
import { createVideoCellGroup } from './cell-type/video-cell';
import type { ICustomLayoutFuc } from '../../ts-types/customLayout';
import type { BaseTableAPI, PivotTableProtected } from '../../ts-types/base-table';
import { getStyleTheme } from '../../core/tableHelper';
import { isPromise } from '../../tools/helper';
import { dealPromiseData } from '../utils/deal-promise-data';
import { CartesianAxis } from '../../components/axis/axis';
import type { PivotLayoutMap } from '../../layout/pivot-layout';

export function createCell(
  type: ColumnTypeOption,
  define: ColumnDefine,
  table: BaseTableAPI,
  col: number,
  row: number,
  colWidth: number,
  cellWidth: number,
  cellHeight: number,
  columnGroup: Group,
  y: number,
  padding: [number, number, number, number],
  textAlign: CanvasTextAlign,
  textBaseline: CanvasTextBaseline,
  mayHaveIcon: boolean,
  isMerge: boolean,
  range: CellRange,
  cellTheme: IThemeSpec
): Group {
  let bgColorFunc: Function;
  // 判断是否有mapping  遍历dataset中mappingRules
  if ((table.internalProps as PivotTableProtected)?.dataConfig?.mappingRules && !table.isHeader(col, row)) {
    (table.internalProps as PivotTableProtected)?.dataConfig?.mappingRules?.forEach(
      (mappingRule: MappingRule, i: number) => {
        if (
          mappingRule.bgColor &&
          (table.internalProps.layoutMap as PivotLayoutMap).getIndicatorKey(col, row) ===
            mappingRule.bgColor.indicatorKey
        ) {
          bgColorFunc = mappingRule.bgColor.mapping;
        }
      }
    );
  }
  let cellGroup: Group;
  if (type === 'text' || type === 'link') {
    if (type === 'link') {
      //如果是超链接 颜色按照linkColor绘制 TODO：放到方法_getCellStyle中
      // const columnDefine = table.getHeaderDefine(col, row);
      const cellValue = table.getCellValue(col, row);
      const headerStyle = table._getCellStyle(col, row);

      if (
        type === 'link' &&
        (('templateLink' in define && define.templateLink) ||
          !('linkDetect' in define && define.linkDetect) ||
          regUrl.test(cellValue))
      ) {
        if (cellTheme) {
          cellTheme.text.fill = getProp('linkColor', headerStyle, col, row, table);
          (cellTheme as any).group.cursor = 'pointer';
        } else {
          cellTheme = {
            text: {
              fill: getProp('linkColor', headerStyle, col, row, table)
            },
            group: {
              cursor: 'pointer' as Cursor
            }
          };
        }
      }
    }
    // 判断是否有mapping  遍历dataset中mappingRules 但这里还需要根据fieldName来判断
    if (bgColorFunc) {
      const cellValue = table.getCellOriginValue(col, row);
      const bgColor = bgColorFunc(table, cellValue);
      if (bgColor) {
        if (cellTheme) {
          cellTheme.group.fill = bgColor;
        } else {
          cellTheme = {
            group: {
              fill: bgColor
            }
          };
        }
      }
    }

    let customElementsGroup;
    let renderDefault = true;
    let customRender;
    let customLayout;
    const cellLocation = table.getCellLocation(col, row);
    if (cellLocation !== 'body') {
      customRender = define?.headerCustomRender;
      customLayout = define?.headerCustomLayout;
    } else {
      customRender = define?.customRender || table.customRender;
      customLayout = define?.customLayout;
    }

    if (customLayout || customRender) {
      // const { autoRowHeight } = table.internalProps;
      const customResult = dealWithCustom(
        customLayout,
        customRender,
        col,
        row,
        table.getColWidth(col),
        table.getRowHeight(row),
        false,
        table.heightMode === 'autoHeight',
        table
      );
      customElementsGroup = customResult.elementsGroup;
      renderDefault = customResult.renderDefault;
    }
    cellGroup = createCellGroup(
      table,
      columnGroup,
      0,
      y,
      col,
      row,
      colWidth,
      cellWidth,
      cellHeight,
      padding,
      textAlign,
      textBaseline,
      mayHaveIcon,
      customElementsGroup,
      renderDefault,
      cellTheme
    );
    if (isMerge) {
      cellGroup.mergeCol = range.end.col;
      cellGroup.mergeRow = range.end.row;
    }

    const axisConfig = table.internalProps.layoutMap.getAxisConfigInPivotChart(col, row);
    if (axisConfig) {
      const axis = new CartesianAxis(axisConfig, cellGroup.attribute.width, cellGroup.attribute.height, table);
      cellGroup.clear();
      cellGroup.appendChild(axis.component);
      axis.overlap();
    } else if (table.internalProps.layoutMap.isEmpty(col, row)) {
      cellGroup.clear();
    }

    // if ((define as any)?.isAxis && cellLocation === 'columnHeader') {
    //   cellGroup.setAttribute('clip', false);
    //   const axis = new CartesianAxis(
    //     {
    //       orient: 'top',
    //       type: 'band',
    //       data: ['A', 'B', 'C'],
    //       title: {
    //         visible: true,
    //         text: 'X Axis'
    //       }
    //     },
    //     cellGroup.attribute.width,
    //     cellGroup.attribute.height,
    //     table
    //   );
    //   cellGroup.clear();
    //   // axis.component.setAttribute('y', 40);
    //   cellGroup.appendChild(axis.component);
    // } else if ((define as any)?.isAxis && cellLocation === 'rowHeader') {
    //   cellGroup.setAttribute('clip', false);
    //   const axis = new CartesianAxis(
    //     {
    //       orient: 'left',
    //       type: 'linear',
    //       range: { min: 0, max: 30 },
    //       label: {
    //         flush: true
    //       },
    //       grid: {
    //         visible: true
    //       },
    //       title: {
    //         visible: true,
    //         text: 'Y Axis'
    //       }
    //     },
    //     cellGroup.attribute.width,
    //     cellGroup.attribute.height,
    //     table
    //   );
    //   cellGroup.clear();
    //   // axis.component.setAttribute('x', 80);
    //   cellGroup.appendChild(axis.component);
    //   axis.overlap();
    // }
  } else if (type === 'image') {
    // 创建图片单元格
    cellGroup = createImageCellGroup(
      columnGroup,
      0,
      y,
      col,
      row,
      table.getColWidth(col),
      table.getRowHeight(row),
      (define as ImageColumnDefine).keepAspectRatio,
      (define as ImageColumnDefine).imageAutoSizing,
      padding,
      textAlign,
      textBaseline,
      table,
      cellTheme
    );
  } else if (type === 'video') {
    // 创建视频单元格
    cellGroup = createVideoCellGroup(
      columnGroup,
      0,
      y,
      col,
      row,
      table.getColWidth(col),
      table.getRowHeight(row),
      (define as ImageColumnDefine).keepAspectRatio,
      (define as ImageColumnDefine).imageAutoSizing,
      padding,
      textAlign,
      textBaseline,
      table,
      cellTheme
    );
  } else if (type === 'chart') {
    const chartInstance = table.internalProps.layoutMap.getChartInstance(col, row);
    cellGroup = createChartCellGroup(
      null,
      columnGroup,
      0,
      y,
      col,
      row,
      table.getColWidth(col),
      table.getRowHeight(row),
      padding,
      table.getCellValue(col, row),
      (define as ChartColumnDefine).chartModule,
      table.isPivotChart()
        ? (table.internalProps.layoutMap as PivotLayoutMap).getChartSpec(col, row)
        : (define as ChartColumnDefine).chartSpec,
      chartInstance,
      (table.internalProps.layoutMap as PivotLayoutMap)?.getChartDataId(col, row) ?? 'data',
      table,
      cellTheme
    );
  } else if (type === 'progressbar') {
    const style = table._getCellStyle(col, row) as ProgressBarStyle;
    const value = table.getCellValue(col, row);
    const dataValue = table.getCellOriginValue(col, row);
    // 创建基础文字单元格
    cellGroup = createCellGroup(
      table,
      columnGroup,
      0,
      y,
      col,
      row,
      colWidth,
      cellWidth,
      cellHeight,
      padding,
      textAlign,
      textBaseline,
      false,
      null,
      true,
      cellTheme
    );

    // 创建bar group
    const progressBarGroup = createProgressBarCell(
      define as ProgressbarColumnDefine,
      style,
      colWidth,
      value,
      dataValue,
      col,
      row,
      padding,
      table
    );
    // 进度图插入到文字前，绘制在文字下
    if (cellGroup.firstChild) {
      cellGroup.insertBefore(progressBarGroup, cellGroup.firstChild);
    } else {
      cellGroup.appendChild(progressBarGroup);
    }
  } else if (type === 'sparkline') {
    cellGroup = createSparkLineCellGroup(
      null,
      columnGroup,
      0,
      y,
      col,
      row,
      cellWidth,
      cellHeight,
      padding,
      table,
      cellTheme
    );
  }

  return cellGroup;
}

export function updateCell(col: number, row: number, table: BaseTableAPI, addNew?: boolean) {
  // const oldCellGroup = table.scenegraph.getCell(col, row, true);
  const oldCellGroup = table.scenegraph.highPerformanceGetCell(col, row, true);

  if (!addNew && oldCellGroup.role === 'empty') {
    return undefined;
  }

  const type = table.isHeader(col, row)
    ? table._getHeaderLayoutMap(col, row).headerType
    : table.getBodyColumnType(col, row);
  const cellLocation = table.getCellLocation(col, row);
  const define = cellLocation !== 'body' ? table.getHeaderDefine(col, row) : table.getBodyColumnDefine(col, row);

  let isMerge;
  let range;
  if (cellLocation !== 'body' || (define as TextColumnDefine)?.mergeCell) {
    // 只有表头或者column配置合并单元格后再进行信息获取
    range = table.getCellRange(col, row);
    isMerge = range.start.col !== range.end.col || range.start.row !== range.end.row;
  }

  let newCellGroup;
  if (isMerge && (col !== range.start.col || row !== range.start.row)) {
    // 合并单元格的非起始单元格不需要绘制
    newCellGroup = new Group({
      x: 0,
      y: addNew ? 0 : oldCellGroup.attribute.y,
      width: 0,
      height: 0,
      visible: false,
      pickable: false
    });
    newCellGroup.role = 'shadow-cell';
    newCellGroup.col = col;
    newCellGroup.row = row;
    newCellGroup.mergeCol = range.start.col;
    newCellGroup.mergeRow = range.start.row;

    if (!addNew) {
      oldCellGroup.parent.insertAfter(newCellGroup, oldCellGroup);
      oldCellGroup.parent.removeChild(oldCellGroup);

      // update merge cell
      updateCell(range.start.col, range.start.row, table, false);
    }
  } else {
    const mayHaveIcon = cellLocation !== 'body' ? true : !!define?.icon || !!define?.tree;
    const headerStyle = table._getCellStyle(col, row);
    const cellTheme = getStyleTheme(headerStyle, table, col, row, getProp).theme;
    const padding = cellTheme._vtable.padding;
    const textAlign = cellTheme._vtable.textAlign;
    const textBaseline = cellTheme._vtable.textBaseline;

    let bgColorFunc: Function;
    // 判断是否有mapping  遍历dataset中mappingRules
    if ((table.internalProps as PivotTableProtected)?.dataConfig?.mappingRules && !table.isHeader(col, row)) {
      (table.internalProps as PivotTableProtected)?.dataConfig?.mappingRules?.forEach(
        (mappingRule: MappingRule, i: number) => {
          if (
            mappingRule.bgColor &&
            (table.internalProps.layoutMap as PivotLayoutMap).getIndicatorKey(col, row) ===
              mappingRule.bgColor.indicatorKey
          ) {
            bgColorFunc = mappingRule.bgColor.mapping;
          }
        }
      );
    }

    let customRender;
    let customLayout;
    if (cellLocation !== 'body') {
      customRender = define?.headerCustomRender;
      customLayout = define?.headerCustomLayout;
    } else {
      customRender = define?.customRender || table.customRender;
      customLayout = define?.customLayout;
    }

    let cellWidth;
    let cellHeight;
    if (range) {
      cellWidth = table.getColsWidth(range.start.col, range.end.col);
      cellHeight = table.getRowsHeight(range.start.row, range.end.row);
    } else {
      cellWidth = table.getColWidth(col);
      cellHeight = table.getRowHeight(row);
    }

    // deal with promise data
    const value = table.getCellValue(col, row);
    if (isPromise(value)) {
      // clear cell content sync
      oldCellGroup.removeAllChild();

      // update cell content async
      dealPromiseData(
        value,
        table,
        updateCellContent.bind(
          null,
          type,
          define,
          table,
          col,
          row,
          bgColorFunc,
          cellWidth,
          cellHeight,
          oldCellGroup,
          padding,
          textAlign,
          textBaseline,
          mayHaveIcon,
          isMerge,
          range,
          addNew,
          cellTheme
        )
      );
    } else {
      newCellGroup = updateCellContent(
        type,
        define,
        table,
        col,
        row,
        bgColorFunc,
        cellWidth,
        cellHeight,
        oldCellGroup,
        padding,
        textAlign,
        textBaseline,
        mayHaveIcon,
        isMerge,
        range,
        addNew,
        cellTheme
      );
    }
  }

  return newCellGroup;
}

function updateCellContent(
  type: ColumnTypeOption,
  define: ColumnDefine,
  table: BaseTableAPI,
  col: number,
  row: number,
  bgColorFunc: Function,
  cellWidth: number,
  cellHeight: number,
  oldCellGroup: Group,
  padding: [number, number, number, number],
  textAlign: CanvasTextAlign,
  textBaseline: CanvasTextBaseline,
  mayHaveIcon: boolean,
  isMerge: boolean,
  range: CellRange,
  addNew: boolean,
  cellTheme?: IThemeSpec
) {
  const newCellGroup = createCell(
    type,
    define,
    table,
    col,
    row,
    table.getColWidth(col),
    cellWidth,
    cellHeight,
    // oldCellGroup.parent,
    addNew ? table.scenegraph.getColGroup(col) : oldCellGroup.parent,
    // oldCellGroup.attribute.y,
    addNew ? 0 : oldCellGroup.attribute.y,
    padding,
    textAlign,
    textBaseline,
    mayHaveIcon,
    isMerge,
    range,
    cellTheme
  );
  if (!addNew) {
    oldCellGroup.parent.insertAfter(newCellGroup, oldCellGroup);
    oldCellGroup.parent.removeChild(oldCellGroup);

    // update cache
    if (table.scenegraph?.proxy.cellCache.get(col)) {
      table.scenegraph?.proxy.cellCache.set(col, newCellGroup);
    }
  }
  return newCellGroup;
}
