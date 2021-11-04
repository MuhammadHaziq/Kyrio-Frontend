import React, { useState } from "react";
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import {
  toggle_kitchen_printer_single_select,
  toggle_kitchen_printer_select_all,
  select_update_row,
} from "../../../actions/settings/kitchenPrinterActions";
import { useDispatch } from "react-redux";
const KitchenPrinterDatatable = (props) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const check = (e, item) => {
    dispatch(toggle_kitchen_printer_single_select(item));
  };
  const clickRow = (item, index, column) => {
    if (column !== "select") {
      dispatch(select_update_row(item));
    }
  };

  const checkAll = (e, selectAll) => {
    setSelectAll(!selectAll);
    dispatch(toggle_kitchen_printer_select_all(!selectAll));
  };
  return (
    <CDataTable
   itemsPerPageSelect
      items={props.kitchen_printer_list}
      fields={[
        {
          key: "select",
          label: "Select",
          filter: false,
          _style: { width: "5%" },
        },
        { key: "title", label: "Name", filter: false },
        { key: "categories", label: "Categories", filter: false },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      outlined
      pagination
      clickableRows
      onRowClick={clickRow}
      columnHeaderSlot={{
        select: [
          <CFormGroup variant="custom-checkbox">
            <CInputCheckbox
              custom
              id={`checkbox`}
              onClick={(e) => checkAll(e, selectAll)}
            />
            <CLabel variant="custom-checkbox" htmlFor={`checkbox`} />
          </CFormGroup>,
        ],
      }}
      scopedSlots={{
        select: (item) => {
          return (
            <td>
              <CFormGroup variant="custom-checkbox">
                <CInputCheckbox
                  custom
                  id={`checkbox${item._id}`}
                  checked={item.isDeleted}
                  onChange={(e) => check(e, item)}
                />
                <CLabel
                  variant="custom-checkbox"
                  htmlFor={`checkbox${item._id}`}
                />
              </CFormGroup>
            </td>
          );
        },
        categories: (item) => {
          // const categoryName = [];
          // item.categories.map((cat) => {
          //   return categoryName.push(cat.title);
          // });
          return <td>{item.categories.map(function(cat){
              return cat.title;
            }).join(",")}</td>;
        },
      }}
    />
  );
};

export default KitchenPrinterDatatable;
