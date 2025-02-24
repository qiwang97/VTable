---
category: examples
group: Interaction
title: hover行列十字高亮
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/VTable/preview/hover-cross.png
order: 4-3
link: '../guide/interaction/hover_cell'
---

# hover行列十字高亮

鼠标hover到某个单元格，高亮该单元格所在整行及整列。

## 关键配置

- `hover` 配置高亮模式

## 代码演示

```javascript livedemo template=vtable

let  tableInstance;
  fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/VTable/North_American_Superstore_data.json')
    .then((res) => res.json())
    .then((data) => {

const columns =[
    {
        "field": "Order ID",
        "title": "Order ID",
        "width": "auto"
    },
    {
        "field": "Customer ID",
        "title": "Customer ID",
        "width": "auto"
    },
    {
        "field": "Product Name",
        "title": "Product Name",
        "width": "auto"
    },
    {
        "field": "Category",
        "title": "Category",
        "width": "auto"
    },
    {
        "field": "Sub-Category",
        "title": "Sub-Category",
        "width": "auto"
    },
    {
        "field": "Region",
        "title": "Region",
        "width": "auto"
    },
    {
        "field": "City",
        "title": "City",
        "width": "auto"
    },
    {
        "field": "Order Date",
        "title": "Order Date",
        "width": "auto"
    },
    {
        "field": "Quantity",
        "title": "Quantity",
        "width": "auto"
    },
    {
        "field": "Sales",
        "title": "Sales",
        "width": "auto"
    },
    {
        "field": "Profit",
        "title": "Profit",
        "width": "auto"
    }
];

const option = {
  records:data,
  columns,
  widthMode:'standard',
  hover:{
    highlightMode:'cross'
    // enableSingleHighlight: false,
  },
  theme:VTable.themes.ARCO.extends({
      defaultStyle:{
        hover:{
          cellBgColor: '#9cbef4',
          inlineRowBgColor: '#9cbef4',
          inlineColumnBgColor: '#9cbef4',
        },
      },
      bodyStyle:{
        hover:{
          cellBgColor: '#c3dafd',
          inlineRowBgColor: '#c3dafd',
          inlineColumnBgColor: '#c3dafd',
        },
      }
  })
};
tableInstance = new VTable.ListTable(document.getElementById(CONTAINER_ID),option);
window['tableInstance'] = tableInstance;
    })
```
