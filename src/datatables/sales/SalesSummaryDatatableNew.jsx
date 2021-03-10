import React, { useState } from "react";
import {
  CDataTable
} from "@coreui/react";

import { useDispatch } from "react-redux";

const SalesSummaryDatatableNew = (props) => {

  return (
    <CDataTable
      items={props.sales_summary}
      fields={[
        { key: "Date", label: "Date", filter: true },
        { key: "GrossSales", label: "Gross Sales", filter: true },
        { key: "Refunds", label: "Refunds", filter: true },
        { key: "discounts", label: "Discounts", filter: true },
        { key: "NetSales", label: "Net Sales", filter: true },
        { key: "CostOfGoods", label: "Cost of goods", filter: true },
        { key: "GrossProfit", label: "Gross profit", filter: true },
        { key: "Margin", label: "Margin", filter: true },
        { key: "Tax", label: "Taxes", filter: true },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      pagination
      scopedSlots={{
        Date: (item) => {
          return <td>{item.Date}</td>;
        },
        GrossSales: (item) => {
          return (
            <td>
              {item.GrossSales !== "undefined" && item.GrossSales !== null
                ? item.GrossSales.toLocaleString("en-US", {
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
              {typeof item.Refunds !== "undefined" && item.Refunds !== null
                ? item.Refunds.toLocaleString("en-US", {
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
              {typeof item.discounts !== "undefined" && item.discounts !== null
                ? item.discounts.toLocaleString("en-US", {
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
              {typeof item.NetSales !== "undefined" && item.NetSales !== null
                ? item.NetSales.toLocaleString("en-US", {
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
              {typeof item.CostOfGoods !== "undefined" &&
              item.CostOfGoods !== null
                ? item.CostOfGoods.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        GrossProfit: (item) => {
          return (
            <td>
              {typeof item.GrossProfit !== "undefined" &&
              item.GrossProfit !== null
                ? item.GrossProfit.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        Margin: (item) => {
          return (
            <td>
              {item.Margin !== "undefined" && item.Margin !== null
                ? item.Margin + " %"
                : "0.00 %"}
            </td>
          );
        },
        GrossProfit: (item) => {
          return (
            <td>
              {typeof item.GrossProfit !== "undefined" &&
              item.GrossProfit !== null
                ? item.GrossProfit.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        Tax: (item) => {
          return (
            <td>
              {typeof item.Tax !== "undefined" && item.Tax !== null
                ? item.Tax.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
      }}
    />
  );
};

export default SalesSummaryDatatableNew;
