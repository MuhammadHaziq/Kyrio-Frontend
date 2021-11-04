import React, { useState } from "react";
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import {
  toggle_tax_sale_single_select,
  toggle_tax_sale_all_select,
  update_row_data,
} from "../../actions/reports/salesTaxesActions";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";

const SalesShiftDatatableNew = (props) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const check = (e, item) => {
    dispatch(toggle_tax_sale_single_select(item));
  };

  const clickRow = (item, index, column) => {
    if (column !== "select") {
      dispatch(update_row_data(item));
    }
  };

  const checkAll = (e, selectAll) => {
    setSelectAll(!selectAll);
    dispatch(toggle_tax_sale_all_select(!selectAll));
  };
  return (
    <CDataTable
   itemsPerPageSelect
      items={props.sale_shift_summary}
      fields={[
        { key: "pos", label: "POS", filter: true },
        {
          key: "opening_time",
          label: "Opening time",
          filter: true,
        },
        { key: "closing_time", label: "Closing time", filter: true },
        {
          key: "expected_cash_amount",
          label: "Expected cash amount",
          filter: true,
        },
        {
          key: "actual_cash_amount",
          label: "Actual cash amount",
          filter: true,
        },
        { key: "difference", label: "Difference", filter: true },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      outlined
      pagination
    />
  );
};

export default SalesShiftDatatableNew;
