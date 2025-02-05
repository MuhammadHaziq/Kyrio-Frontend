import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_payment_type_sales_summary_single_select,
  toggle_payment_type_sales_summary_all_select,
  update_row_data,
} from "../../actions/reports/salesPaymentTypeActions";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";

const SalesPaymentTypeDatatable = (props) => {
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
    dispatch(toggle_payment_type_sales_summary_single_select(row));
  };

  const onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      dispatch(toggle_payment_type_sales_summary_all_select(true));
    } else {
      dispatch(toggle_payment_type_sales_summary_all_select(false));
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
        value: props.sales_by_paymentType_detail.length,
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
        data={props.sales_by_paymentType_detail}
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
        ></TableHeaderColumn>
        <TableHeaderColumn dataField="payment_type" dataSort={true}>
          Payment type
        </TableHeaderColumn>
        <TableHeaderColumn dataField="payment_transaction" dataSort={true}>
          Payment transactions
        </TableHeaderColumn>
        <TableHeaderColumn dataField="payment_amount" dataSort={true}>
          Payment amount
        </TableHeaderColumn>
        <TableHeaderColumn dataField="refund_transaction" dataSort={true}>
          Refund transactions
        </TableHeaderColumn>
        <TableHeaderColumn dataField="refund_amount" dataSort={true}>
          Refund amount
        </TableHeaderColumn>
        <TableHeaderColumn dataField="net_amount" dataSort={true}>
          Net amount
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
};

export default SalesPaymentTypeDatatable;
