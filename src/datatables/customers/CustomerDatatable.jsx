import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_customer_single_select,
  toggle_customer_all_select,
  update_row_data,
} from "../../actions/customer/customerActions";
import { useDispatch } from "react-redux";

const CustomerDatatable = (props) => {
  const dispatch = useDispatch();

  const showName = (cell, row) => {
    return (
      <React.Fragment>
        <b style={{ fontSize: "smaller" }}>{row.name || "-"}</b>
        <span>
          <p>{row.note || ""}</p>
        </span>
      </React.Fragment>
    );
  };
  const showContacts = (cell, row) => {
    return (
      <React.Fragment>
        {row.email}
        <span>
          <p>{row.phone}</p>
        </span>
      </React.Fragment>
    );
  };

  const firstVisit = (cell, row) => {
    return row.firstVisitData || "-";
  };
  const lastVisit = (cell, row) => {
    return row.lastVisitData || "-";
  };
  const totalVisit = (cell, row) => {
    return row.totalVisit || "0";
  };
  const totalSpent = (cell, row) => {
    return row.totalSpent || "0.00";
  };
  const pointBalance = (cell, row) => {
    return row.pointBalance || "0.00";
  };

  const onRowSelect = (row, isSelected, e) => {
    dispatch(toggle_customer_single_select(row));
  };

  const onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      dispatch(toggle_customer_all_select(true));
    } else {
      dispatch(toggle_customer_all_select(false));
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
        value: props.customers.length,
      },
    ],
    sizePerPage: 5,
    onRowClick: function (row) {
      dispatch(update_row_data(row));
    },
  };
  return (
    <React.Fragment>
      <BootstrapTable
        data={props.customers}
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
        <TableHeaderColumn dataField="name" dataFormat={showName} width="20%">
          Customer
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="email"
          dataSort={true}
          dataFormat={showContacts}
          width="20%"
        >
          Conatcts
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="firstVisit"
          dataSort={true}
          dataFormat={firstVisit}
        >
          First visit
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="lastVisit"
          dataSort={true}
          dataFormat={lastVisit}
        >
          Last visit
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="totalVisit"
          dataSort={true}
          dataFormat={totalVisit}
        >
          Total Visits
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="totalSpent"
          dataSort={true}
          dataFormat={totalSpent}
        >
          Total Spent
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="pointsBalance"
          dataSort={true}
          dataFormat={pointBalance}
        >
          Points Balance
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
};

export default CustomerDatatable;
