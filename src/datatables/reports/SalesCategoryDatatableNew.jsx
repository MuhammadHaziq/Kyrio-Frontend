import React, { useState } from "react";
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import {
  toggle_sales_category_summary_single_select,
  toggle_sales_category_summary_all_select,
  update_row_data,
} from "../../actions/reports/salesCategoryActions";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";

const SalesCategoryDatatableNew = (props) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const check = (e, item) => {
    dispatch(toggle_sales_category_summary_single_select(item));
  };

  const clickRow = (item, index, column) => {
    if (column !== "select") {
      dispatch(update_row_data(item));
    }
  };

  const checkAll = (e, selectAll) => {
    setSelectAll(!selectAll);
    dispatch(toggle_sales_category_summary_all_select(!selectAll));
  };
  return (
    <CDataTable
      items={props.category_sales_summary}
      fields={[
        {
          key: "select",
          label: "Select",
          filter: false,
          _style: { width: "5%" },
        },
        { key: "category", label: "Category", filter: true },
        { key: "item_sold", label: "Items sold", filter: true },
        { key: "gross_sales", label: "Gross sales", filter: true },
        { key: "item_refunded", label: "Items refunded", filter: true },
        { key: "refund", label: "Refunds", filter: true },
        { key: "total_price", label: "Cost of goods", filter: true },
        { key: "discount", label: "Discount", filter: true },
        { key: "net_sales", label: "Net sales", filter: true },
        { key: "cost_of_good", label: "Cost of goods", filter: true },
        { key: "gross_profit", label: "Gross profit", filter: true },
        { key: "margin", label: "Margin", filter: true },
        { key: "taxes", label: "Taxes", filter: true },
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
        margin: (item) => {
          if (+item.cash_received === +item.total_price) {
            return <td>{"0 %"}</td>;
          } else {
            const margin = (+item.cash_received / +item.total_price) * 100;
            return <td>{margin.toFixed(2) + " %"} </td>;
          }
        },
        refund_amount: (item) => {
          return (
            <td>
              {typeof item.refund_amount !== "undefined" &&
              item.refund_amount !== null
                ? item.refund_amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        total_discount: (item) => {
          return (
            <td>
              {typeof item.total_discount !== "undefined" &&
              item.total_discount !== null
                ? item.total_discount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        total_price: (item) => {
          return (
            <td>
              {typeof item.total_price !== "undefined" &&
              item.total_price !== null
                ? item.total_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        total_after_discount: (item) => {
          return (
            <td>
              {typeof item.total_after_discount !== "undefined" &&
              item.total_after_discount !== null
                ? item.total_after_discount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        total_after_discount: (item) => {
          return (
            <td>
              {typeof item.total_after_discount !== "undefined" &&
              item.total_after_discount !== null
                ? item.total_after_discount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        total_tax: (item) => {
          return (
            <td>
              {typeof item.total_tax !== "undefined" && item.total_tax !== null
                ? item.total_tax.toLocaleString("en-US", {
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

export default SalesCategoryDatatableNew;
