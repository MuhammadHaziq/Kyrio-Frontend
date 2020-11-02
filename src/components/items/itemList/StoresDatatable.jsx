import React, { useState, useEffect } from "react";
import { CInputCheckbox, CRow, CCol, CFormGroup, CLabel } from "@coreui/react";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_select_all_item_stores,
  toggle_select_single_item_store,
  set_item_store_price,
} from "../../../actions/items/itemActions";
import { useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
const Price = (props) => {
  const dispatch = useDispatch();

  const [storePrice, setStorePrice] = useState(props.item.price);
  useEffect(() => {
    if (props.item.price !== null && props.item.price !== undefined) {
      setStorePrice(props.item.price);
    }
  }, [props.item]);

  const handleOnChange = (e) => {
    setStorePrice(e.target.value);
  };
  const handleOnBlur = (e) => {
    dispatch(set_item_store_price(props.item._id, storePrice));
  };
  return (
    <NumberFormat
      id="price"
      name="price"
      placeholder="Price"
      value={storePrice}
      className="form-control"
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      thousandSeparator={true}
      decimalScale={2}
      fixedDecimalScale={true}
    />
  );
};

const CheckAvailablity = (props) => {
  const dispatch = useDispatch();
  const [storeId, setStoreId] = useState(props.item._id);
  const [isSelected, setIsSelected] = useState(props.item.isSelected);
  useEffect(() => {
    if (props.item !== null && props.item !== undefined) {
      setIsSelected(props.item.isSelected);
      setStoreId(props.item._id);
    }
  }, [props.item]);

  const changeCheckAvailablity = (id) => (e) => {
    setIsSelected(!isSelected);
    dispatch(toggle_select_single_item_store(id));
  };
  return (
    <CInputCheckbox
      name="itemAvailable"
      id={"itemAvailable" + storeId}
      value={storeId}
      checked={isSelected}
      style={{ marginLeft: "15px" }}
      onChange={changeCheckAvailablity(storeId)}
    />
  );
};
const StoresDatatable = (props) => {
  const [fields, setFields] = useState({
    checkAll: true,
  });
  const dispatch = useDispatch();
  console.log(props);
  const hanldeOnChangeCheck = (e) => {
    setFields({
      ...fields,
      checkAll: !fields.checkAll,
    });
    dispatch(toggle_select_all_item_stores(!fields.checkAll));
  };
  return (
    <React.Fragment>
      <CRow>
        <CCol md="12">
          <CFormGroup variant="custom-checkbox" inline>
            <CInputCheckbox
              custom
              name="checkAll"
              id={"checkAll"}
              value={0}
              checked={fields.checkAll}
              onChange={hanldeOnChangeCheck}
            />
            <CLabel variant="custom-checkbox" htmlFor={"checkAll"}>
              The item is available for sale in all stores
            </CLabel>
          </CFormGroup>
        </CCol>
      </CRow>
      <CRow>
        <table className="table">
          <thead>
            <th>Available</th>
            <th>Store</th>
            <th>Price</th>
          </thead>
          <tbody>
            {(props.stores || []).map((item) => (
              <tr>
                <td>
                  <CheckAvailablity item={item} />
                </td>
                <td>{item.title}</td>
                <td>
                  <Price item={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CRow>
    </React.Fragment>
  );
};

export default StoresDatatable;
