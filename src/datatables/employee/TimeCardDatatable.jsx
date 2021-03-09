import React, { useState } from "react";
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
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

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const check = (e, item) => {
    dispatch(toggle_timeCard_single_select(item));
  };
  const clickRow = (item, index, column) => {
    if (column !== "select") {
      dispatch(update_row_data(item));
    }
  };

  const checkAll = (e, selectAll) => {
    setSelectAll(!selectAll);
    dispatch(toggle_timeCard_all_select(!selectAll));
  };
  return (
    <CDataTable
      items={props.timeCard_list}
      fields={[
        {
          key: "select",
          label: "Select",
          filter: false,
          _style: { width: "5%" },
        },
        { key: "clockIn", label: "Clock in", filter: true },
        { key: "clockOut", label: "Clock out", filter: true },
        { key: "employee", label: "Employee", filter: true },
        { key: "store", label: "Store", filter: true },
        { key: "totalWorkingHour", label: "Total Hour", filter: true },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      pagination
      clickableRows
      onRowClick={clickRow}
      columnHeaderSlot={{
        select: [
          <CFormGroup variant="custom-checkbox">
            <CInputCheckbox
              custom
              id={`checkbox`}
              onClick={(e) => checkAll(e, selectAll)}
            />
            <CLabel variant="custom-checkbox" htmlFor={`checkbox`} />
          </CFormGroup>,
        ],
      }}
      scopedSlots={{
        select: (item) => {
          return (
            <td>
              <CFormGroup variant="custom-checkbox">
                <CInputCheckbox
                  custom
                  id={`checkbox${item._id}`}
                  checked={item.isDeleted}
                  onChange={(e) => check(e, item)}
                  disabled={
                    item.role !== undefined && item.role !== null
                      ? item.role["name"] !== undefined &&
                        item.role["name"] !== null
                        ? item.role["name"].toUpperCase() == "OWNER"
                        : ""
                      : ""
                  }
                />
                <CLabel
                  variant="custom-checkbox"
                  htmlFor={`checkbox${item._id}`}
                />
              </CFormGroup>
            </td>
          );
        },
        clockIn: (item) => {
          const timeConst =
            item.timeDetail !== undefined && item.timeDetail.length > 0
              ? Number(item.timeDetail[0].clockInTime.split(":")[0]) >= 12
                ? "PM"
                : "AM"
              : "-";
          let time24 =
            item.timeDetail !== undefined && item.timeDetail.length > 0
              ? Number(item.timeDetail[0].clockInTime.split(":")[0])
              : 0;
          let time12 = time24 % 12 || 12;
          time12 = time12 + ":" + item.timeDetail[0].clockInTime.split(":")[1];
          return (
            <td>
              {item.timeDetail !== undefined && item.timeDetail.length > 0
                ? dateFormat(item.timeDetail[0].clockInDate, "mmmm d, yyyy") +
                  " " +
                  time12 +
                  " " +
                  timeConst
                : ""}
            </td>
          );
        },
        clockOut: (item) => {
          const timeConst =
            item.timeDetail !== undefined && item.timeDetail.length > 0
              ? Number(item.timeDetail[0].clockOutTime.split(":")[0]) >= 12
                ? "PM"
                : "AM"
              : "-";
          let time24 =
            item.timeDetail !== undefined && item.timeDetail.length > 0
              ? Number(item.timeDetail[0].clockOutTime.split(":")[0])
              : 0;
          let time12 = time24 % 12 || 12;
          time12 = time12 + ":" + item.timeDetail[0].clockOutTime.split(":")[1];
          return (
            <td>
              {item.timeDetail !== undefined && item.timeDetail.length > 0
                ? dateFormat(item.timeDetail[0].clockOutDate, "mmmm d, yyyy") +
                  " " +
                  time12 +
                  " " +
                  timeConst
                : ""}
            </td>
          );
        },
        employee: (item) => {
          return (
            <td>{item.employee !== undefined ? item.employee.name : ""}</td>
          );
        },
        store: (item) => {
          return <td>{item.store !== undefined ? item.store.name : ""}</td>;
        },
      }}
    />
  );
};

export default TimeCardDatatable;
