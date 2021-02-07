import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
const TotalHoursWorkedDatatable = (props) => {
  const StoreName = (cell, row) => {
    return row.store !== undefined ? row.store.name : "";
  };
  const EmployeeName = (cell, row) => {
    return row.employee !== undefined ? row.employee.name : "";
  };
  const totalHour = (cell, row) => {
    return row.timeDetail !== undefined && row.timeDetail.length > 0
      ? row.timeDetail[0].totalWorkingHour !== undefined &&
        row.timeDetail[0].totalWorkingHour !== null
        ? row.timeDetail[0].totalWorkingHour
        : ""
      : "";
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
  };
  return (
    <React.Fragment>
      <BootstrapTable
        data={props.timeCard_list}
        version="4"
        hover={true}
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
        <TableHeaderColumn
          dataField="employee"
          dataSort={true}
          dataFormat={EmployeeName}
        >
          Employee
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="store"
          dataSort={true}
          dataFormat={StoreName}
        >
          Store
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="totalHour"
          dataSort={true}
          dataFormat={totalHour}
        >
          Total Hour
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
};

export default TotalHoursWorkedDatatable;
