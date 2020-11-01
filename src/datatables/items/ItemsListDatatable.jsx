import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_item_single_select,
  toggle_item_all_select,
} from "../../actions/items/itemActions";
import { useSelector, useDispatch } from "react-redux";

const ItemsListDatatable = (props) => {
  const dispatch = useDispatch();

  const showCategory = (cell, row) => {
    return row.category ? row.category.name || "" : "";
  };
  const showMargin = (cell, row) => {
    if (+row.cost === +row.price) {
      return "0 %";
    } else {
      const margin = (+row.cost / +row.price) * 100;
      return margin + " %";
    }
  };
  const showPrice = (cell, row) => {
    return row.price !== null
      ? row.price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "$ 0.00";
  };
  const showCost = (cell, row) => {
    return row.cost !== null
      ? row.cost.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "$ 0.00";
  };
  const onRowSelect = (row, isSelected, e) => {
    dispatch(toggle_item_single_select(row));
    console.log(row);
  };

  const onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      dispatch(toggle_item_all_select(true));
      console.log(true);
    } else {
      dispatch(toggle_item_all_select(false));
      console.log(false);
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
        value: props.itemList.length,
      },
    ],
    sizePerPage: 5,
    onRowClick: function (row) {
      console.log(row);
      // dispatch(select_row_data_update(row));
    },
  };
  return (
    <React.Fragment>
      <BootstrapTable
        data={props.itemList}
        version="4"
        hover={true}
        selectRow={selectRowProp}
        options={options}
        pagination={true}
      >
        <TableHeaderColumn
          dataField="_id"
          dataSort={true}
          hidden={true}
          isKey={true}
        >
          Id
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name" dataSort={true}>
          Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name" dataFormat={showCategory}>
          Category
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="price"
          dataSort={true}
          dataFormat={showPrice}
        >
          Price
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="cost"
          dataSort={true}
          dataFormat={showCost}
        >
          Cost
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="margin"
          dataSort={true}
          dataFormat={showMargin}
        >
          Margin %
        </TableHeaderColumn>
        <TableHeaderColumn dataField="stockQty" dataSort={true}>
          Stock
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
};

export default ItemsListDatatable;
