import React, { useState, useEffect } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { CCard, CCardHeader, CCardBody } from "@coreui/react";
const showCategory = (cell, row) => {
  return row.category ? row.category.name || "" : "";
};
const showMargin = (cell, row) => {
  const margin = (+row.cost / +row.price) * 100;
  return margin + " %";
};
const showPrice = (cell, row) => {
  return row.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
const showCost = (cell, row) => {
  return row.cost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
const ItemsListDatatable = (props) => {
  return (
    <React.Fragment>
      <CCard>
        <CCardHeader>Item List Detail</CCardHeader>
        <CCardBody>
          <BootstrapTable
            data={props.itemList}
            version="4"
            striped="striped"
            hover="hover"
            pagination="pagination"
            search="search"
          >
            <TableHeaderColumn
              dataField="createdAt"
              dataSort="dataSort"
              hidden="hidden"
            >
              Created Date
            </TableHeaderColumn>
            <TableHeaderColumn dataField="name" dataSort="dataSort">
              Name
            </TableHeaderColumn>
            <TableHeaderColumn
              isKey="isKey"
              dataField="name"
              dataFormat={showCategory}
            >
              Category
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="price"
              dataSort="dataSort"
              dataFormat={showPrice}
            >
              Price
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="cost"
              dataSort="dataSort"
              dataFormat={showCost}
            >
              Cost
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="margin"
              dataSort="dataSort"
              dataFormat={showMargin}
            >
              Margin %
            </TableHeaderColumn>
            <TableHeaderColumn dataField="stockQty" dataSort="dataSort">
              Stock
            </TableHeaderColumn>
          </BootstrapTable>
        </CCardBody>
      </CCard>
    </React.Fragment>
  );
};

export default ItemsListDatatable;
