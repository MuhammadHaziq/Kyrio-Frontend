import React, { useState } from "react";
import { CDataTable, CInputCheckbox, CFormGroup, CLabel } from "@coreui/react";
import {
  toggle_discount_single_select,
  toggle_discount_all_select,
  select_row_data_update,
} from "../../actions/items/discountActions";
import { useDispatch } from "react-redux";
import Amount from "../../components/utils/Amount";

const DiscountDatatable = (props) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const check = (e, item) => {
    // if (e.target.checked) {
    //   setSelected([...selected, id]);
    // } else {
    //   setSelected(selected.filter((itemId) => itemId !== id));
    // }
    dispatch(toggle_discount_single_select(item));
  };
  const clickRow = (item, index, column) => {
    if (column !== "select") {
      dispatch(select_row_data_update(item));
    }
  };

  const checkAll = (e, selectAll) => {
    setSelectAll(!selectAll);
    dispatch(toggle_discount_all_select(!selectAll));
  };
  return (
    <CDataTable
   itemsPerPageSelect
      items={props.discount}
      fields={[
        {
          key: "select",
          label: "Select",
          filter: false,
          _style: { width: "5%" },
        },
        { key: "title", label: "Name", filter: true },
        { key: "value", label: "Value", filter: true },
        { key: "restricted", label: "Restricted Access", filter: true },
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
        value: (item) => {
          return (
            <td>
              {item.value !== undefined &&
              item.value !== null &&
              item.value !== ""
                ? item.type.toUpperCase() === "amount".toUpperCase()
                  ? <Amount value={item.value} />
                  : <Amount value={item.value} sign="%" />
                : item.type.toUpperCase() === "amount".toUpperCase()
                ? "Variable, Σ"
                : "Variable, %"}
            </td>
          );
        },
        restricted: (item) => {
          return <td>{item.restricted === true ? "Yes" : "No"}</td>;
        },
      }}
    />
  );
};

export default DiscountDatatable;
