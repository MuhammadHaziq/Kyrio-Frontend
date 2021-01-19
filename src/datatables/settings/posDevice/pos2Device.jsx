import React, { useState } from "react";
import { CFormGroup, CInputCheckbox } from "@coreui/react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_pos_single_select,
  toggle_pso_all_select,
  select_row_data_update,
} from "../../../actions/settings/posDeviceActions";
import { useDispatch, useSelector } from "react-redux";
import "../../../assets/css/all_datatables_light.css";
const PosDeviceDatatable = (props) => {
  const [checkAll, setCheckAll] = useState(false);

  const darkMode = useSelector((state) => state.settings.darkMode);
  const dispatch = useDispatch();

  /**
   *
   *  Datatable functions start
   *
   ***/
  // const getStoreName = (cell, row) => {
  //   return row.store.storeName;
  // };
  const GetStoreName = (props) => {
    return props.store.storeName;
  };
  // const status = (cell, row) => {
  //   return cell === false ? "Not activated" : "Activated";
  // };
  const Status = (props) => {
    return props.status === false ? "Not activated" : "Activated";
  };

  const onRowSelect = (row, isSelected, e) => {
    dispatch(toggle_pos_single_select(row));
  };

  // const onSelectAll = (isSelected, rows) => {
  //   if (isSelected) {
  //     dispatch(toggle_pso_all_select(true));
  //   } else {
  //     dispatch(toggle_pso_all_select(false));
  //   }
  // };

  // const selectRowProp = {
  //   mode: "checkbox",
  //   onSelect: onRowSelect,
  //   onSelectAll: onSelectAll,
  // };
  /**
   *
   *  Datatable functions End
   *
   ***/
  // const options = {
  //   sizePerPageList: [
  //     {
  //       text: "5",
  //       value: 5,
  //     },
  //     {
  //       text: "10",
  //       value: 10,
  //     },
  //     {
  //       text: "All",
  //       value: props.pos_devices.length,
  //     },
  //   ],
  //   sizePerPage: 5,
  //   onRowClick: function (row) {
  //     dispatch(select_row_data_update(row));
  //   },
  // };

  const posDeviceCheckAll = (checkAll) => {
    setCheckAll(!checkAll);
    dispatch(toggle_pso_all_select(!checkAll));
  };
  const posDeviceCheck = (item) => {
    dispatch(toggle_pos_single_select(item));
  };

  return (
    <React.Fragment>
      <table
        id="posDeviceDatatable"
        className="table table-bordered"
        style={{ width: "100%" }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: darkMode === true ? "" : "#fff",
            }}
          >
            <th style={{ width: "10px" }}>
              <CInputCheckbox
                name="posDevice"
                id={"posDevice" + 0}
                value={0}
                checked={checkAll}
                onChange={() => posDeviceCheckAll(checkAll)}
                style={{
                  width: " 20px",
                  height: " 17px",
                  display: "block",
                  position: "inherit",
                  marginLeft: "0px",
                }}
              />
            </th>
            <th>Name</th>
            <th>Store</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {(props.pos_devices || []).map((item, key) => (
            <tr
              style={{
                backgroundColor: darkMode === true ? "#181924" : "#fff",
              }}
              key={key}
            >
              <td>
                <CInputCheckbox
                  name="posDevice"
                  id={"posDevice" + item._id}
                  value={item._id}
                  checked={item.isDeleted}
                  onChange={() => posDeviceCheck(item)}
                  style={{
                    width: " 20px",
                    height: " 17px",
                    display: "block",
                    position: "inherit",
                    marginLeft: "8px",
                  }}
                />
              </td>
              <td>{item.title}</td>
              <td>
                <GetStoreName store={item.store} />
              </td>
              <td>
                <Status status={item.isActive} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*<BootstrapTable
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
          dataField="isActive"
          dataSort={true}
          dataFormat={status}
        >
          Status
        </TableHeaderColumn>
      </BootstrapTable>*/}
    </React.Fragment>
  );
};

export default PosDeviceDatatable;
