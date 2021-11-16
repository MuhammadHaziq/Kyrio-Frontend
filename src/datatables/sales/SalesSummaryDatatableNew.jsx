import React from "react";
import {
  CDataTable
} from "@coreui/react";
import Amount from "../../components/utils/Amount";

const SalesSummaryDatatableNew = (props) => {

  return (
    <CDataTable
   itemsPerPageSelect
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
      outlined
      pagination
      scopedSlots={{
        Date: (item) => {
          return <td>{item.Date}</td>;
        },
        GrossSales: (item) => {
          return (
            <td>
              {item.GrossSales !== "undefined" && item.GrossSales !== null
                ? <Amount value={item.GrossSales} />
                : <Amount value={0} />}
            </td>
          );
        },

        Refunds: (item) => {
          return (
            <td>
              {typeof item.Refunds !== "undefined" && item.Refunds !== null
                ? <Amount value={item.Refunds} />
                : <Amount value={0} />}
            </td>
          );
        },
        discounts: (item) => {
          return (
            <td>
              {typeof item.discounts !== "undefined" && item.discounts !== null
                ? <Amount value={item.discounts} />
                : <Amount value={0} />}
            </td>
          );
        },
        NetSales: (item) => {
          return (
            <td>
              {typeof item.NetSales !== "undefined" && item.NetSales !== null
                ? <Amount value={item.NetSales} />
                : <Amount value={0} />}
            </td>
          );
        },
        CostOfGoods: (item) => {
          return (
            <td>
              {typeof item.CostOfGoods !== "undefined" &&
                item.CostOfGoods !== null
                ? <Amount value={item.CostOfGoods} />
                : <Amount value={0} />}
            </td>
          );
        },
        GrossProfit: (item) => {
          return (
            <td>
              {typeof item.GrossProfit !== "undefined" &&
                item.GrossProfit !== null
                ? <Amount value={item.GrossProfit} />
                : <Amount value={0} />}
            </td>
          );
        },
        Margin: (item) => {
          return (
            <td>
              {item.Margin !== "undefined" && item.Margin !== null
                ? item.Margin
                : <Amount value={0} />+" %"}
            </td>
          );
        },
        Tax: (item) => {
          return (
            <td>
              {typeof item.Tax !== "undefined" && item.Tax !== null
                ? <Amount value={item.Tax} />
                : <Amount value={0} />}
            </td>
          );
        },
      }}
    />
  );
};

export default SalesSummaryDatatableNew;
