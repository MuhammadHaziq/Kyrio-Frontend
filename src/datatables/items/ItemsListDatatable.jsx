import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_item_single_select,
  toggle_item_all_select,
  update_row_data,
} from "../../actions/items/itemActions";
import { useDispatch } from "react-redux";

const ItemsListDatatable = (props) => {
  const dispatch = useDispatch();

  const showCategory = (cell, row) => {
    return row.category !== undefined && row.category !== null
      ? row.category.name || ""
      : "";
  };
  const showMargin = (cell, row) => {
    const price = row.price !== undefined && row.price !== null ? row.price : 0;
    const cost = row.cost !== undefined && row.cost !== null ? row.cost : 0;
    if (+cost === +price) {
      return "0 %";
    } else {
      const margin = +price === 0 ? +cost * 100 : (+cost / +price) * 100;
      return margin.toFixed(2) + " %";
    }
  };
  const showPrice = (cell, row) => {
    return row.price !== undefined && row.price !== null
      ? row.price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "$ 0.00";
  };
  const showCost = (cell, row) => {
    return row.cost !== undefined && row.cost !== null
      ? row.cost.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : "$ 0.00";
  };

  const showStock = (cell, row) => {
    if (typeof row.stores !== "undefined" && row.stores.length > 0) {
      let stocks = row.stores.map((item) => {
        return +item.inStock || 0;
      });
      stocks = stocks.reduce((a, b) => {
        return b + a;
      });

      return stocks;
    } else {
      return row.stockQty;
    }
  };
  const onRowSelect = (row, isSelected, e) => {
    dispatch(toggle_item_single_select(row));
  };

  const onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      dispatch(toggle_item_all_select(true));
    } else {
      dispatch(toggle_item_all_select(false));
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
      dispatch(update_row_data(row));
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
        <TableHeaderColumn
          dataField="stock"
          dataSort={true}
          dataFormat={showStock}
        >
          Stock
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
};

export default ItemsListDatatable;
