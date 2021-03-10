import React, { useState } from "react";
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import {
  toggle_payment_type_sales_summary_single_select,
  toggle_payment_type_sales_summary_all_select,
  update_row_data,
} from "../../actions/reports/salesPaymentTypeActions";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";

const SalesPaymentTypeDatatableNew = (props) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const check = (e, item) => {
    dispatch(toggle_payment_type_sales_summary_single_select(item));
  };

  const clickRow = (item, index, column) => {
    if (column !== "select") {
      dispatch(update_row_data(item));
    }
  };

  const checkAll = (e, selectAll) => {
    setSelectAll(!selectAll);
    dispatch(toggle_payment_type_sales_summary_all_select(!selectAll));
  };
  return (
    <CDataTable
      items={props.sales_by_paymentType_detail}
      fields={[
        { key: "payment_type", label: "Payment type", filter: true },
        {
          key: "payment_transaction",
          label: "Payment transactions",
          filter: true,
        },
        { key: "payment_amount", label: "Payment amount", filter: true },
        {
          key: "refund_transaction",
          label: "Refund transactions",
          filter: true,
        },
        { key: "refund_amount", label: "Refund amount", filter: true },
        { key: "net_amount", label: "Net amount", filter: true },
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

export default SalesPaymentTypeDatatableNew;
