import React, { useState } from "react";
import {
  CDataTable,
} from "@coreui/react";
import {
  toggle_receipt_summary_single_select,
  toggle_receipt_summary_all_select,
  update_row_data,
} from "../../actions/reports/salesReceiptActions";
import { useSelector, useDispatch } from "react-redux";
import dateFormat from "dateformat";

const SalesReceiptDatatable = (props) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const check = (e, item) => {
    dispatch(toggle_receipt_summary_single_select(item));
  };

  const clickRow = (item) => {
    dispatch(update_row_data(item, true));
  };

  const checkAll = (e, selectAll) => {
    setSelectAll(!selectAll);
    dispatch(toggle_receipt_summary_all_select(!selectAll));
  };
  return (
    <CDataTable
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
      outlined
      clickableRows
      onRowClick={clickRow}
      scopedSlots={{
        receipt_type: (item) => {
          return <td>{item.receipt_type} {item.cancelled_at ? "(cancelled)" : ""}</td>
        },
        created_at: (item) => {
          return (
            <td>
              {typeof item.sale_timestamp !== "undefined" &&
                item.sale_timestamp !== null ? dateFormat(item.sale_timestamp, 'yyyy-mm-dd')// '$100.00'
                : '-'}
            </td>
          );
        },
        store: (item) => {
          return (
            <td>
              {typeof item.store !== "undefined" &&
                item.store !== null ? item.store.name !== undefined && item.store.name !== null ? item.store.name : '' : ''}
            </td>
          );
        },
        customer: (item) => {
          return (
            <td>
              {typeof item.customer !== "undefined" &&
                item.customer !== null ? item.customer.name !== undefined && item.customer.name !== null ? item.customer.name : '—' : '—'}
            </td>
          );
        },
        user: (item) => {
          return (
            <td>
              {typeof item.user !== "undefined" &&
                item.user !== null ? item.user.name !== undefined && item.user.name !== null ? item.user.name : '' : ''}
            </td>
          );
        },
        total_price: (item) => {
          return (
            <td>
              {typeof item.total_price !== "undefined" &&
                item.total_price !== null ? new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(Number(item.total_price))// '$100.00'
                : new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(0)}
            </td>
          );
        }
      }}
    />
  );
};

export default SalesReceiptDatatable;
