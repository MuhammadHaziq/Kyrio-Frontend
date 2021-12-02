import React, { useState, useEffect } from "react";
import { CInputCheckbox, CRow, CCol, CFormGroup, CLabel } from "@coreui/react";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat from "react-number-format";
const Cost = (props) => {
  const dispatch = useDispatch();
  const decimal = useSelector((state) => state.auth.user.decimal);

  const [itemCost, setItemCost] = useState(props.item.cost);
  useEffect(() => {
    if (props.item.cost !== null && props.item.cost !== undefined) {
      setItemCost(props.item.cost);
    }
  }, [props.item]);

  const handleOnChange = (e) => {
    setItemCost(e.target.value);
  };
  const handleOnBlur = (e) => {
    console.log(("cost", props.item.value, itemCost));
    // dispatch(set_item_store_values("Price", props.item.id, itemCost));
  };
  return (
    <NumberFormat
      id="cost"
      name="cost"
      placeholder="Cost"
      value={itemCost}
      className="form-control"
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      thousandSeparator={true}
      decimalScale={decimal}
      allowNegative={false}
      fixedDecimalScale={true}
    />
  );
};

const CompositeItemTable = (props) => {
  const [fields, setFields] = useState({
    checkAll: true,
    item_stores: [],
  });

  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <CRow>
        <table className="table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Quantity</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {(props.stores || []).map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
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

export default CompositeItemTable;
