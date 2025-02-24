{{ target: table-methods }}

# Methods

## updateOption(Function)

Update table configuration items, which will be automatically redrawn after being called.

```ts
  /**
   *Update options currently only support full updates
   * @param options
   */
  updateOption(options: BaseTableConstructorOptions) => void
```
If you need to update a single configuration item, please refer to the other `update**` interfaces below

## updateTheme(Function)

Update the table theme and it will be automatically redrawn after calling it.

```ts
  /**
   * Update theme
   * @param theme
   */
  updateTheme(theme: ITableThemeDefine) => void
```
use:
```
tableInstance.updateTheme(newTheme)
```
Corresponding attribute update interface（https://visactor.io/vtable/guide/basic_function/update_option）:
```
// will not automatically redraw after calling
tableInstance.theme = newTheme;
```
## updateColumns(Function)

Update the configuration information of the columns field of the table, and it will be automatically redrawn after calling

```ts
  /**
   * Update the columns field configuration information of the table
   * @param columns
   */
  updateColumns(columns: ColumnsDefine) => void
```
use:
```
tableInstance. updateColumns(newColumns)
```
Corresponding attribute update interface（https://visactor.io/vtable/guide/basic_function/update_option）:
```
// will not automatically redraw after calling
tableInstance.columns = newColumns;
```
## updatePagination(Function)

Update page number configuration information

```ts
  /**
   * Update page number
   * @param pagination The information of the page number to be modified
   */
  updatePagination(pagination: IPagination): void;
```
IPagination type define:
```
/**
 *Paging configuration
 */
export interface IPagination {
  /** The total number of data, this data in the pivot table will be automatically added without user input */
  totalCount?: number;
  /** Display number of data items per page */
  perPageCount: number;
  /** Display number of items per page */
  currentPage?: number;
}
```
The basic table and VTable data analysis pivot table (enableDataAnalysis=true) support paging, but the pivot combination chart does not support paging.

Note! The perPageCount in the pivot table will be automatically corrected to an integer multiple of the number of indicators.

## renderWithRecreateCells(Function)
Re-collect the cell objects and re-render the table. Use scenarios such as:

Refresh after batch updating multiple configuration items:
```
tableInstance.theme = newThemeObj;
tableInstance.widthMode = 'autoWidth';
tableInstance.heightMode = 'autoHeight;
tableInstance.autoWrapText = true;
tableInstance.renderWithRecreateCells();
```

## release(Function)

destroy form instance

## on(Function)

listen event

## off(Function)

unlisten event

## onVChartEvent(Function)

Listen to VChart chart events

## offVChartEvent(Function)

Unlisten to VChart chart events

## selectCell(Function)

Select a cell

```
  /**
   * The effect of selecting a cell is the same as that of a cell selected by the mouse.
   * @param col
   * @param row
   */
  selectCell(col: number, row: number): void
```

## selectCells(Function)

Select one or more cell ranges

```
  /**
   * Select a cell area, and you can set multiple areas to be selected at the same time
   * @param cellRanges: CellRange[]
   */
  selectCells(cellRanges: CellRange[]): void
```

## getCellStyle(Function)

Getting the style of a cell

```ts
 /**
   * :: Getting the style of a cell for business calls
   * @param col
   * @param row
   */
  getCellStyle(col: number, row: number) => CellStyle
```

## getAllCells(Function)

Get all cell context information

```
  /**
   * :: Obtain information on all cell data
   * @param colMaxCount Limit the number of columns to be fetched.
   * @param rowMaxCount Limit the number of rows to be fetched.
   * @returns CellInfo[][]
   */
  getAllCells(colMaxCount?: number, rowMaxCount?: number) => CellInfo[][];
```

## getAllBodyCells(Function)

Get all body cell context information

```
  /**
   * :: Get all body cell context information
   * @param colMaxCount Limit the number of columns to be fetched.
   * @param rowMaxCount Limit the number of rows to be fetched.
   * @returns CellInfo[][]
   */
  getAllBodyCells(colMaxCount?: number, rowMaxCount?: number) => CellInfo[][];
```

## getAllColumnHeaderCells(Function)

Get all list header cell context information

```
  /**
   * :: Obtain information on all list header cell data
   * @returns CellInfo[][]
   */
  getAllColumnHeaderCells(colMaxCount?: number, rowMaxCount?: number) => CellInfo[][];
```

## getAllRowHeaderCells(Function)

Get all row header cell context information

```
  /**
   * :: Obtain all row header cell context information
   * @returns CellInfo[][]
   */
  getAllRowHeaderCells(colMaxCount?: number, rowMaxCount?: number) => CellInfo[][];
```

## getCellOverflowText(Function)

Get the text of the cell with omitted text.

```
  /**
   * :: Obtaining the text content of cells with omitted text
   * :: cellTextOverflows stores values for which full text cannot be displayed, for use by toolTip
   * @param {number} col column index.
   * @param {number} row row index
   * @return {string | null}
   */
  getCellOverflowText(col: number, row: number) => string | null
```

## getCellHeaderPaths(Function)

Get the path to the row list header

