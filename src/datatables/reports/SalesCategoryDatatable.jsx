import React, { useEffect, useState } from "react";
import { CDataTable } from "@coreui/react";
import Amount from "../../components/utils/Amount";

const SalesCategoryDatatable = (props) => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    if (props.columns.length > 0) {
      setFields(props.columns.filter((itm) => itm.isShow));
    }
  }, [props.columns]);

  return (
    <CDataTable
      itemsPerPageSelect
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
          return (
            <td style={{ borderRight: "1px solid #d8dbe0" }}>
              {item.category}
            </td>
          );
        },
        ItemsSold: (item) => {
          return (
            <td>
              {typeof item.ItemsSold !== "undefined" && item.ItemsSold !== null
                ? item.ItemsSold
                : "0"}
            </td>
          );
        },
        ItemsRefunded: (item) => {
          return (
            <td>
              {typeof item.ItemsRefunded !== "undefined" &&
              item.ItemsRefunded !== null
                ? item.ItemsRefunded
                : 0}
            </td>
          );
        },
        GrossSales: (item) => {
          return (
            <td>
              {typeof item.GrossSales !== "undefined" &&
              item.GrossSales !== null ? (
                <Amount value={item.GrossSales} />
              ) : (
                <Amount value={0} />
              )}
            </td>
          );
        },
        NetSales: (item) => {
          return (
            <td>
              {typeof item.NetSales !== "undefined" &&
              item.NetSales !== null ? (
                <Amount value={item.NetSales} />
              ) : (
                <Amount value={0} />
              )}
            </td>
          );
        },
        CostOfGoods: (item) => {
          return (
            <td>
              {typeof item.CostOfGoods !== "undefined" &&
              item.CostOfGoods !== null ? (
                <Amount value={item.CostOfGoods} />
              ) : (
                <Amount value={0} />
              )}
            </td>
          );
        },
        GrossProfit: (item) => {
          return (
            <td>
              {typeof item.GrossProfit !== "undefined" &&
              item.GrossProfit !== null ? (
                <Amount value={item.GrossProfit} />
              ) : (
                <Amount value={0} />
              )}
            </td>
          );
        },
        Margin: (item) => {
          return (
            <td>
              {item.Margin !== "undefined" && item.Margin !== null
                ? item.Margin+"%"
                : <Amount value={0} sign="%" />}
            </td>
          );
        },
        Refunds: (item) => {
          return (
            <td>
              {typeof item.Refunds !== "undefined" && item.Refunds !== null ? (
                <Amount value={item.Refunds} />
              ) : (
                <Amount value={0} />
              )}
            </td>
          );
        },
        discounts: (item) => {
          return (
            <td>
              {typeof item.discounts !== "undefined" &&
              item.discounts !== null ? (
                <Amount value={item.discounts} />
              ) : (
                <Amount value={0} />
              )}
            </td>
          );
        },
        Tax: (item) => {
          return (
            <td>
              {typeof item.Tax !== "undefined" && item.Tax !== null ? (
                <Amount value={item.Tax} />
              ) : (
                <Amount value={0} />
              )}
            </td>
          );
        },
      }}
    />
  );
};

export default SalesCategoryDatatable;
