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

const SalesTaxDatatableNew = (props) => {
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
      items={props.taxes_sales_summary}
      fields={[
        { key: "tax_name", label: "Tax name", filter: true },
        {
          key: "tax_rate",
          label: "Tax rate",
          filter: true,
        },
        { key: "taxable_salres", label: "Taxable sales", filter: true },
        { key: "tax_amount", label: "Tax amount", filter: true },
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

export default SalesTaxDatatableNew;
