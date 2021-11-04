import React, { useState } from "react";
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
const TotalHoursWorkedDatatable = (props) => {
  return (
    <CDataTable
   itemsPerPageSelect
      items={props.total_working_hours}
      fields={[
        { key: "employeeName", label: "Employee", filter: true },
        { key: "storeName", label: "Store", filter: true },
        { key: "totalWorkingHour", label: "Total Hour", filter: true },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      outlined
      pagination
    />
  );
};

export default TotalHoursWorkedDatatable;
