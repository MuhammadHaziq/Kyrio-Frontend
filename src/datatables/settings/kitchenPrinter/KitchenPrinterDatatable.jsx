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

const KitchenPrinterDatatable = (props) => {
  const getCategory = (cell, row) => {
    const categoryName = [];
    row.categories.map((item) => {
      categoryName.push(item.categoryName);
    });
    return categoryName.join();
  };
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
        value: props.kitchen_printer_list.length,
      },
    ],
    sizePerPage: 5,
  };
  return (
    <React.Fragment>
      <BootstrapTable
        data={props.kitchen_printer_list}
        version="4"
        striped
        hover
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
        <TableHeaderColumn dataField="name" dataSort={true}>
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="categories" dataFormat={getCategory}>
          Categories
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
};

export default KitchenPrinterDatatable;
