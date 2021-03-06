import React, { useState } from "react";
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
} from "@coreui/react";
import {
  toggle_item_single_select,
  toggle_item_all_select,
  update_row_data,
} from "../../actions/items/itemActions";
import { useDispatch } from "react-redux";
const ItemListNewDatatable = (props) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const usersData = props.itemList.map((item, id) => {
    const _selected = selected.includes(id);
    return {
      ...item,
      id,
      _selected,
      _classes: [item._classes, _selected && "table-selected"],
    };
  });

  const check = (e, item) => {
    // if (e.target.checked) {
    //   setSelected([...selected, id]);
    // } else {
    //   setSelected(selected.filter((itemId) => itemId !== id));
    // }
    dispatch(toggle_item_single_select(item));
  };
  const clickRow = (item, index, column) => {
    if (column !== "select") {
      dispatch(update_row_data(item));
      console.log("item", item);
    }
  };

  return (
    <CDataTable
      items={props.itemList}
      fields={[
        { key: "select", label: "", filter: false },
        { key: "name", label: "Name", filter: true },
        { key: "categoryName", label: "Category", filter: true },
        { key: "price", label: "Price", filter: true },
        { key: "cost", label: "Cost", filter: true },
        { key: "margin", label: "Margin %", filter: true },
        { key: "stockQty", label: "Stock", filter: true },
      ]}
      itemsPerPage={10}
      columnFilter
      sorter
      hover
      pagination
      clickableRows
      onRowClick={clickRow}
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
        categoryName: (item) => {
          return (
            <td>
              {item.category !== undefined && item.category !== null
                ? item.category.name || ""
                : ""}
            </td>
          );
        },
        price: (item) => {
          return (
            <td>
              {item.price !== undefined && item.price !== null
                ? item.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        cost: (item) => {
          return (
            <td>
              {item.cost !== undefined && item.cost !== null
                ? item.cost.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                : "$ 0.00"}
            </td>
          );
        },
        margin: (item) => {
          const price =
            item.price !== undefined && item.price !== null ? item.price : 0;
          const cost =
            item.cost !== undefined && item.cost !== null ? item.cost : 0;
          if (+cost === +price) {
            return <td>{"0 %"}</td>;
          } else {
            const margin = +price === 0 ? +cost * 100 : (+cost / +price) * 100;
            return <td>{margin.toFixed(2) + " %"}</td>;
          }
        },
        stockQty: (item) => {
          if (typeof item.stores !== "undefined" && item.stores.length > 0) {
            let stocks = item.stores.map((item) => {
              return +item.inStock || 0;
            });
            stocks = stocks.reduce((a, b) => {
              return b + a;
            });
            if (stocks !== undefined || stocks !== null || stocks !== 0) {
              return <td>{stocks}</td>;
            } else {
              return <td>{item.stockQty}</td>;
            }
          } else {
            return <td>{item.stockQty}</td>;
          }
        },
      }}
    />
  );
};

export default ItemListNewDatatable;
