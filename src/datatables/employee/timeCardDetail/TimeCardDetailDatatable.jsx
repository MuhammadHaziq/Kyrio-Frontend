import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";

import dateFormat from "dateformat";

const TimeCardDetailDatatable = (props) => {
  const clockIn = (cell, row) => {
    const timeConst =
      row !== undefined
        ? Number(row.clockInTime.split(":")[0]) >= 12
          ? "PM"
          : "AM"
        : "-";
    let time24 = row !== undefined ? Number(row.clockInTime.split(":")[0]) : 0;
    let time12 = time24 % 12 || 12;
    time12 = time12 + ":" + row.clockInTime.split(":")[1];

    return row !== undefined
      ? dateFormat(row.clockInDate, "mmmm d, yyyy") +
          " " +
          time12 +
          " " +
          timeConst
      : "";
  };

  const clockOut = (cell, row) => {
    const timeConst =
      row !== undefined
        ? Number(row.clockOutTime.split(":")[0]) >= 12
          ? "PM"
          : "AM"
        : "-";
    let time24 = row !== undefined ? Number(row.clockOutTime.split(":")[0]) : 0;
    let time12 = time24 % 12 || 12;
    time12 = time12 + ":" + row.clockOutTime.split(":")[1];
    return row !== undefined
      ? dateFormat(row.clockOutDate, "mmmm d, yyyy") +
          " " +
          time12 +
          " " +
          timeConst
      : "";
  };

  const DateFormat = (cell, row) => {
    return dateFormat(cell, "mmmm d, yyyy");
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
        value: props.timeCard_detail.length,
      },
    ],
    sizePerPage: 5,
  };
  return (
    <React.Fragment>
      <BootstrapTable
        data={props.timeCard_detail}
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
          dataField="created_at"
          width="20%"
          dataFormat={DateFormat}
        >
          Date
        </TableHeaderColumn>
        <TableHeaderColumn dataField="event" width="20%">
          Event
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="clockIn"
          width="20%"
          dataFormat={clockIn}
          columnClassName="td-column"
        >
          Clock in
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="clockOut"
          dataSort={true}
          width="20%"
          dataFormat={clockOut}
          columnClassName="td-column"
        >
          Clock out
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
};

export default TimeCardDetailDatatable;
