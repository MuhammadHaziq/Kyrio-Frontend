import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_discount_single_select,
  toggle_discount_all_select,
  select_row_data_update,
} from "../../actions/items/discountActions";
import { useSelector, useDispatch } from "react-redux";

const ItemsListDatatable = (props) => {
  const dispatch = useDispatch();

  const showValue = (cell, row) => {
    return row.type.toUpperCase() === "amount".toUpperCase()
      ? row.value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : row.value.toFixed(2) + " %";
  };
  const onRowSelect = (row, isSelected, e) => {
    dispatch(toggle_discount_single_select(row));
  };

  const onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      dispatch(toggle_discount_all_select(true));
    } else {
      dispatch(toggle_discount_all_select(false));
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
        value: props.discount.length,
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
        data={props.discount}
        version="4"
        hover={true}
        selectRow={selectRowProp}
        options={options}
        pagination={true}
        search={true}
      >
        <TableHeaderColumn
          dataField="_id"
          dataSort={true}
          hidden={true}
          isKey={true}
        >
          Id
        </TableHeaderColumn>
        <TableHeaderColumn dataField="title" dataSort={true}>
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="value" dataFormat={showValue}>
          Value
        </TableHeaderColumn>
        <TableHeaderColumn dataField="restricted" dataSort={true}>
          Restricted access
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
};

export default ItemsListDatatable;
