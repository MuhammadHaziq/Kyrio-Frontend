import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";

import { useDispatch } from "react-redux";

const StoreDatatable = (props) => {
  const dispatch = useDispatch();

  const number_of_pos = (cell, row) => {
    return cell;
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
        value: props.stores.length,
      },
    ],
    sizePerPage: 5,
    onRowClick: function (row) {
      dispatch(get_store_row(row));
    },
  };
  return (
    <React.Fragment>
      <BootstrapTable
        data={props.stores}
        version="4"
        striped
        hover
        options={options}
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
        <TableHeaderColumn dataField="address">Address</TableHeaderColumn>
        <TableHeaderColumn
          dataField="devices"
          dataSort={true}
          dataFormat={number_of_pos}
        >
          Number Of Pos
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
};

export default StoreDatatable;
