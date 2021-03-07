import React, { useState } from "react";
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import {
  toggle_select_single,
  toggle_select_all,
  update_row_data_tax,
} from "../../../actions/settings/taxesActions";
import { useDispatch } from "react-redux";
const TaxesDatatable = (props) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const check = (e, item) => {
    dispatch(toggle_select_single(item));
  };
  const clickRow = (item, index, column) => {
    if (column !== "select") {
      dispatch(update_row_data_tax(item));
    }
  };

  const checkAll = (e, selectAll) => {
    setSelectAll(!selectAll);
    dispatch(toggle_select_all(!selectAll));
  };
  return (
    <CDataTable
      items={props.taxes}
      fields={[
        {
          key: "select",
          label: "Select",
          filter: false,
          _style: { width: "5%" },
        },
        { key: "title", label: "Name", filter: false },
        { key: "tax_option", label: "Apply to new items", filter: false },
        { key: "tax_rate", label: "Tax rates", filter: false },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
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
        tax_option: (item) => {
          const taxOption = item !== undefined ? item.title : item;
          if (
            taxOption === "Apply the tax to the new items" ||
            taxOption === "Apply the tax to all new and existing items"
          ) {
            return <td>{"Yes"}</td>;
          } else {
            return <td>{"No"}</td>;
          }
        },
        tax_rate: (item) => {
          return <td>{(item.tax_rate || 0) + " %"}</td>;
        },
      }}
    />
  );
};

export default TaxesDatatable;
