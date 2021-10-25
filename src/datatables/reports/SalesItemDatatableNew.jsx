import React, { useEffect, useState } from "react";
import {
  CDataTable
} from "@coreui/react";


const SalesItemDatatableNew = (props) => {

  const [fields, setFields] = useState([]);

  useEffect(() => {
    if(props.columns.length > 0){
      setFields(props.columns.filter(itm => itm.isShow))
    }
  },[props.columns])
  

  return (
    <CDataTable
      items={props.item_sale_summary}
      fields={fields}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      outlined
      pagination
      
      // border={true}
      outlined={true}
      responsive={true}
      // clickableRows
      // onRowClick={clickRow}
      scopedSlots={{
        name: (item) => {
          return <td style={{ borderRight: "1px solid #d8dbe0" }}>{item.name}</td>
        },
        GrossProfit: (item) => {
          return (
            <td>
              {item.GrossProfit !== "undefined" &&
              item.GrossProfit !== null
                ? item.GrossProfit.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        CostOfGoods: (item) => {
          return (
            <td>
              {item.CostOfGoods !== "undefined" &&
              item.CostOfGoods !== null
                ? item.CostOfGoods.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        NetSales: (item) => {
          return (
            <td>
              {item.NetSales !== "undefined" &&
              item.NetSales !== null
                ? item.NetSales.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        discounts: (item) => {
          return (
            <td>
              {item.discounts !== "undefined" &&
              item.discounts !== null
                ? item.discounts.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        Refunds: (item) => {
          return (
            <td>
              {item.Refunds !== "undefined" &&
              item.Refunds !== null
                ? item.Refunds.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        GrossSales: (item) => {
          return (
            <td>
              {item.GrossSales !== "undefined" &&
              item.GrossSales !== null
                ? item.GrossSales.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        Margin: (item) => {
            return <td>{item.Margin + " %"} </td>;
        }
      }}
    />
  );
};

export default SalesItemDatatableNew;
