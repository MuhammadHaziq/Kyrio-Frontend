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

const SalesCategoryDatatable = (props) => {
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
        { key: "ItemsSold", label: "Items sold", filter: true },
        { key: "GrossSales", label: "Gross sales", filter: true },
        { key: "ItemsRefunded", label: "Items refunded", filter: true },
        { key: "Refunds", label: "Refunds", filter: true },
        { key: "discounts", label: "Discount", filter: true },
        { key: "NetSales", label: "Net sales", filter: true },
        { key: "CostOfGoods", label: "Cost of goods", filter: true },
        { key: "GrossProfit", label: "Gross profit", filter: true },
        { key: "Margin", label: "Margin", filter: true },
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
        ItemsSold: (item) => {
          return (
            <td>
              {typeof item.ItemsSold !== "undefined" &&
                item.ItemsSold !== null ? new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(Number(item.ItemsSold))// '$100.00'
                : new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(0)}
            </td>
          );
        },
        ItemsRefunded: (item) => {
          return (
            <td>
              {typeof item.ItemsRefunded !== "undefined" &&
                item.ItemsRefunded !== null ? new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(Number(item.ItemsRefunded))// '$100.00'
                : new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(0)}
            </td>
          );
        },
        GrossSales: (item) => {
          return (
            <td>
              {typeof item.GrossSales !== "undefined" &&
                item.GrossSales !== null ? new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(Number(item.GrossSales))// '$100.00'
                : new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(0)}
            </td>
          );
        },
        NetSales: (item) => {
          return (
            <td>
              {typeof item.NetSales !== "undefined" &&
                item.NetSales !== null ? new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(Number(item.NetSales))// '$100.00'
                : new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(0)}
            </td>
          );
        },
        CostOfGoods: (item) => {
          return (
            <td>
              {typeof item.CostOfGoods !== "undefined" &&
                item.CostOfGoods !== null ? new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(Number(item.CostOfGoods))// '$100.00'
                : new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(0)}
            </td>
          );
        },
        GrossProfit: (item) => {
          return (
            <td>
              {typeof item.GrossProfit !== "undefined" &&
                item.GrossProfit !== null ? new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(Number(item.GrossProfit))// '$100.00'
                : new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(0)}
            </td>
          );
        },
        Margin: (item) => {
          return (
            <td>
              {item.Margin +"%"}
            </td>
          )
        },
        Refunds: (item) => {
          return (
            <td>
              {typeof item.Refunds !== "undefined" &&
                item.Refunds !== null ? new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(Number(item.Refunds))// '$100.00'
                : new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(0)}
            </td>
          );
        },
        discounts: (item) => {
          return (
            <td>
              {typeof item.discounts !== "undefined" &&
                item.discounts !== null ? new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(Number(item.discounts))// '$100.00'
                : new Intl.NumberFormat('en-US',
                  { style: 'currency', currency: 'USD' }
                ).format(0)}
            </td>
          );
        },
      }}
    />
  );
};

export default SalesCategoryDatatable;
