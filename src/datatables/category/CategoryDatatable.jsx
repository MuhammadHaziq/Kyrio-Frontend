import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { CCardBody } from "@coreui/react";
const CategoryDatatable = (props) => {
  const onRowSelect = (row, isSelected, e) => {
    console.log(row);
  };

  const onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      console.log(true);
    } else {
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
        value: props.categories.length,
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
      <CCardBody>
        <BootstrapTable
          data={props.categories}
          version="4"
          striped
          hover
          selectRow={selectRowProp}
          options={options}
          pagination="pagination"
          search="search"
        >
          <TableHeaderColumn
            dataField="createdAt"
            dataSort="dataSort"
            hidden={true}
            isKey={true}
          >
            Created Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="catTitle" dataSort="dataSort">
            Name
          </TableHeaderColumn>
        </BootstrapTable>
      </CCardBody>
    </React.Fragment>
  );
};

export default CategoryDatatable;
