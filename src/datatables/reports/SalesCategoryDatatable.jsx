import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_sales_category_summary_single_select,
  toggle_sales_category_summary_all_select,
  update_row_data,
} from "../../actions/reports/salesCategoryActions";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";

const SalesCategoryDatatable = (props) => {
  const dispatch = useDispatch();

  const showDate = (cell, row) => {
    return dateFormat(row.created_at, "dd-mm-yyyy");
  };

  const showGrossSale = (cell, row) => {
    return row.total_after_discount !== null
      ? row.total_after_discount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "$ 0.00";
  };
  const showMargin = (cell, row) => {
    if (+row.cash_received === +row.total_price) {
      return "0 %";
    } else {
      const margin = (+row.cash_received / +row.total_price) * 100;
      return margin.toFixed(2) + " %";
    }
  };
  const showRefund = (cell, row) => {
    return row.refund_amount !== null
      ? row.refund_amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "$ 0.00";
  };
  const showDiscount = (cell, row) => {
    return row.total_discount !== null
      ? row.total_discount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "$ 0.00";
  };

  const showCostGood = (cell, row) => {
    return row.total_price !== null
      ? row.total_price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "$ 0.00";
  };

  const showNetSale = (cell, row) => {
    return row.total_after_discount !== null
      ? row.total_after_discount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "$ 0.00";
  };
  const showProfit = (cell, row) => {
    return row.total_after_discount !== null
      ? row.total_after_discount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "$ 0.00";
  };
  const ShowTax = (cell, row) => {
    return row.total_tax !== null
      ? row.total_tax.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "$ 0.00";
  };

  const onRowSelect = (row, isSelected, e) => {
    dispatch(toggle_sales_category_summary_single_select(row));
  };

  const onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      dispatch(toggle_sales_category_summary_all_select(true));
    } else {
      dispatch(toggle_sales_category_summary_all_select(false));
    }
  };

  const selectRowProp = {
    mode: "checkbox",
    onSelect: onRowSelect,
    onSelectAll: onSelectAll,
  };
  /**
   *
   *  Datatable functions End
   *
   ***/
  const options = {
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: props.category_sales_summary.length,
      },
    ],
    sizePerPage: 5,
    onRowClick: function (row) {
      console.log(row);
      // dispatch(update_row_data(row));
    },
  };
  return (
    <React.Fragment>
      <BootstrapTable
        data={props.category_sales_summary}
        version="4"
        hover={true}
        selectRow={selectRowProp}
        options={options}
        pagination={true}
      >
        <TableHeaderColumn
          dataField="_id"
          dataSort={true}
          hidden={true}
          isKey={true}
        >
          Id
        </TableHeaderColumn>
        <TableHeaderColumn dataField="category" dataSort={true}>
          Category
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="item_sold"
          dataSort={true}
          hidden={
            !props.columns.filter((item) => {
              return item.name.trim() === "item_sold".trim();
            })[0]["isHidden"]
          }
        >
          Items Sold
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="gross_sales"
          dataSort={true}
          hidden={
            !props.columns.filter((item) => {
              return item.name.trim() === "gross_sales".trim();
            })[0]["isHidden"]
          }
        >
          Gross Sales
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="item_refund"
          dataSort={true}
          hidden={
            !props.columns.filter((item) => {
              return item.name.trim() === "item_refund".trim();
            })[0]["isHidden"]
          }
        >
          Items refunded
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="refunds"
          dataSort={true}
          hidden={
            !props.columns.filter((item) => {
              return item.name.trim() === "refunds".trim();
            })[0]["isHidden"]
          }
        >
          Refunds
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="total_price"
          dataSort={true}
          hidden={
            !props.columns.filter((item) => {
              return item.name.trim() === "total_price".trim();
            })[0]["isHidden"]
          }
        >
          Cost of goods
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="discount"
          dataSort={true}
          hidden={
            !props.columns.filter((item) => {
              return item.name.trim() === "discount".trim();
            })[0]["isHidden"]
          }
        >
          Discounts
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="net_sales"
          dataSort={true}
          hidden={
            !props.columns.filter((item) => {
              return item.name.trim() === "net_sales".trim();
            })[0]["isHidden"]
          }
        >
          Net sales
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="cost_of_good"
          dataSort={true}
          hidden={
            !props.columns.filter((item) => {
              return item.name.trim() === "cost_of_good".trim();
            })[0]["isHidden"]
          }
        >
          Cost of goods
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="gross_profit"
          dataSort={true}
          hidden={
            !props.columns.filter((item) => {
              return item.name.trim() === "gross_profit".trim();
            })[0]["isHidden"]
          }
        >
          Gross profit
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="margin"
          dataSort={true}
          hidden={
            !props.columns.filter((item) => {
              return item.name.trim() === "margin".trim();
            })[0]["isHidden"]
          }
        >
          Margin
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="taxes"
          dataSort={true}
          hidden={
            !props.columns.filter((item) => {
              return item.name.trim() === "taxes".trim();
            })[0]["isHidden"]
          }
        >
          Taxes
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
};

export default SalesCategoryDatatable;
