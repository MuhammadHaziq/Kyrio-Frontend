import React, { useState } from "react";
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import {
  toggle_pos_single_select,
  toggle_pso_all_select,
  select_row_data_update,
} from "../../../actions/settings/posDeviceActions";
import { useDispatch } from "react-redux";
const PosDeviceDatatable = (props) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const check = (e, item) => {
    dispatch(toggle_pos_single_select(item));
  };
  const clickRow = (item, index, column) => {
    if (column !== "select") {
      dispatch(select_row_data_update(item));
    }
  };

  const checkAll = (e, selectAll) => {
    setSelectAll(!selectAll);
    dispatch(toggle_pso_all_select(!selectAll));
  };
  return (
    <CDataTable
   itemsPerPageSelect
      items={props.pos_devices}
      fields={[
        {
          key: "select",
          label: "Select",
          filter: false,
          _style: { width: "5%" },
        },
        { key: "title", label: "Name", filter: false },
        { key: "store", label: "Store", filter: false },
        { key: "udid", label: "UDID", filter: false },
        { key: "status", label: "Status", filter: false },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      outlined
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
                />
                <CLabel
                  variant="custom-checkbox"
                  htmlFor={`checkbox${item._id}`}
                />
              </CFormGroup>
            </td>
          );
        },
        store: (item) => {
          return <td>{item?.store?.title}</td>;
        },
        udid: (item) => {
          return (
            <td>
              {item.udid == "" ||
              item.udid == null ||
              typeof item.udid == "undefined"
                ? "Not Set"
                : item.udid}
            </td>
          );
        },
        status: (item) => {
          return (
            <td>{item.isActive === false ? "Not activated" : "Activated"}</td>
          );
        },
      }}
    />
  );
};

export default PosDeviceDatatable;
