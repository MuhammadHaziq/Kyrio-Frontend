import React, { useState } from "react";
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import {
  toggle_discount_summary_single_select,
  toggle_discount_summary_all_select,
  update_row_data,
} from "../../actions/reports/salesDiscountActions";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";

const SalesModifierDatatableNew = (props) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const check = (e, item) => {
    dispatch(toggle_discount_summary_single_select(item));
  };

  const clickRow = (item, index, column) => {
    if (column !== "select") {
      dispatch(update_row_data(item));
    }
  };

  const checkAll = (e, selectAll) => {
    setSelectAll(!selectAll);
    dispatch(toggle_discount_summary_all_select(!selectAll));
  };
  return (
    <CDataTable
      items={props.sale_discount_summary}
      fields={[
        { key: "name", label: "Name", filter: true },
        {
          key: "discount_applied",
          label: "Discounts applied",
          filter: true,
        },
        { key: "amount_discount", label: "Amount discounted", filter: true },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      pagination
    />
  );
};

export default SalesModifierDatatableNew;