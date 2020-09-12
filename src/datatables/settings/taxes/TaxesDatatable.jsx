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
import { useDispatch } from "react-redux";
import {
  toggle_select_single,
  toggle_select_all,
} from "../../../actions/settings/taxesActions";

const TaxesDatatable = (props) => {
  const dispatch = useDispatch();
  /**
   *
   *  Datatable functions start
   *
   ***/
  const taxOption = (cell, row) => {
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

  const onRowSelect = (row, isSelected, e) => {
    dispatch(toggle_select_single(row));
  };

  const onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      dispatch(toggle_select_all(true));
    } else {
      dispatch(toggle_select_all(false));
    }
  };

  const selectRowProp = {
    mode: "checkbox",
    clickToSelect: true,
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
        value: props.taxes.length,
      },
    ],
    sizePerPage: 5,
  };
  return (
    <React.Fragment>
      <CCard>
        <CCardHeader>Taxes Detail</CCardHeader>
        <CCardBody>
          <BootstrapTable
            data={props.taxes}
            version="4"
            striped
            hover
            pagination
            search
            selectRow={selectRowProp}
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
            <TableHeaderColumn dataField="tax_option" dataFormat={taxOption}>
              Apply to new items
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="tax_rate"
              dataSort={true}
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
