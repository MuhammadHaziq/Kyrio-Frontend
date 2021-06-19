import React, { useState } from "react";
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import {
  toggle_employee_single_select,
  toggle_employee_all_select,
  update_row_data,
} from "../../actions/employee/employeeListActions";
import { useDispatch } from "react-redux";
const EmployeeListDatatable = (props) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const check = (e, item) => {
    dispatch(toggle_employee_single_select(item));
  };
  const clickRow = (item, index, column) => {
    if (column !== "select") {
      dispatch(update_row_data(item));
    }
  };

  const checkAll = (e, selectAll) => {
    setSelectAll(!selectAll);
    dispatch(toggle_employee_all_select(!selectAll));
  };
  return (
    <CDataTable
      items={props.employee_list}
      fields={[
        {
          key: "select",
          label: "Select",
          filter: false,
          _style: { width: "5%" },
        },
        { key: "name", label: "Name", filter: true },
        { key: "email", label: "Email", filter: true },
        { key: "phone", label: "Phone", filter: true },
        { key: "role", label: "Role", filter: true },
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
                      ? item.role["title"] !== undefined &&
                        item.role["title"] !== null
                        ? item.role["title"].toUpperCase() == "OWNER"
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
        email: (item) => {
          return (
            <td>
              {item.email !== undefined && item.email !== null
                ? item.email || "-"
                : "-"}
            </td>
          );
        },
        phone: (item) => {
          return (
            <td>
              {item.phone !== undefined && item.phone !== null
                ? item.phone || "-"
                : "-"}
            </td>
          );
        },
        role: (item) => {
          return (
            <td>
              {item.role !== undefined
                ? item.role["title"] !== undefined && item.role["title"] !== null
                  ? item.role["title"] || "-"
                  : "-"
                : "-"}
            </td>
          );
        },
      }}
    />
  );
};

export default EmployeeListDatatable;
