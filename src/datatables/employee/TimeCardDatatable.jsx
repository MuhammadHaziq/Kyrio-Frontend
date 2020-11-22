import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_timeCard_single_select,
  toggle_timeCard_all_select,
  update_row_data,
} from "../../actions/employee/timeCardActions";
import { useDispatch } from "react-redux";
import moment from "moment";
import dateFormat from "dateformat";
const TimeCardDatatable = (props) => {
  const dispatch = useDispatch();

  const StoreName = (cell, row) => {
    return row.store !== undefined ? row.store.name : "";
  };
  const EmployeeName = (cell, row) => {
    return row.employee !== undefined ? row.employee.name : "";
  };

  const clockIn = (cell, row) => {
    const timeConst =
      row.timeDetail !== undefined && row.timeDetail.length > 0
        ? Number(row.timeDetail[0].clockInTime.split(":")[0]) >= 12
          ? "PM"
          : "AM"
        : "-";
    let time24 =
      row.timeDetail !== undefined && row.timeDetail.length > 0
        ? Number(row.timeDetail[0].clockInTime.split(":")[0])
        : 0;
    let time12 = time24 % 12 || 12;
    time12 = time12 + ":" + row.timeDetail[0].clockInTime.split(":")[1];

    return row.timeDetail !== undefined && row.timeDetail.length > 0
      ? dateFormat(row.timeDetail[0].clockInDate, "mmmm d, yyyy") +
          " " +
          time12 +
          " " +
          timeConst
      : "";
  };

  const clockOut = (cell, row) => {
    const timeConst =
      row.timeDetail !== undefined && row.timeDetail.length > 0
        ? Number(row.timeDetail[0].clockOutTime.split(":")[0]) >= 12
          ? "PM"
          : "AM"
        : "-";
    let time24 =
      row.timeDetail !== undefined && row.timeDetail.length > 0
        ? Number(row.timeDetail[0].clockOutTime.split(":")[0])
        : 0;
    let time12 = time24 % 12 || 12;
    time12 = time12 + ":" + row.timeDetail[0].clockOutTime.split(":")[1];
    return row.timeDetail !== undefined && row.timeDetail.length > 0
      ? dateFormat(row.timeDetail[0].clockOutDate, "mmmm d, yyyy") +
          " " +
          time12 +
          " " +
          timeConst
      : "";
  };

  const totalHour = (cell, row) => {
    let totalHour = 0;
    const timeDiff = moment
      .duration(
        moment(row.timeDetail[0].clockOutDate).diff(
          moment(row.timeDetail[0].clockInDate)
        )
      )
      .asDays();

    const getNatural = (num) => {
      return parseFloat(num.toString().split(".")[0]) * 24;
    };
    let startHours =
      row.timeDetail[0].clockInTime !== null &&
      row.timeDetail[0].clockInTime !== undefined
        ? row.timeDetail[0].clockInTime.split(":")[0] === "12"
          ? 24
          : row.timeDetail[0].clockInTime.split(":")[0]
        : 0;
    let startMins =
      row.timeDetail[0].clockInTime !== null &&
      row.timeDetail[0].clockInTime !== undefined
        ? row.timeDetail[0].clockInTime.split(":")[1]
        : 0;
    let endHours =
      row.timeDetail[0].clockOutTime !== null &&
      row.timeDetail[0].clockOutTime !== undefined
        ? row.timeDetail[0].clockOutTime.split(":")[0] === "12"
          ? 24
          : row.timeDetail[0].clockOutTime.split(":")[0]
        : 0;
    let endMins =
      row.timeDetail[0].clockOutTime !== null &&
      row.timeDetail[0].clockOutTime !== undefined
        ? row.timeDetail[0].clockOutTime.split(":")[0]
        : 0;

    if (parseFloat(startHours) > parseFloat(endHours)) {
      let diffStartHour = 0;
      let diffEndMin = 0;
      diffStartHour = parseFloat(startHours) - parseFloat(endHours);
      diffEndMin = parseFloat(startMins) - parseFloat(endMins);
      totalHour = diffStartHour + getNatural(timeDiff);
      return totalHour + ":" + Math.abs(diffEndMin);
    } else {
      let diffEndHour = 0;
      let diffEndMin = 0;
      diffEndHour = parseFloat(endHours) - parseFloat(startHours);
      diffEndMin = parseFloat(startMins) - parseFloat(endMins);
      totalHour = diffEndHour + getNatural(timeDiff);
      return totalHour + ":" + Math.abs(diffEndMin);
    }
  };
  const onRowSelect = (row, isSelected, e) => {
    dispatch(toggle_timeCard_single_select(row));
  };

  const onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      dispatch(toggle_timeCard_all_select(true));
    } else {
      dispatch(toggle_timeCard_all_select(false));
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
      dispatch(update_row_data(row));
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

export default TimeCardDatatable;
