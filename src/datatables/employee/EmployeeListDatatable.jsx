import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_employee_single_select,
  toggle_employee_all_select,
  update_row_data,
} from "../../actions/employee/employeeListActions";
import { useSelector, useDispatch } from "react-redux";

const EmployeeListDatatable = (props) => {
  const dispatch = useDispatch();

  const phone = (cell, row) => {
    return row.phone || "-";
  };
  const Role = (cell, row) => {
    return row.role !== undefined ? row.role["name"] || "-" : "-";
  };

  const onRowSelect = (row, isSelected, e) => {
    dispatch(toggle_employee_single_select(row));
    console.log(row);
  };

  const onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      dispatch(toggle_employee_all_select(true));
    } else {
      dispatch(toggle_employee_all_select(false));
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
        value: props.employee_list.length,
      },
    ],
    sizePerPage: 5,
    onRowClick: function (row) {
      console.log(row);
      dispatch(update_row_data(row));
    },
  };
  return (
    <React.Fragment>
      <BootstrapTable
        data={props.employee_list}
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
        <TableHeaderColumn dataField="name" width="20%">
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="email" dataSort={true} width="20%">
          Email
        </TableHeaderColumn>
        <TableHeaderColumn dataField="phone" dataSort={true} dataFormat={phone}>
          Phone
        </TableHeaderColumn>
        <TableHeaderColumn dataField="role" dataSort={true} dataFormat={Role}>
          Role
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
};

export default EmployeeListDatatable;
