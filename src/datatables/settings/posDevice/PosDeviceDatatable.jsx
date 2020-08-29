import React, {useState, useEffect} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import {
  CRow,
  CCol,
  CCard,
  CSelect,
  CCardHeader,
  CCardBody,
  CButton,
  CFormGroup,
  CInput
} from "@coreui/react";

const getStoreName = (cell, row) => {
  const storeNames = []
  const storeName = row.store.map(item => {
    return storeNames.push(item.storeName)
  })
  return storeNames
}
const PosDeviceDatatable = (props) => {
  return (<React.Fragment>
    <CCard>
      <CCardHeader>
        Pos Devices Detail
      </CCardHeader>
      <CCardBody>
        <BootstrapTable data={props.pos_devices} version="4" striped="striped" hover="hover" pagination="pagination" search="search">
          <TableHeaderColumn dataField="_id" isKey="isKey" dataSort="dataSort" hidden="hidden">Id</TableHeaderColumn>
          <TableHeaderColumn dataField="title" dataSort="dataSort">Name</TableHeaderColumn>
          <TableHeaderColumn dataField="storeName" dataSort="dataSort" dataFormat={getStoreName}>Store</TableHeaderColumn>
          <TableHeaderColumn dataField="isActive" dataSort="dataSort">Status</TableHeaderColumn>

        </BootstrapTable>
      </CCardBody>
    </CCard>
  </React.Fragment>);
}

export default PosDeviceDatatable
