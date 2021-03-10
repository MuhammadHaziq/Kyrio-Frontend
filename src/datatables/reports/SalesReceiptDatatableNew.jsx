import React, { useState } from "react";
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import {
  toggle_receipt_summary_single_select,
  toggle_receipt_summary_all_select,
  update_row_data,
} from "../../actions/reports/salesReceiptActions";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";

const SalesReceiptDatatableNew = (props) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const check = (e, item) => {
    dispatch(toggle_receipt_summary_single_select(item));
  };

  const clickRow = (item, index, column) => {
    if (column !== "select") {
      dispatch(update_row_data(item));
    }
  };

  const checkAll = (e, selectAll) => {
    setSelectAll(!selectAll);
    dispatch(toggle_receipt_summary_all_select(!selectAll));
  };
  return (
    <CDataTable
      items={props.sale_receipt_sumary}
      fields={[
        { key: "receipt_no", label: "Receipt no", filter: true },
        {
          key: "date",
          label: "Date",
          filter: true,
        },
        { key: "store", label: "Store", filter: true },
        {
          key: "employee",
          label: "Employee",
          filter: true,
        },
        { key: "customer", label: "Customer", filter: true },
        { key: "type", label: "Type", filter: true },
        { key: "total", label: "Total", filter: true },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      pagination
      // clickableRows
      // onRowClick={clickRow}
    />
  );
};

export default SalesReceiptDatatableNew;
