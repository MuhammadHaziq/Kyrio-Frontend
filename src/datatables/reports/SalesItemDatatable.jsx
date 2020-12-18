import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_item_sale_single_select,
  toggle_item_sale_all_select,
  update_row_data,
} from "../../actions/reports/salesItemActions";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";

const SalesItemDatatable = (props) => {
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
    dispatch(toggle_item_sale_single_select(row));
  };

  const onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      dispatch(toggle_item_sale_all_select(true));
    } else {
      dispatch(toggle_item_sale_all_select(false));
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
        value: props.item_sale_summary.length,
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
        data={props.item_sale_summary}
        version="4"
        hover={true}
        selectRow={selectRowProp}
        options={options}
        pagination={true}
        // tableHeaderClass="header-purchase " // BST means Barcode Search Table
        // tableBodyClass="body-purchase "
        // containerClass="container-purchase "
      >
        <TableHeaderColumn
          dataField="_id"
          dataSort={true}
          hidden={true}
          isKey={true}
        >
          Id
        </TableHeaderColumn>
        <TableHeaderColumn dataField="item" dataSort={true}>
          Item
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="sku"
          dataSort={true}
          hidden={
            props.columns.filter((item) => {
              return item.name.trim() === "sku".trim();
            })[0]["isHidden"]
          }
        >
          SKU
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="category"
          dataSort={true}
          hidden={
            props.columns.filter((item) => {
              return item.name.trim() === "category".trim();
            })[0]["isHidden"]
          }
        >
          Category
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="item_sold"
          dataSort={true}
          hidden={
            props.columns.filter((item) => {
              return item.name.trim() === "item_sold".trim();
            })[0]["isHidden"]
          }
        >
          Items sold
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="gross_sale"
          dataSort={true}
          hidden={
            props.columns.filter((item) => {
              return item.name.trim() === "gross_sale".trim();
            })[0]["isHidden"]
          }
        >
          Gross sales
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="item_refunded"
          dataSort={true}
          hidden={
            props.columns.filter((item) => {
              return item.name.trim() === "item_refunded".trim();
            })[0]["isHidden"]
          }
        >
          Items refunded
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="refund"
          dataSort={true}
          hidden={
            props.columns.filter((item) => {
              return item.name.trim() === "refund".trim();
            })[0]["isHidden"]
          }
        >
          Refunds
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="discount"
          dataSort={true}
          hidden={
            props.columns.filter((item) => {
              return item.name.trim() === "discount".trim();
            })[0]["isHidden"]
          }
        >
          Discount
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="net_sales"
          dataSort={true}
          hidden={
            props.columns.filter((item) => {
              return item.name.trim() === "net_sale".trim();
            })[0]["isHidden"]
          }
        >
          Net sales
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="cost_of_good"
          dataSort={true}
          hidden={
            props.columns.filter((item) => {
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
            props.columns.filter((item) => {
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
            props.columns.filter((item) => {
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
            props.columns.filter((item) => {
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

export default SalesItemDatatable;
