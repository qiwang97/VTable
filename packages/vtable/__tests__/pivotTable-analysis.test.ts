// @ts-nocheck
// 有问题可对照demo unitTestPivotTable
import records from './data/marketsales.json';
import { PivotTable } from '../src/PivotTable';
import * as VTable from '../src/index';
import { createDiv } from './dom';
global.__VERSION__ = 'none';
function getColor(min: number, max: number, n: any) {
  if (max === min) {
    if (n > 0) {
      return 'rgb(255,0,0)';
    }
    return 'rgb(255,255,255)';
  }
  if (n === '') {
    return 'rgb(255,255,255)';
  }
  const c = Math.max(0.1, (n - min) / (max - min));
  const red = 255;
  const green = (1 - c) * 255;
  return `rgb(${red},${green},${green})`;
}

function getColor2(min: number, max: number, n: any) {
  if (max === min) {
    if (n > 0) {
      return 'rgb(0,255,0)';
    }
    return 'rgb(255,255,255)';
  }
  if (n === '') {
    return 'rgb(255,255,255)';
  }
  const c = Math.max(0.1, (n - min) / (max - min));
  const green = 255;
  const red = (1 - c) * 255;
  return `rgb(${red},${green},${green})`;
}
describe('pivotTable-analysis init test', () => {
  const containerDom: HTMLElement = createDiv();
  containerDom.style.position = 'relative';
  containerDom.style.width = '500px';
  containerDom.style.height = '500px';

  const rowTree = [
    {
      dimensionKey: '地区',
      value: '东北',
      children: [
        {
          dimensionKey: '省/自治区',
          value: '吉林'
        },
        {
          dimensionKey: '省/自治区',
          value: '辽宁'
        },
        {
          dimensionKey: '省/自治区',
          value: '黑龙江'
        }
      ]
    },
    {
      dimensionKey: '地区',
      value: '中南',
      children: [
        {
          dimensionKey: '省/自治区',
          value: '广东'
        },
        {
          dimensionKey: '省/自治区',
          value: '广西'
        },
        {
          dimensionKey: '省/自治区',
          value: '河南'
        },
        {
          dimensionKey: '省/自治区',
          value: '海南'
        },
        {
          dimensionKey: '省/自治区',
          value: '湖北'
        },
        {
          dimensionKey: '省/自治区',
          value: '湖南'
        }
      ]
    },
    {
      dimensionKey: '地区',
      value: '华东',
      children: [
        {
          dimensionKey: '省/自治区',
          value: '上海'
        },
        {
          dimensionKey: '省/自治区',
          value: '安徽'
        },
        {
          dimensionKey: '省/自治区',
          value: '山东'
        },
        {
          dimensionKey: '省/自治区',
          value: '江苏'
        },
        {
          dimensionKey: '省/自治区',
          value: '江西'
        },
        {
          dimensionKey: '省/自治区',
          value: '浙江'
        },
        {
          dimensionKey: '省/自治区',
          value: '福建'
        }
      ]
    },
    {
      dimensionKey: '地区',
      value: '华北',
      children: [
        {
          dimensionKey: '省/自治区',
          value: '内蒙古'
        },
        {
          dimensionKey: '省/自治区',
          value: '北京'
        },
        {
          dimensionKey: '省/自治区',
          value: '天津'
        },
        {
          dimensionKey: '省/自治区',
          value: '山西'
        },
        {
          dimensionKey: '省/自治区',
          value: '河北'
        }
      ]
    },
    {
      dimensionKey: '地区',
      value: '西北',
      children: [
        {
          dimensionKey: '省/自治区',
          value: '宁夏'
        },
        {
          dimensionKey: '省/自治区',
          value: '新疆'
        },
        {
          dimensionKey: '省/自治区',
          value: '甘肃'
        },
        {
          dimensionKey: '省/自治区',
          value: '陕西'
        },
        {
          dimensionKey: '省/自治区',
          value: '青海'
        }
      ]
    },
    {
      dimensionKey: '地区',
      value: '西南',
      children: [
        {
          dimensionKey: '省/自治区',
          value: '云南'
        },
        {
          dimensionKey: '省/自治区',
          value: '四川'
        },
        {
          dimensionKey: '省/自治区',
          value: '海南'
        },
        {
          dimensionKey: '省/自治区',
          value: '西藏自治区'
        },
        {
          dimensionKey: '省/自治区',
          value: '贵州'
        },
        {
          dimensionKey: '省/自治区',
          value: '重庆'
        }
      ]
    }
  ];
  const option: VTable.PivotTableConstructorOptions = {
    rows: ['province', 'city'],
    columns: ['category', 'sub_category'],
    indicators: ['sales', 'number'],
    enableDataAnalysis: true,
    indicatorTitle: '指标名称',
    indicatorsAsCol: false,
    corner: { titleOnDimension: 'row' },
    records: [
      {
        sales: 891,
        number: 7789,
        province: '浙江省',
        city: '杭州市',
        category: '家具',
        sub_category: '桌子'
      },
      {
        sales: 792,
        number: 2367,
        province: '浙江省',
        city: '绍兴市',
        category: '家具',
        sub_category: '桌子'
      },
      {
        sales: 893,
        number: 3877,
        province: '浙江省',
        city: '宁波市',
        category: '家具',
        sub_category: '桌子'
      },
      {
        sales: 1094,
        number: 4342,
        province: '浙江省',
        city: '舟山市',
        category: '家具',
        sub_category: '桌子'
      },
      {
        sales: 1295,
        number: 5343,
        province: '浙江省',
        city: '杭州市',
        category: '家具',
        sub_category: '沙发'
      },
      {
        sales: 496,
        number: 632,
        province: '浙江省',
        city: '绍兴市',
        category: '家具',
        sub_category: '沙发'
      },
      {
        sales: 1097,
        number: 7234,
        province: '浙江省',
        city: '宁波市',
        category: '家具',
        sub_category: '沙发'
      },
      {
        sales: 998,
        number: 834,
        province: '浙江省',
        city: '舟山市',
        category: '家具',
        sub_category: '沙发'
      },
      {
        sales: 766,
        number: 945,
        province: '浙江省',
        city: '杭州市',
        category: '办公用品',
        sub_category: '笔'
      },
      {
        sales: 990,
        number: 1304,
        province: '浙江省',
        city: '绍兴市',
        category: '办公用品',
        sub_category: '笔'
      },
      {
        sales: 891,
        number: 1145,
        province: '浙江省',
        city: '宁波市',
        category: '办公用品',
        sub_category: '笔'
      },
      {
        sales: 792,
        number: 1432,
        province: '浙江省',
        city: '舟山市',
        category: '办公用品',
        sub_category: '笔'
      },
      {
        sales: 745,
        number: 1343,
        province: '浙江省',
        city: '杭州市',
        category: '办公用品',
        sub_category: '纸张'
      },
      {
        sales: 843,
        number: 1354,
        province: '浙江省',
        city: '绍兴市',
        category: '办公用品',
        sub_category: '纸张'
      },
      {
        sales: 895,
        number: 1523,
        province: '浙江省',
        city: '宁波市',
        category: '办公用品',
        sub_category: '纸张'
      },
      {
        sales: 965,
        number: 1634,
        province: '浙江省',
        city: '舟山市',
        category: '办公用品',
        sub_category: '纸张'
      },
      {
        sales: 776,
        number: 1723,
        province: '四川省',
        city: '成都市',
        category: '家具',
        sub_category: '桌子'
      },
      {
        sales: 634,
        number: 1822,
        province: '四川省',
        city: '绵阳市',
        category: '家具',
        sub_category: '桌子'
      },
      {
        sales: 909,
        number: 1943,
        province: '四川省',
        city: '南充市',
        category: '家具',
        sub_category: '桌子'
      },
      {
        sales: 399,
        number: 2330,
        province: '四川省',
        city: '乐山市',
        category: '家具',
        sub_category: '桌子'
      },
      {
        sales: 700,
        number: 2451,
        province: '四川省',
        city: '成都市',
        category: '家具',
        sub_category: '沙发'
      },
      {
        sales: 689,
        number: 2244,
        province: '四川省',
        city: '绵阳市',
        category: '家具',
        sub_category: '沙发'
      },
      {
        sales: 500,
        number: 2333,
        province: '四川省',
        city: '南充市',
        category: '家具',
        sub_category: '沙发'
      },
      {
        sales: 800,
        number: 2445,
        province: '四川省',
        city: '乐山市',
        category: '家具',
        sub_category: '沙发'
      },
      {
        sales: 1044,
        number: 2335,
        province: '四川省',
        city: '成都市',
        category: '办公用品',
        sub_category: '笔'
      },
      {
        sales: 689,
        number: 245,
        province: '四川省',
        city: '绵阳市',
        category: '办公用品',
        sub_category: '笔'
      },
      {
        sales: 794,
        number: 2457,
        province: '四川省',
        city: '南充市',
        category: '办公用品',
        sub_category: '笔'
      },
      {
        sales: 566,
        number: 2458,
        province: '四川省',
        city: '乐山市',
        category: '办公用品',
        sub_category: '笔'
      },
      {
        sales: 865,
        number: 4004,
        province: '四川省',
        city: '成都市',
        category: '办公用品',
        sub_category: '纸张'
      },
      {
        sales: 999,
        number: 3077,
        province: '四川省',
        city: '绵阳市',
        category: '办公用品',
        sub_category: '纸张'
      },
      {
        sales: 999,
        number: 3551,
        province: '四川省',
        city: '南充市',
        category: '办公用品',
        sub_category: '纸张'
      },
      {
        sales: 999,
        number: 352,
        province: '四川省',
        city: '乐山市',
        category: '办公用品',
        sub_category: '纸张'
      }
    ],
    dataConfig: {
      filterRules: [
        {
          filterFunc: (record: Record<string, any>) => {
            return record.province !== '四川省' || record.category !== '家具';
          }
        }
      ],
      sortRules: [
        {
          sortField: 'city',
          sortByIndicator: 'sales',
          sortType: VTable.TYPES.SortType.DESC,
          query: ['办公用品', '笔']
        } as VTable.TYPES.SortByIndicatorRule
      ],
      mappingRules: [
        {
          bgColor: {
            indicatorKey: 'sales',
            mapping(table, value) {
              const max: number =
                table.dataset.indicatorStatistics[table.dataset.indicatorKeys.indexOf('sales')].max.value();
              const min: number =
                table.dataset.indicatorStatistics[table.dataset.indicatorKeys.indexOf('sales')].min.value();
              return getColor(min, max, value);
            }
          }
        },
        {
          bgColor: {
            indicatorKey: 'number',
            mapping(table, value) {
              const max: number =
                table.dataset.indicatorStatistics[table.dataset.indicatorKeys.indexOf('number')].max.value();
              const min: number =
                table.dataset.indicatorStatistics[table.dataset.indicatorKeys.indexOf('number')].min.value();
              return getColor2(min, max, value);
            }
          }
        }
      ],
      totals: {
        row: {
          showGrandTotals: true,
          showSubTotals: true,
          subTotalsDimensions: ['province'],
          grandTotalLabel: '行总计',
          subTotalLabel: '小计'
        },
        column: {
          showGrandTotals: true,
          showSubTotals: true,
          subTotalsDimensions: ['category'],
          grandTotalLabel: '列总计',
          subTotalLabel: '小计'
        }
      }
    },
    widthMode: 'autoWidth' // 宽度模式：standard 标准模式； adaptive 自动填满容器
  };
  const pivotTable = new PivotTable(containerDom, option);

  test('pivotTable-analysis init', () => {
    expect(pivotTable.rowCount).toBe(24);
  });
  test('pivotTable-analysis cellValue', () => {
    expect(pivotTable.getCellValue(4, 4)).toBe(999);
  });
  pivotTable.release();
});
