import React, { useState } from "react";
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import {
  toggle_category_single_select,
  toggle_category_all_select,
  select_row_data_update,
} from "../../actions/items/categoryActions";
import { useDispatch } from "react-redux";
const CategoryDatatable = (props) => {
  const dispatch = useDispatch();

  const [selectAll, setSelectAll] = useState(false);

  const check = (e, item) => {
    dispatch(toggle_category_single_select(item));
  };
  const clickRow = (item, index, column) => {
    if (column !== "select") {
      dispatch(select_row_data_update(item));
    }
  };

  const checkAll = (e, selectAll) => {
    setSelectAll(!selectAll);
    dispatch(toggle_category_all_select(!selectAll));
  };
  return (
    <CDataTable
      itemsPerPageSelect
      items={props.categories}
      fields={[
        {
          key: "select",
          label: "Select",
          filter: false,
          _style: { width: "5%" },
        },
        { key: "title", label: "Name", filter: true },
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
        title: (item) => {
          return (
            <td>
              <svg height="40" width="35">
                <circle cx="15" cy="25" r="15" fill={item.color} />
                Sorry, your browser does not support inline SVG.
              </svg>
              {item.title}
              <span>
                <small
                  style={{
                    display: "grid",
                    marginLeft: "37px",
                    marginTop: "-15px",
                  }}
                >
                  {item.total_items || 0}{" "}
                  {item.total_items > 1 ? "Items" : "Item"}
                </small>
              </span>
            </td>
          );
        },
      }}
    />
  );
};

export default CategoryDatatable;
;
