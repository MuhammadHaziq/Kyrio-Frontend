import React, { useState, useEffect } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_payments_single_select,
  toggle_payments_all_select,
  update_row_data,
} from "../../../actions/settings/paymentTypesActions";
import { useDispatch } from "react-redux";

const PaymentTypesDatatable = (props) => {
  const dispatch = useDispatch();
  /**
   *
   *  Datatable functions start
   *
   ***/

  const onRowSelect = (row, isSelected, e) => {
    dispatch(toggle_payments_single_select(row));
  };

  const onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      dispatch(toggle_payments_all_select(true));
    } else {
      dispatch(toggle_payments_all_select(false));
    }
  };
  var disableId = (props.payments || [])
    .filter((item) => item.name.toUpperCase() === "Cash".toUpperCase())
    .map((item) => {
      return item._id;
    })[0];
  const selectRowProp = {
    mode: "checkbox",
    onSelect: onRowSelect,
    onSelectAll: onSelectAll,
    unselectable: disableId || 0,
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
        value: props.payments.length,
      },
    ],
    sizePerPage: 5,
    onRowClick: function (row) {
      if (row.name.toUpperCase() === "Cash".toUpperCase()) {
        dispatch(update_row_data(row));
      } else {
        dispatch(update_row_data(row));
      }
    },
  };
  return (
    <React.Fragment>
      <BootstrapTable
        data={props.payments}
        version="4"
        striped
        hover
        selectRow={selectRowProp}
        options={options}
      >
        <TableHeaderColumn
          dataField="_id"
          isKey={true}
          dataSort={true}
          hidden={true}
        >
          Id
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name" dataSort={true}>
          Name
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
};

export default PaymentTypesDatatable;
