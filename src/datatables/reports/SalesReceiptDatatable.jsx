import React from "react";
import { CDataTable } from "@coreui/react";
import { update_row_data } from "../../actions/reports/salesReceiptActions";
import { useDispatch } from "react-redux";
import moment from "moment";
import Amount from "../../components/utils/Amount";

const SalesReceiptDatatable = (props) => {
  const dispatch = useDispatch();

  const clickRow = (item) => {
    dispatch(update_row_data(item, true));
  };
  return (
    <CDataTable
      itemsPerPageSelect
      items={props.sale_receipt_sumary}
      fields={[
        { key: "receipt_number", label: "Receipt no", filter: true },
        {
          key: "created_at",
          label: "Date",
          filter: true,
        },
        { key: "store", label: "Store", filter: true },
        {
          key: "user",
          label: "Employee",
          filter: true,
        },
        { key: "customer", label: "Customer", filter: true },
        { key: "receipt_type", label: "Type", filter: true },
        { key: "total_price", label: "Total", filter: true },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      outlined
      pagination
      clickableRows
      onRowClick={clickRow}
      scopedSlots={{
        receipt_type: (item) => {
          return (
            <td>
              {item.receipt_type} {item.cancelled_at ? "(cancelled)" : ""}
            </td>
          );
        },
        created_at: (item) => {
          return (
            <td>
              {typeof item.sale_timestamp !== "undefined" &&
              item.sale_timestamp !== null
                ? moment(item.sale_timestamp).format("MMM D, YYYY h:mm A")
                : "-"}
            </td>
          );
        },
        store: (item) => {
          return (
            <td>
              {typeof item.store !== "undefined" && item.store !== null
                ? item.store.name !== undefined && item.store.name !== null
                  ? item.store.name
                  : ""
                : ""}
            </td>
          );
        },
        customer: (item) => {
          return (
            <td>
              {typeof item.customer !== "undefined" && item.customer !== null
                ? item.customer.name !== undefined &&
                  item.customer.name !== null
                  ? item.customer.name
                  : "—"
                : "—"}
            </td>
          );
        },
        user: (item) => {
          return (
            <td>
              {typeof item.user !== "undefined" && item.user !== null
                ? item.user.name !== undefined && item.user.name !== null
                  ? item.user.name
                  : ""
                : ""}
            </td>
          );
        },
        total_price: (item) => {
          return (
            <td>
              {typeof item.total_price !== "undefined" &&
              item.total_price !== null ? (
                <Amount value={item.total_price} />
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

export default SalesReceiptDatatable;
