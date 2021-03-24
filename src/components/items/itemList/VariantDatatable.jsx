import React, { useState, useEffect } from "react";
import {
  CInputCheckbox,
  CRow,
  CCol,
  CFormGroup,
  CLabel,
  CInput,
  CButton,
} from "@coreui/react";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  toggle_select_all_item_stores,
  toggle_select_single_item_store,
  set_item_store_price,
  update_variants_table_values,
  delete_item_varient,
} from "../../../actions/items/itemActions";
import { CIcon } from "@coreui/icons-react";
import { useDispatch } from "react-redux";
import NumberFormat from "react-number-format";
const Price = (props) => {
  const dispatch = useDispatch();

  const [variantPrice, setVariantPrice] = useState(props.item.price);
  useEffect(() => {
    if (props.item.price !== null && props.item.price !== undefined) {
      setVariantPrice(props.item.price);
    }
  }, [props.item]);

  const handleOnChange = (e) => {
    setVariantPrice(e.target.value);
  };
  const handleOnBlur = (e) => {
    const data = {
      index: props.index,
      value: variantPrice,
      optionId: props.optionId,
      name: "Price",
    };
    dispatch(update_variants_table_values(data));
  };
  return (
    <NumberFormat
      id="price"
      name="variantPrice"
      placeholder="Price"
      value={variantPrice}
      className="form-control"
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      thousandSeparator={true}
      decimalScale={2}
      fixedDecimalScale={true}
    />
  );
};

const Cost = (props) => {
  const dispatch = useDispatch();

  const [variantCost, setVariantCost] = useState(props.item.cost);
  useEffect(() => {
    if (props.item.cost !== null && props.item.cost !== undefined) {
      setVariantCost(props.item.cost);
    }
  }, [props.item]);

  const handleOnChange = (e) => {
    setVariantCost(e.target.value);
  };
  const handleOnBlur = (e) => {
    const data = {
      index: props.index,
      value: variantCost,
      optionId: props.optionId,
      name: "Cost",
    };
    console.log(data);
    dispatch(update_variants_table_values(data));
  };
  return (
    <NumberFormat
      id="cost"
      name="variantCost"
      placeholder="Cost"
      value={variantCost}
      className="form-control"
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      thousandSeparator={true}
      decimalScale={2}
      fixedDecimalScale={true}
    />
  );
};

const Barcode = (props) => {
  const dispatch = useDispatch();

  const [variantBarcode, setVariantBarcode] = useState(props.item.barcode);
  useEffect(() => {
    if (props.item.barcode !== null && props.item.barcode !== undefined) {
      setVariantBarcode(props.item.barcode);
    }
  }, [props.item]);

  const handleOnChange = (e) => {
    setVariantBarcode(e.target.value);
  };
  const handleOnBlur = (e) => {
    const data = {
      index: props.index,
      value: variantBarcode,
      optionId: props.optionId,
      name: "Barcode",
    };
    console.log(data);
    dispatch(update_variants_table_values(data));
  };
  return (
    <CInput
      id="variantBarcode"
      type="number"
      name="variantBarcode"
      value={variantBarcode}
      placeholder="Barcode"
      onChange={handleOnChange}
      onBlur={handleOnBlur}
    />
  );
};

const Sku = (props) => {
  const dispatch = useDispatch();

  const [variantSKU, setVariantSKU] = useState(props.item.SKU);
  useEffect(() => {
    if (props.item.sku !== null && props.item.sku !== undefined) {
      setVariantSKU(props.item.sku);
    }
  }, [props.item]);

  const handleOnChange = (e) => {
    setVariantSKU(e.target.value);
  };
  const handleOnBlur = (e) => {
    const data = {
      index: props.index,
      value: variantSKU,
      optionId: props.optionId,
      name: "SKU",
    };
    console.log(data);
    dispatch(update_variants_table_values(data));
  };
  return (
    <CInput
      id="variantSKU"
      name="variantSKU"
      placeholder="SKU"
      value={variantSKU}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
    />
  );
};

const VariantDatatable = (props) => {
  const dispatch = useDispatch();
  console.log(props);
  const delete_variant_values = (id, index) => {
    console.log(id, index);
    // dispatch(delete_item_varient({ id: id, variantIndex: index }));
  };

  return (
    <React.Fragment>
      <CRow>
        <table className="table">
          <thead>
            <th>Variant</th>
            <th>Price</th>
            <th>Cost</th>
            <th>SKU</th>
            <th>Barcode</th>
            <th>Action</th>
          </thead>
          <tbody>
            {(props.item_variants || []).map((item) => {
              return item.optionValue.map((options, index) => (
                <tr>
                  <td>{options.variantName}</td>
                  <td>
                    <Price item={options} index={index} optionId={item._id} />
                  </td>
                  <td>
                    <Cost item={options} index={index} optionId={item._id} />
                  </td>
                  <td>
                    <Sku item={options} index={index} optionId={item._id} />
                  </td>
                  <td>
                    <Barcode item={options} index={index} optionId={item._id} />
                  </td>
                  <td>
                    <CIcon name="cil-trash" />
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </CRow>
    </React.Fragment>
  );
};

export default VariantDatatable;
// <CButton
//   variant="outline"
//   className="pull-right"
//   color="danger"
//   block={false}
//   onClick={() => delete_variant_values(item._id, index)}
// >
// </CButton>
//
// {props.item_variants.optionValue.map((item, index) => (
//   <tr>
//     <td>{item.variantName}</td>
//     <td>
//       <Price item={item} index={index} />
//     </td>
//     <td>
//       <Cost item={item} index={index} />
//     </td>
//     <td>
//       <Sku item={item} index={index} />
//     </td>
//     <td>
//       <Barcode item={item} index={index} />
//     </td>
//   </tr>
// ))}
// ;
