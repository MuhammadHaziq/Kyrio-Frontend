import React, { useState } from "react";
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import {
  toggle_employee_sales_summary_single_select,
  toggle_employee_sales_summary_all_select,
  update_row_data,
} from "../../actions/reports/salesEmployeeActions";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";

const SalesEmployeeDatatableNew = (props) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const check = (e, item) => {
    dispatch(toggle_employee_sales_summary_single_select(item));
  };

  const clickRow = (item, index, column) => {
    if (column !== "select") {
      dispatch(update_row_data(item));
    }
  };

  const checkAll = (e, selectAll) => {
    setSelectAll(!selectAll);
    dispatch(toggle_employee_sales_summary_all_select(!selectAll));
  };
  return (
    <CDataTable
      items={props.sales_by_employee_detail}
      fields={[
        {
          key: "select",
          label: "Select",
          filter: false,
          _style: { width: "5%" },
        },
        { key: "name", label: "Name", filter: true },
        { key: "gross_sales", label: "Gross sales", filter: true },
        { key: "refund", label: "Refunds", filter: true },
        { key: "discount", label: "Discount", filter: true },
        { key: "net_sales", label: "Net sales", filter: true },
        { key: "receipt", label: "Receipts", filter: true },
        { key: "avg_sale", label: "Average Sale", filter: true },
        {
          key: "customer_signed_up",
          label: "Customers Signed Up",
          filter: true,
        },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      pagination
      // clickableRows
      // onRowClick={clickRow}
      columnHeaderSlot={{
        select: [
          <CFormGroup variant="custom-checkbox">
            <CInputCheckbox
              custom
              id={`checkbox`}
              onClick={(e) => checkAll(e, selectAll)}
            />
            <CLabel variant="custom-checkbox" htmlFor={`checkbox`} />
          </CFormGroup>,
        ],
      }}
      scopedSlots={{
        select: (item) => {
          return (
            <td>
              <CFormGroup variant="custom-checkbox">
                <CInputCheckbox
                  custom
                  id={`checkbox${item._id}`}
                  checked={item.isDeleted}
                  onChange={(e) => check(e, item)}
                  disabled={
                    item.role !== undefined && item.role !== null
                      ? item.role["name"] !== undefined &&
                        item.role["name"] !== null
                        ? item.role["name"].toUpperCase() == "OWNER"
                        : ""
                      : ""
                  }
                />
                <CLabel
                  variant="custom-checkbox"
                  htmlFor={`checkbox${item._id}`}
                />
              </CFormGroup>
            </td>
          );
        },
        gross_sales: (item) => {
          return (
            <td>
              {item.total_after_discount !== "undefined" &&
              item.total_after_discount !== null
                ? item.total_after_discount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        refund: (item) => {
          return (
            <td>
              {typeof item.refund !== "undefined" && item.refund !== null
                ? item.refund.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        discount: (item) => {
          return (
            <td>
              {typeof item.discount !== "undefined" && item.discount !== null
                ? item.discount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
      }}
    />
  );
};

export default SalesEmployeeDatatableNew;
