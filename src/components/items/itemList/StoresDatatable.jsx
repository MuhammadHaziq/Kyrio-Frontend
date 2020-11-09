import React, { useState, useEffect } from "react";
import { CInputCheckbox, CRow, CCol, CFormGroup, CLabel } from "@coreui/react";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_select_all_item_stores,
  toggle_select_single_item_store,
  set_item_store_values,
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
    dispatch(set_item_store_values("Price", props.item.id, storePrice));
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

const InStock = (props) => {
  const dispatch = useDispatch();

  const [storeStock, setStoreStock] = useState(props.item.inStock);
  useEffect(() => {
    if (props.item.inStock !== null && props.item.inStock !== undefined) {
      setStoreStock(props.item.inStock);
    }
  }, [props.item]);

  const handleOnChange = (e) => {
    setStoreStock(e.target.value);
  };
  const handleOnBlur = (e) => {
    dispatch(set_item_store_values("InStock", props.item.id, storeStock));
  };
  return (
    <NumberFormat
      id="InStock"
      name="InStock"
      placeholder="In Srock"
      value={storeStock}
      className="form-control"
      onChange={handleOnChange}
      onBlur={handleOnBlur}
    />
  );
};
const LowStock = (props) => {
  const dispatch = useDispatch();

  const [storeLowStock, setStoreLowStock] = useState(props.item.lowStock);
  useEffect(() => {
    if (props.item.lowStock !== null && props.item.lowStock !== undefined) {
      setStoreLowStock(props.item.lowStock);
    }
  }, [props.item]);

  const handleOnChange = (e) => {
    setStoreLowStock(e.target.value);
  };
  const handleOnBlur = (e) => {
    dispatch(set_item_store_values("LowStock", props.item.id, storeLowStock));
  };
  return (
    <NumberFormat
      id="LowStock"
      name="LowStock"
      placeholder="Low Stock"
      value={storeLowStock}
      className="form-control"
      onChange={handleOnChange}
      onBlur={handleOnBlur}
    />
  );
};
const CheckAvailablity = (props) => {
  const dispatch = useDispatch();
  const [storeId, setStoreId] = useState(props.item.id);
  const [isSelected, setIsSelected] = useState(props.item.isSelected);
  useEffect(() => {
    if (props.item !== null && props.item !== undefined) {
      setIsSelected(props.item.isSelected);
      setStoreId(props.item.id);
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
  const [stockStatus, setStockStatus] = useState(props.stock);

  const dispatch = useDispatch();
  console.log(props);
  console.log(props.stock);
  useEffect(() => {
    if (props.stock !== undefined) {
      setStockStatus(props.stock);
    }
  }, [props.stock]);
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
            {props.stock === true ? (
              <React.Fragment>
                <th>In Stock</th>
                <th>Low Stock</th>
              </React.Fragment>
            ) : (
              ""
            )}
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
                {props.stock === true ? (
                  <React.Fragment>
                    <td>
                      <InStock item={item} />
                    </td>{" "}
                    <td>
                      <LowStock item={item} />
                    </td>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </CRow>
    </React.Fragment>
  );
};

export default StoresDatatable;
