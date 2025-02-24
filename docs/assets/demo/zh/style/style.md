---
category: examples
group: Style
title: 样式
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/VTable/preview/style.png
order: 5-1
link: '../guide/theme_and_style/style'
---

# 样式

在这个例子中，通过配置headerStyle和style分别配置了表头和body的样式。透视表列维度Category相同的全部置为相同背景色，指标中的Quantity，Sales和Profit分别设置不同的字体颜色。

## 关键配置

-`headerStyle` 配置某个维度的表头样式

-`style` 配置某个维度或者指标body部分的样式

## 代码演示

```javascript livedemo template=vtable

let  tableInstance;
  fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/VTable/North_American_Superstore_Pivot_data.json')
    .then((res) => res.json())
    .then((data) => {

const option = {
        records: data,
        "rowTree": [{
            "dimensionKey": "City",
            "value": "Aberdeen"
          },
          {
            "dimensionKey": "City",
            "value": "Abilene"
          },
          {
            "dimensionKey": "City",
            "value": "Akron"
          },
          {
            "dimensionKey": "City",
            "value": "Albuquerque"
          },
          {
            "dimensionKey": "City",
            "value": "Alexandria"
          },
          {
            "dimensionKey": "City",
            "value": "Allen"
          },
          {
            "dimensionKey": "City",
            "value": "Allentown"
          },
          {
            "dimensionKey": "City",
            "value": "Altoona"
          },
          {
            "dimensionKey": "City",
            "value": "Amarillo"
          },
          {
            "dimensionKey": "City",
            "value": "Anaheim"
          },
          {
            "dimensionKey": "City",
            "value": "Andover"
          },
          {
            "dimensionKey": "City",
            "value": "Ann Arbor"
          },
          {
            "dimensionKey": "City",
            "value": "Antioch"
          },
          {
            "dimensionKey": "City",
            "value": "Apopka"
          },
          {
            "dimensionKey": "City",
            "value": "Apple Valley"
          },
          {
            "dimensionKey": "City",
            "value": "Appleton"
          },
          {
            "dimensionKey": "City",
            "value": "Arlington"
          },
          {
            "dimensionKey": "City",
            "value": "Arlington Heights"
          },
          {
            "dimensionKey": "City",
            "value": "Arvada"
          },
          {
            "dimensionKey": "City",
            "value": "Asheville"
          },
          {
            "dimensionKey": "City",
            "value": "Athens"
          },
          {
            "dimensionKey": "City",
            "value": "Atlanta"
          },
          {
            "dimensionKey": "City",
            "value": "Atlantic City"
          },
          {
            "dimensionKey": "City",
            "value": "Auburn"
          },
          {
            "dimensionKey": "City",
            "value": "Aurora"
          },
          {
            "dimensionKey": "City",
            "value": "Austin"
          },
          {
            "dimensionKey": "City",
            "value": "Avondale"
          },
          {
            "dimensionKey": "City",
            "value": "Bakersfield"
          },
          {
            "dimensionKey": "City",
            "value": "Baltimore"
          },
          {
            "dimensionKey": "City",
            "value": "Bangor"
          },
          {
            "dimensionKey": "City",
            "value": "Bartlett"
          },
          {
            "dimensionKey": "City",
            "value": "Bayonne"
          },
          {
            "dimensionKey": "City",
            "value": "Baytown"
          },
          {
            "dimensionKey": "City",
            "value": "Beaumont"
          },
          {
            "dimensionKey": "City",
            "value": "Bedford"
          },
          {
            "dimensionKey": "City",
            "value": "Belleville"
          },
          {
            "dimensionKey": "City",
            "value": "Bellevue"
          },
          {
            "dimensionKey": "City",
            "value": "Bellingham"
          },
          {
            "dimensionKey": "City",
            "value": "Bethlehem"
          },
          {
            "dimensionKey": "City",
            "value": "Beverly"
          },
          {
            "dimensionKey": "City",
            "value": "Billings"
          },
          {
            "dimensionKey": "City",
            "value": "Bloomington"
          },
          {
            "dimensionKey": "City",
            "value": "Boca Raton"
          },
          {
            "dimensionKey": "City",
            "value": "Boise"
          },
          {
            "dimensionKey": "City",
            "value": "Bolingbrook"
          },
          {
            "dimensionKey": "City",
            "value": "Bossier City"
          },
          {
            "dimensionKey": "City",
            "value": "Bowling Green"
          },
          {
            "dimensionKey": "City",
            "value": "Boynton Beach"
          },
          {
            "dimensionKey": "City",
            "value": "Bozeman"
          },
          {
            "dimensionKey": "City",
            "value": "Brentwood"
          }
        ],
        "columnTree": [{
            "dimensionKey": "Category",
            "value": "Office Supplies",
            "children": [{
                "indicatorKey": "Quantity"
              },
              {
                "indicatorKey": "Sales"
              },
              {
                "indicatorKey": "Profit"
              }
            ]
          },
          {
            "dimensionKey": "Category",
            "value": "Technology",
            "children": [{
                "indicatorKey": "Quantity"
              },
              {
                "indicatorKey": "Sales"
              },
              {
                "indicatorKey": "Profit"
              }
            ]
          },
          {
            "dimensionKey": "Category",
            "value": "Furniture",
            "children": [{
                "indicatorKey": "Quantity"
              },
              {
                "indicatorKey": "Sales"
              },
              {
                "indicatorKey": "Profit"
              }
            ]
          }
        ],
        "rows": [{
          "dimensionKey": "City",
          "title": "City",
          "headerStyle": {
            "textStick": true,
            "bgColor": "#356b9c",
            "color": "#00ffff"
          },
          "width": "auto",
        }, ],
        "columns": [{
          "dimensionKey": "Category",
          "title": "Category",
          "headerStyle": {
            "textStick": true,
            "bgColor":(arg) => {
              const cellHeaderPaths = arg.table.getCellHeaderPaths(
                arg.col,
                arg.row,
              );
              if (cellHeaderPaths.colHeaderPaths[0].value === 'Office Supplies'
              )
                {return '#bd422a';}
              if (cellHeaderPaths.colHeaderPaths[0].value === 'Technology'
              )
                {return '#ff9900';}
              return 'gray';
            }
          },
          "width": "auto",
        },
      {
          "dimensionKey": "Category",
          "title": "Category",
          "headerStyle": {
            "textStick": true,
            "bgColor":(arg) => {
              const cellHeaderPaths = arg.table.getCellHeaderPaths(
                arg.col,
                arg.row,
              );
              if (cellHeaderPaths.colHeaderPaths[0].value === 'Office Supplies')
                {return '#bd422a';}
              if (cellHeaderPaths.colHeaderPaths[0].value === 'Technology'
              )
                {return '#ff9900';}
              return 'gray';
            }
          },
          "width": "auto",
        }, ],
        "indicators": [{
            "indicatorKey": "Quantity",
            "title": "Quantity",
            "width": "auto",
            "showSort": false,
            "style":{
              padding:[16,28,16,28],
              color(args){
                if(args.dataValue>=0)
                  return 'black';
                return 'red'
              },
              "fontWeight": 'bold',
              "bgColor":(arg) => {
                const cellHeaderPaths = arg.table.getCellHeaderPaths(
                  arg.col,
                  arg.row,
                );
                if (
                    cellHeaderPaths.colHeaderPaths[0].value === 'Office Supplies'
                )
                  {return '#bd422a';}
                if (cellHeaderPaths.colHeaderPaths[0].value === 'Technology'
                )
                  {return '#ff9900';}
                return 'gray';
              }
            },
            "headerStyle": {
              "color": 'black',
              fontWeight: "normal",
              "textStick": true,
              "fontWeight": 'bold',
              "bgColor":(arg) => {
                const cellHeaderPaths = arg.table.getCellHeaderPaths(
                  arg.col,
                  arg.row,
                );
                if (cellHeaderPaths.colHeaderPaths[0].value === 'Office Supplies')
                  {return '#bd422a';}
                if (cellHeaderPaths.colHeaderPaths[0].value === 'Technology')
                  {return '#ff9900';}
                return 'gray';
              }
            },
            "format":(rec)=>{return '$'+Number(rec['Quantity']).toFixed(2)},
          },
          {
            "indicatorKey": "Sales",
            "title": "Sales",
            "width": "auto",
            "showSort": false,
            "style":{
              padding:[16,28,16,28],
              color(args){
                if(args.dataValue>=0)
                  return 'black';
                return 'blue'
              },
              fontWeight: "normal",
              "bgColor":(arg) => {
                const cellHeaderPaths = arg.table.getCellHeaderPaths(
                  arg.col,
                  arg.row,
                );
                if (cellHeaderPaths.colHeaderPaths[0].value === 'Office Supplies')
                  {return '#bd422a';}
                if (cellHeaderPaths.colHeaderPaths[0].value === 'Technology')
                  {return '#ff9900';}
                return 'gray';
              }
            },
            "headerStyle": {
              "textStick": true,
              "color": 'blue',
              "bgColor":(arg) => {
                const cellHeaderPaths = arg.table.getCellHeaderPaths(
                  arg.col,
                  arg.row,
                );
                if (cellHeaderPaths.colHeaderPaths[0].value === 'Office Supplies')
                  {return '#bd422a';}
                if (cellHeaderPaths.colHeaderPaths[0].value === 'Technology')
                  {return '#ff9900';}
                return 'gray';
              }
            },
             "format":(rec)=>{
               if(rec)
                      return '$'+Number(rec['Sales']).toFixed(2);
                      else return '--';
             },
          },
          {
            "indicatorKey": "Profit",
            "title": "Profit",
            "width": "auto",
            "showSort": false,
            "style":{
              padding:[16,28,16,28],
              color(args){
                if(args.dataValue>=0)
                  return 'black';
                return 'white'
              },
              fontWeight: "normal",
              "bgColor":(arg) => {
                const cellHeaderPaths = arg.table.getCellHeaderPaths(
                  arg.col,
                  arg.row,
                );
                if(arg.dataValue<0)
                  return 'purple';
                if (cellHeaderPaths.colHeaderPaths[0].value === 'Office Supplies')
                  {return '#bd422a';}
                if (cellHeaderPaths.colHeaderPaths[0].value === 'Technology')
                  {return '#ff9900';}
                return 'gray';
              }
            },
            "headerStyle": {
              "color": 'white',
              "textStick": true,
              "bgColor":(arg) => {
                const cellHeaderPaths = arg.table.getCellHeaderPaths(
                  arg.col,
                  arg.row,
                );
                if (cellHeaderPaths.colHeaderPaths[0].value === 'Office Supplies')
                  {return '#bd422a';}
                if (cellHeaderPaths.colHeaderPaths[0].value === 'Technology')
                  {return '#ff9900';}
                return 'gray';
              }
            },
             "format":(rec)=>{return '$'+Number(rec['Profit']).toFixed(2)},
          }
        ],
        "corner": {
          "titleOnDimension": "row",
          "headerStyle": {
            "textStick": true,
            "bgColor": "#356b9c",
            "color": "#00ffff"
          }
        },
        widthMode: 'standard'
      };
tableInstance = new VTable.PivotTable(document.getElementById(CONTAINER_ID),option);
window['tableInstance'] = tableInstance;
    })
```

