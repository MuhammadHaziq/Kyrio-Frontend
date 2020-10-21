import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_category_single_select,
  toggle_category_all_select,
  select_row_data_update,
} from "../../actions/items/categoryActions";
import { useDispatch } from "react-redux";

const CategoryDatatable = (props) => {
  const dispatch = useDispatch();
  const categoryTitle = (cell, row) => {
    return (
      <React.Fragment>
        <svg height="40" width="35">
          <circle cx="15" cy="25" r="15" fill={row.catColor} />
          Sorry, your browser does not support inline SVG.
        </svg>
        {cell}
        <span>
          <small
            style={{
              display: "grid",
              marginLeft: "60px",
              marginTop: "-15px",
            }}
          >
            {row.total_items} {row.total_items > 1 ? "Items" : "Item"}
          </small>
        </span>
      </React.Fragment>
    );
  };

  const onRowSelect = (row, isSelected, e) => {
    dispatch(toggle_category_single_select(row));
  };

  const onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      dispatch(toggle_category_all_select(true));
    } else {
      dispatch(toggle_category_all_select(false));
    }
  };

  const selectRowProp = {
    mode: "checkbox",
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
        value: props.categories.length,
      },
    ],
    sizePerPage: 5,
    onRowClick: function (row) {
      console.log(row);
      dispatch(select_row_data_update(row));
    },
  };
  return (
    <React.Fragment>
      <BootstrapTable
        data={props.categories}
        version="4"
        hover
        selectRow={selectRowProp}
        options={options}
        pagination
        search
      >
        <TableHeaderColumn
          dataField="_id"
          dataSort={true}
          hidden={true}
          isKey={true}
        >
          Id
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="catTitle"
          dataSort={true}
          dataFormat={categoryTitle}
        >
          Name
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
};

export default CategoryDatatable;
