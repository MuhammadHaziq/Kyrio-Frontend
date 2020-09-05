import React, { useState, useEffect } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  CRow,
  CCol,
  CCard,
  CSelect,
  CCardHeader,
  CCardBody,
  CButton,
  CFormGroup,
  CInput,
} from "@coreui/react";

const getStoreName = (cell, row) => {
  const storeNames = [];
  // const storeName = row.store.map(item => {
  //   return storeNames.push(item.storeName)
  // })
  return row.store.storeName;
};
const PosDeviceDatatable = (props) => {
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
  };
  return (
    <React.Fragment>
      <CCard>
        <CCardHeader>Pos Devices Detail</CCardHeader>
        <CCardBody>
          <BootstrapTable
            data={props.pos_devices}
            version="4"
            striped
            hover
            pagination
            search
            option={options}
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
            <TableHeaderColumn dataField="isActive" dataSort={true}>
              Status
            </TableHeaderColumn>
          </BootstrapTable>
        </CCardBody>
      </CCard>
    </React.Fragment>
  );
};

export default PosDeviceDatatable;
