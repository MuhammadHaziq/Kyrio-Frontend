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

const taxOption = (cell, row) => {
  console.log(cell);
  const taxOption = cell !== undefined ? cell.title : cell;
  if (
    taxOption == "Apply the tax to the new items" ||
    taxOption == "Apply the tax to all new and existing items"
  ) {
    return "Yes";
  } else {
    return "No";
  }
};

const taxRate = (cell, row) => {
  return cell.toLocaleString("en-US") + " %";
};
const TaxesDatatable = (props) => {
  return (
    <React.Fragment>
      <CCard>
        <CCardHeader>Taxes Detail</CCardHeader>
        <CCardBody>
          <BootstrapTable
            data={props.taxes}
            version="4"
            striped="striped"
            hover="hover"
            pagination="pagination"
            search="search"
          >
            <TableHeaderColumn
              dataField="_id"
              isKey="isKey"
              dataSort="dataSort"
              hidden="hidden"
            >
              Id
            </TableHeaderColumn>
            <TableHeaderColumn dataField="title" dataSort="dataSort">
              Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField="tax_option" dataFormat={taxOption}>
              Apply to new items
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="tax_rate"
              dataSort="dataSort"
              dataFormat={taxRate}
            >
              Tax rate
            </TableHeaderColumn>
          </BootstrapTable>
        </CCardBody>
      </CCard>
    </React.Fragment>
  );
};

export default TaxesDatatable;
