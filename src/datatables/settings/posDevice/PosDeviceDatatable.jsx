import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_pos_single_select,
  toggle_pso_all_select,
  select_row_data_update,
} from "../../../actions/settings/posDeviceActions";
import { useDispatch } from "react-redux";

const PosDeviceDatatable = (props) => {
  const dispatch = useDispatch();
  /**
   *
   *  Datatable functions start
   *
   ***/
  const getStoreName = (cell, row) => {
    return row.store.storeName;
  };
  const setUdid = (cell, row) => {
    return cell == "" || cell == null || typeof cell == "undefined" ? "Not Set" : cell;
  };
  const status = (cell, row) => {
    return cell === false ? "Not activated" : "Activated";
  };

  const onRowSelect = (row, isSelected, e) => {
    dispatch(toggle_pos_single_select(row));
  };

  const onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      dispatch(toggle_pso_all_select(true));
    } else {
      dispatch(toggle_pso_all_select(false));
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
        value: props.pos_devices.length,
      },
    ],
    sizePerPage: 5,
    onRowClick: function (row) {
      dispatch(select_row_data_update(row));
    },
  };
  return (
    <React.Fragment>
      <BootstrapTable
        data={props.pos_devices}
        version="4"
        striped
        hover
        selectRow={selectRowProp}
        options={options}
      >
        <TableHeaderColumn
          dataField="_id"
          isKey={true}
          dataSort={true}
          hidden={true}
        >
          Id
        </TableHeaderColumn>
        <TableHeaderColumn dataField="title" dataSort={true}>
          Name
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="storeName"
          dataSort={true}
          dataFormat={getStoreName}
        >
          Store
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="udid"
          dataSort={true}
          dataFormat={setUdid}
        >
          UDID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="isActive"
          dataSort={true}
          dataFormat={status}
        >
          Status
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
};

export default PosDeviceDatatable;
