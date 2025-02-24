/* eslint-disable no-undef */
import type { IThemeSpec } from '@visactor/vrender';
import { createArc } from '@visactor/vrender';
import { isValid } from '../../../tools/util';
import { Group } from '../../graphic/group';
// import { parseFont } from '../../utils/font';
import { getFunctionalProp } from '../../utils/get-prop';
import { createCellContent } from '../../utils/text-icon-layout';
import type { BaseTableAPI } from '../../../ts-types/base-table';
import { getStyleTheme } from '../../../core/tableHelper';

/**
 * @description: 创建单元格场景节点
 * @param {Group} columnGroup 列Group
 * @param {number} xOrigin 起始x坐标
 * @param {number} yOrigin 起始y坐标
 * @param {number} col
 * @param {number} row
 * @param {BaseTableAPI} table
 * @param {number | 'auto'} colWidth 配置列宽
 * @param {number} padding 单元格padding
 * @param {CanvasTextAlign} textAlign
 * @param {CanvasTextBaseline} textBaseline
 * @param {boolean} noWrap 不进行折行（default column type）
 * @param {IThemeSpec} cellTheme 单元格主题
 * @return {Group}
 */
export function createCellGroup(
  table: BaseTableAPI,
  columnGroup: Group,
  xOrigin: number,
  yOrigin: number,
  col: number,
  row: number,
  // rowHeight: number,
  colWidth: number | 'auto',
  cellWidth: number,
  cellHeight: number,
  padding: number[],
  textAlign: CanvasTextAlign,
  textBaseline: CanvasTextBaseline,
  mayHaveIcon: boolean,
  customElementsGroup: Group,
  renderDefault: boolean,
  cellTheme: IThemeSpec
): Group {
  const headerStyle = table._getCellStyle(col, row); // to be fixed
  const functionalPadding = getFunctionalProp('padding', headerStyle, col, row, table);
  if (isValid(functionalPadding)) {
    padding = functionalPadding;
  }
  if (cellTheme?.text?.textAlign) {
    textAlign = cellTheme?.text?.textAlign;
  }
  if (cellTheme?.text?.textBaseline) {
    textBaseline = cellTheme?.text?.textBaseline;
  }
  const autoRowHeight = table.heightMode === 'autoHeight';
  const autoColWidth = colWidth === 'auto';
  const autoWrapText = headerStyle.autoWrapText ?? table.internalProps.autoWrapText;
  const lineClamp = headerStyle.lineClamp;

  // cell
  const cellGroup = new Group({
    x: xOrigin,
    y: yOrigin,
    width: cellWidth,
    height: cellHeight,
    // 背景相关，cell背景由cellGroup绘制
    lineWidth: cellTheme?.group?.lineWidth ?? undefined,
    fill: cellTheme?.group?.fill ?? undefined,
    stroke: cellTheme?.group?.stroke ?? undefined,
    strokeArrayWidth: (cellTheme?.group as any)?.strokeArrayWidth ?? undefined,
    strokeArrayColor: (cellTheme?.group as any)?.strokeArrayColor ?? undefined,
    cursor: (cellTheme?.group as any)?.cursor ?? undefined,

    lineCap: 'square',

    clip: true
  } as any);
  cellGroup.role = 'cell';
  cellGroup.col = col;
  cellGroup.row = row;
  columnGroup?.addChild(cellGroup);
  if (customElementsGroup) {
    cellGroup.appendChild(customElementsGroup);
  }
  if (renderDefault) {
    const textStr: string = table.getCellValue(col, row);
    let icons;
    if (mayHaveIcon) {
      icons = table.getCellIcons(col, row);
    }

    createCellContent(
      cellGroup,
      icons,
      textStr,
      padding as any,
      autoColWidth,
      autoRowHeight,
      autoWrapText,
      typeof lineClamp === 'number' ? lineClamp : undefined,
      // autoColWidth ? 0 : colWidth,
      // table.getRowHeight(row),
      cellWidth,
      cellHeight,
      textAlign,
      textBaseline,
      table,
      cellTheme
    );

    if ((cellTheme as any)?._vtable?.marked) {
      const mark = createArc({
        x: cellGroup.attribute.width,
        y: 0,
        startAngle: Math.PI / 2,
        endAngle: Math.PI,
        outerRadius: 6,
        fill: '#3073F2',
        pickable: false
      });
      mark.name = 'mark';

      cellGroup.appendChild(mark);
    }
  }
  if (customElementsGroup) {
    cellGroup.setAttributes({
      width: Math.max(cellGroup.attribute.width, customElementsGroup.attribute.width),
      height: Math.max(cellGroup.attribute.height, customElementsGroup.attribute.height)
    });
  }
  return cellGroup;
}

// /**
//  * @description: 获取函数式赋值的样式，记录在cellTheme中
//  * @param {BaseTableAPI} table
//  * @param {number} col
//  * @param {number} row
//  * @param {IThemeSpec} cellTheme
//  * @return {IThemeSpec | undefined}
//  */
// export function getCellTheme(
//   table: BaseTableAPI,
//   col: number,
//   row: number,
//   cellTheme?: IThemeSpec
// ): IThemeSpec | undefined {
//   // get column header style
//   const headerStyle = table._getCellStyle(col, row);

//   const theme = getStyleTheme(headerStyle, table, col, row, getFunctionalProp).theme;

//   for (const prop in theme.group) {
//     if (isValid(theme.group[prop])) {
//       if (!cellTheme) {
//         cellTheme = {};
//       }

//       if (!cellTheme.group) {
//         cellTheme.group = {};
//       }

//       cellTheme.group[prop] = theme.group[prop];
//     }
//   }

//   for (const prop in theme.text) {
//     if (isValid(theme.text[prop])) {
//       if (!cellTheme) {
//         cellTheme = {};
//       }

//       if (!cellTheme.text) {
//         cellTheme.text = {};
//       }

//       cellTheme.text[prop] = theme.text[prop];
//     }
//   }

//   for (const prop in theme._vtable) {
//     if (isValid(theme._vtable[prop])) {
//       if (!cellTheme) {
//         cellTheme = {};
//       }

//       if (!(cellTheme as any)._vtable) {
//         (cellTheme as any)._vtable = {};
//       }

//       (cellTheme as any)._vtable[prop] = theme._vtable[prop];
//     }
//   }
//   return cellTheme;
// }
