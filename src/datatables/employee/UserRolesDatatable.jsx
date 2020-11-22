import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";

const UserRolesDatatable = (props) => {
  const AccessModules = (cell, row) => {
    const backOffice = row.allowBackoffice.enable === true ? "Back office" : "";
    const pos = row.allowPOS.enable === true ? "POS" : "";
    if (backOffice === "" && pos === "") {
      return "";
    } else if (backOffice !== "" && pos !== "") {
      return backOffice + " And " + pos;
    } else if (backOffice !== "") {
      return backOffice;
    } else {
      return pos;
    }
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
        value: props.user_roles.length,
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
        data={props.user_roles}
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
        <TableHeaderColumn dataField="roleName" dataSort={true}>
          Role
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="access"
          dataSort={true}
          dataFormat={AccessModules}
        >
          Access
        </TableHeaderColumn>
        <TableHeaderColumn dataField="employees" dataSort={true}>
          Employees
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
};

export default UserRolesDatatable;
