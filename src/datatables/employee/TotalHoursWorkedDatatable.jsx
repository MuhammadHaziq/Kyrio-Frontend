import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_employee_single_select,
  toggle_employee_all_select,
  update_row_data,
} from "../../actions/employee/employeeListActions";
import { useSelector, useDispatch } from "react-redux";

const TotalHoursWorkedDatatable = (props) => {
  const dispatch = useDispatch();

  const StoreName = (cell, row) => {
    return row.store !== undefined ? row.store.name : "";
  };

  const onRowSelect = (row, isSelected, e) => {
    // dispatch(toggle_employee_single_select(row));
    console.log(row);
  };

  const onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      // dispatch(toggle_employee_all_select(true));
    } else {
      // dispatch(toggle_employee_all_select(false));
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
        value: props.timeCard_list.length,
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
        data={props.timeCard_list}
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
        <TableHeaderColumn dataField="employee" dataSort={true}>
          Employee
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="store"
          dataSort={true}
          dataFormat={StoreName}
        >
          Store
        </TableHeaderColumn>
        <TableHeaderColumn dataField="totalHour" dataSort={true}>
          Total Hour
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
};

export default TotalHoursWorkedDatatable;
