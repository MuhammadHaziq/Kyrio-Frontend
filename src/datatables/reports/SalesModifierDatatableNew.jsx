import React, { useState } from "react";
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import {
  toggle_modifier_category_summary_single_select,
  toggle_modifier_category_summary_all_select,
  update_row_data,
} from "../../actions/reports/salesModifierActions";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";

const SalesModifierDatatableNew = (props) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const check = (e, item) => {
    dispatch(toggle_modifier_category_summary_single_select(item));
  };

  const clickRow = (item, index, column) => {
    if (column !== "select") {
      dispatch(update_row_data(item));
    }
  };

  const checkAll = (e, selectAll) => {
    setSelectAll(!selectAll);
    dispatch(toggle_modifier_category_summary_all_select(!selectAll));
  };
  return (
    <CDataTable
      items={props.sale_modifier_summary}
      fields={[
        { key: "modifier", label: "Modifier", filter: true },
        {
          key: "quantity_sold",
          label: "Quantity Sold",
          filter: true,
        },
        { key: "gross_sales", label: "Gross Sales", filter: true },
        {
          key: "quantity_refunded",
          label: "Quantity Refunded",
          filter: true,
        },
        { key: "refunds", label: "Refunds", filter: true },
        { key: "net_sales", label: "Net sales", filter: true },
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
