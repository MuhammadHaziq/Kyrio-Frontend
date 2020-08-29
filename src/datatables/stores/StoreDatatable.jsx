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

const StoreDatatable = (props) => {
  return (<React.Fragment>
    <CCard>
      <CCardHeader>
            Stores Detail
      </CCardHeader>
      <CCardBody>
        <BootstrapTable data={props.stores} version="4" striped="striped" hover="hover" pagination="pagination" search="search">
          <TableHeaderColumn dataField="_id" dataSort="dataSort" hidden="hidden">Id</TableHeaderColumn>
          <TableHeaderColumn dataField="title" dataSort="dataSort">Name</TableHeaderColumn>
          <TableHeaderColumn isKey="isKey" dataField="address">Address</TableHeaderColumn>
          <TableHeaderColumn dataField="pos" dataSort="dataSort" >Number Of Pos</TableHeaderColumn>

        </BootstrapTable>
      </CCardBody>
    </CCard>
  </React.Fragment>);
}

export default StoreDatatable
