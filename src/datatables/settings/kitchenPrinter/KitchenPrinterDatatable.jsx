import React, { useState, useEffect } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_kitchen_printer_single_select,
  toggle_kitchen_printer_select_all,
} from "../../../actions/settings/kitchenPrinterActions";
import { useDispatch } from "react-redux";
const KitchenPrinterDatatable = (props) => {
  const dispatch = useDispatch();

  /**
   *
   *  Datatable functions start
   *
   ***/
  const getCategory = (cell, row) => {
    const categoryName = [];
    row.categories.map((item) => {
      return categoryName.push(item.categoryName);
    });
    return categoryName.join();
  };
  const onRowSelect = (row, isSelected, e) => {
    dispatch(toggle_kitchen_printer_single_select(row));
  };

  const onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      dispatch(toggle_kitchen_printer_select_all(true));
    } else {
      dispatch(toggle_kitchen_printer_select_all(false));
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