```
  /**
   * :: Get the path to the header of the line list
   * @param col
   * @param row
   * @returns ICellHeaderPaths
   */
  getCellHeaderPaths(col: number, row: number) => ICellHeaderPaths
```

{{ use: ICellHeaderPaths() }}

## getCellAddress(Function)

Get the row and column number of a piece of data in the body based on the data and field attribute field names.

```
  /**
   The * method is used to get the row and column number of a piece of data in the body.
   * @param findTargetRecord Calculates the index of a data entry from a data object or a specified function.
   * @param field
   * @returns
   */
  getCellAddress(findTargetRecord: any | ((record: any) => boolean), field: FieldDef) => CellAddress
```

## getCellAddressByHeaderPaths(Function)

For pivot table interfaces, get specific cell addresses based on the header dimension path to be matched.

```
  /**
   * :: Calculation of cell positions through dimension value paths in table headers
   * @param dimensionPaths
   * @returns
   */
  getCellAddressByHeaderPaths(
    dimensionPaths.
      | {
          colHeaderPaths: IDimensionInfo[].
          rowHeaderPaths: IDimensionInfo[];
        }
      | IDimensionInfo[]
  ) => CellAddress
```

## scrollToCell(Function)

Scroll to a specific cell location

```
  /**
   * :: Scrolling to a specific cell location
   * @param cellAddr The cell position to scroll to.
   */
  scrollToCell(cellAddr: { col?: number; row?: number })=>void
```

## updateSortState(Function)

Update the sort status, ListTable exclusive

```
  /**
   * Update sort status
   * @param sortState the sorting state to be set
   * @param executeSort Whether to execute the internal sorting logic, setting false will only update the icon state
   */
  updateSortState(sortState: SortState[] | SortState | null, executeSort: boolean = true)
```

## updatePivotSortState(Function)

Update sort status, PivotTable exclusive

```
  /**
   * Update sort status
   * @param pivotSortStateConfig.dimensions sorting state dimension correspondence; pivotSortStateConfig.order sorting state
   */
  updateSortState(pivotSortStateConfig: {
      dimensions: IDimensionInfo[];
      order: SortOrder;
    }[])
```

## setDropDownMenuHighlight(Function)

Set the selected state of the drop-down menu

```
  setDropDownMenuHighlight(cells: DropDownMenuHighlightInfo[]): void
```

## showTooltip(Function)

Show tooltip information prompt box

```
  /**
   * Display tooltip information prompt box
   * @param col The column number of the cell where the prompt box is displayed
   * @param row The row number of the cell where the prompt box is displayed
   * @param tooltipOptions tooltip content configuration
   */
  showTooltip(col: number, row: number, tooltipOptions?: TooltipOptions) => void
```

Note: For the time being, it only supports setting tooltip.renderMode='html' globally, and calling this interface is valid

Where the TooltipOptions type is:

```
/** Display popup prompt content */
export type TooltipOptions = {
  /** tooltip content */
  content: string;
  /** The position of the tooltip box has priority over referencePosition */
  position?: { x: number; y: number };
  /** The reference position of the tooltip box If the position is set, the configuration will not take effect */
  referencePosition?: {
    /** The reference position is set to a rectangular boundary, and the placement is set to specify the orientation at the boundary position*/
    rect: RectProps;
    /** Specify the orientation at the boundary position */
    placement?: Placement;
  };
  /** Need custom style to specify className dom tooltip to take effect */
  className?: string;
  /** Set the tooltip style */
  style?: {
    bgColor?: string;
    font?: string;
    color?: string;
    padding?: number[];
    arrowMark?: boolean;
  };
};

```

## updateFilterRules(Function)

Update data filtering rules

```
/** Update data filtering rules */
updateFilterRules(filterRules: FilterRules) => void
```

use case: After clicking the legend item, update the filter rules to update the chart

## setLegendSelected(Function)

Sets the selection state of the legend.

Note: After setting, if you need to synchronize the state of the chart, you need to use the updateFilterRules interface

```
/** Set the selection state of the legend. After setting, the status of the synchronization chart needs to be used in conjunction with the updateFilterRules interface */
  setLegendSelected(selectedData: (string | number)[])
```

## getChartDatumPosition(Function)

Get the position of a certain primitive on the chart

```
/**
   * Get the position of a certain primitive on the chart
   * @param datum data corresponding to the primitive
   * @param cellHeaderPaths header path of the cell
   * @returns The coordinate position of the primitive on the entire table (relative to the visual coordinates of the upper left corner of the table)
   */
  getChartDatumPosition(datum:any,cellHeaderPaths:IPivotTableCellHeaderPaths):{x:number,y:number}
```

## exportImg(Function)

Export a picture of the currently visible area in the table.

```
  /**
   * Export pictures of the currently visible area in the table
   * @returns base64 picture
   */
  exportImg(): string
```

## exportCellImg(Function)

Export a cell picture

```
 /**
   * Export a cell picture
   * @returns base64 picture
   */
  exportCellImg(col: number, row: number): string
```

## exportCellRangeImg(Function)

Export a picture of a certain cell range

```
 /**
   * Export pictures of a certain area
   * @returns base64 picture
   */
  exportCellRangeImg(cellRange: CellRange): string
```