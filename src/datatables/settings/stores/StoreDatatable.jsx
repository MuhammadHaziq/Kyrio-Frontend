import React, { useState } from "react";
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import { get_store_row } from "../../../actions/settings/storeActions";

import { useDispatch } from "react-redux";
const StoreDatatable = (props) => {
  const dispatch = useDispatch();

  const clickRow = (item, index, column) => {
    if (column !== "select") {
      dispatch(get_store_row(item));
    }
  };

  return (
    <CDataTable
      items={props.stores}
      fields={[
        { key: "title", label: "Name", filter: false },
        { key: "address", label: "Address", filter: false },
        { key: "devices", label: "Number Of Pos", filter: false },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      outlined
      pagination
      clickableRows
      onRowClick={clickRow}
      scopedSlots={{
        devices: (item) => {
          return <td>{item.devices || 0}</td>;
        },
        address: (item) => {
          return <td>{item.address || ""}</td>;
        },
      }}
    />
  );
};

export default StoreDatatable;
