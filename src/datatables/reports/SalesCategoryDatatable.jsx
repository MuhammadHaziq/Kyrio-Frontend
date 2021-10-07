import React, { useEffect, useState } from "react";
import {
  CDataTable,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";

const SalesCategoryDatatable = (props) => {
  
  const [fields, setFields] = useState([]);

  useEffect(() => {
    if(props.columns.length > 0){
      setFields(props.columns.filter(itm => itm.isShow))
    }
  },[props.columns])
  
  return (
    <CDataTable
      items={props.category_sales_summary}
      fields={fields}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      outlined
      pagination
      // clickableRows
      // onRowClick={clickRow}
      scopedSlots={{
        category: (item) => {
          return <td style={{ borderRight: "1px solid #d8dbe0" }}>{item.category}</td>
        },
        ItemsSold: (item) => {
          return (
            <td>
              {typeof item.ItemsSold !== "undefined" &&
                item.ItemsSold !== null ? item.ItemsSold : "0"}
            </td>
          );
        },
        ItemsRefunded: (item) => {
          return (
            <td>
              {typeof item.ItemsRefunded !== "undefined" &&
                item.ItemsRefunded !== null ? new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(Number(item.ItemsRefunded))// '$100.00'
                : new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(0)}
            </td>
          );
        },
        GrossSales: (item) => {
          return (
            <td>
              {typeof item.GrossSales !== "undefined" &&
                item.GrossSales !== null ? new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(Number(item.GrossSales))// '$100.00'
                : new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(0)}
            </td>
          );
        },
        NetSales: (item) => {
          return (
            <td>
              {typeof item.NetSales !== "undefined" &&
                item.NetSales !== null ? new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(Number(item.NetSales))// '$100.00'
                : new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(0)}
            </td>
          );
        },
        CostOfGoods: (item) => {
          return (
            <td>
              {typeof item.CostOfGoods !== "undefined" &&
                item.CostOfGoods !== null ? new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(Number(item.CostOfGoods))// '$100.00'
                : new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(0)}
            </td>
          );
        },
        GrossProfit: (item) => {
          return (
            <td>
              {typeof item.GrossProfit !== "undefined" &&
                item.GrossProfit !== null ? new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(Number(item.GrossProfit))// '$100.00'
                : new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(0)}
            </td>
          );
        },
        Margin: (item) => {
          return (
            <td>
              {item.Margin +"%"}
            </td>
          )
        },
        Refunds: (item) => {
          return (
            <td>
              {typeof item.Refunds !== "undefined" &&
                item.Refunds !== null ? new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(Number(item.Refunds))// '$100.00'
                : new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(0)}
            </td>
          );
        },
        discounts: (item) => {
          return (
            <td>
              {typeof item.discounts !== "undefined" &&
                item.discounts !== null ? new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(Number(item.discounts))// '$100.00'
                : new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(0)}
            </td>
          );
        },
      }}
    />
  );
};

export default SalesCategoryDatatable;
