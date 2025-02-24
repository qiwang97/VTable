---
category: examples
group: Interaction
title: Select cell
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/VTable/preview/select.png
order: 4-1
link: '../guide/interaction/select'
---

# Select cell

Select the cell, press and hold ctrl or shift multiple selection, or open shortcut for ctrlA all selection.

## critical configuration

*   `keyboardOptions: {
        selectAllOnCtrlA: true,
        copySelected: true
    }`
    Enable the ctrl + A optional function and shortcut to copy the selected content.

## Code demo

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
  keyboardOptions: {
      selectAllOnCtrlA: true,
      copySelected: true
  },
  theme:VTable.themes.ARCO.extends({
      selectionStyle:{
        cellBorderLineWidth: 2,
        cellBorderColor: '#9900ff',
        cellBgColor: 'rgba(153,0,255,0.2)',
      }
  })
};
tableInstance = new VTable.ListTable(document.getElementById(CONTAINER_ID), option);
window['tableInstance'] = tableInstance;
    })
```
