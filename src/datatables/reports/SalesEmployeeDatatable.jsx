import React from "react";
import { CDataTable } from "@coreui/react";
import Amount from "../../components/utils/Amount";

const SalesEmployeeDatatable = (props) => {
  return (
    <CDataTable
      itemsPerPageSelect
      items={props.sales_by_employee_detail}
      fields={[
        { key: "Name", label: "Name", filter: true },
        { key: "GrossSales", label: "Gross sales", filter: true },
        { key: "Refunds", label: "Refunds", filter: true },
        { key: "discounts", label: "Discount", filter: true },
        { key: "NetSales", label: "Net sales", filter: true },
        { key: "Receipts", label: "Receipts", filter: true },
        { key: "AverageSale", label: "Average sale", filter: true },
        // { key: "Customers", label: "Customer signed up", filter: true },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      pagination
      outlined
      // clickableRows
      // onRowClick={clickRow}
      scopedSlots={{
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
        AverageSale: (item) => {
          return (
            <td>
              {typeof item.AverageSale !== "undefined" &&
              item.AverageSale !== null ? (
                <Amount value={item.AverageSale} />
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

export default SalesEmployeeDatatable;
