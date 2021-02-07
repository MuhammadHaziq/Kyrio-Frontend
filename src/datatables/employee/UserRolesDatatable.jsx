import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { useSelector, useDispatch } from "react-redux";
import { update_row_data } from "../../actions/employee/userRolesActions";
const UserRolesDatatable = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

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
    unselectable: [1],
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
      dispatch(update_row_data(row));
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
          dataField="role_id"
          dataSort={true}
          hidden={true}
          isKey={true}
        >
          Id
        </TableHeaderColumn>
        <TableHeaderColumn dataField="roleName" dataSort={true}>
          Role
        </TableHeaderColumn>
        <TableHeaderColumn dataField="access" dataSort={true}>
          Access
        </TableHeaderColumn>
        <TableHeaderColumn dataField="NoOfEmployees" dataSort={true}>
          Employees
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
};

export default UserRolesDatatable;
