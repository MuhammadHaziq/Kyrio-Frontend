import React, { useState } from "react";
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import moment from "moment";
import dateFormat from "dateformat";
const TimeCardDetailDatatable = (props) => {
  return (
    <CDataTable
      items={props.timeCard_detail}
      fields={[
        { key: "created_at", label: "Date", filter: true },
        { key: "event", label: "Event", filter: true },
        { key: "clockIn", label: "Clock in", filter: true },
        { key: "clockOut", label: "Clock out", filter: true },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      outlined
      pagination
      scopedSlots={{
        clockIn: (item) => {
          const timeConst =
            item !== undefined
              ? Number(item.clockInTime.split(":")[0]) >= 12
                ? "PM"
                : "AM"
              : "-";
          let time24 =
            item !== undefined ? Number(item.clockInTime.split(":")[0]) : 0;
          let time12 = time24 % 12 || 12;
          time12 = time12 + ":" + item.clockInTime.split(":")[1];
          return (
            <td>
              {item !== undefined
                ? dateFormat(item.clockInDate, "mmmm d, yyyy") +
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
            item !== undefined
              ? Number(item.clockOutTime.split(":")[0]) >= 12
                ? "PM"
                : "AM"
              : "-";
          let time24 =
            item !== undefined ? Number(item.clockOutTime.split(":")[0]) : 0;
          let time12 = time24 % 12 || 12;
          time12 = time12 + ":" + item.clockOutTime.split(":")[1];
          return (
            <td>
              {item !== undefined
                ? dateFormat(item.clockOutDate, "mmmm d, yyyy") +
                  " " +
                  time12 +
                  " " +
                  timeConst
                : ""}
            </td>
          );
        },
        created_at: (item) => {
          return <td>{dateFormat(item.created_at, "mmmm d, yyyy")}</td>;
        },
      }}
    />
  );
};

export default TimeCardDetailDatatable;
