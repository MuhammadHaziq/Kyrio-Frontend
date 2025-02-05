import React, { useState, useEffect } from "react";
import {
  CButton,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInputGroupAppend,
  CForm,
} from "@coreui/react";
import validator from "validator";
import CIcon from "@coreui/icons-react";
import { add_new_loyalty } from "../../../actions/settings/loyaltyActions.js";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat from "react-number-format";

const AddLoyalty = (props) => {
  const loyalty = useSelector((state) => state.settingReducers.loyaltyReducer);
  const decimal = useSelector((state) => state.auth.user.decimal);

  const [fields, setFields] = useState({
    loyalty_amount: "0.00",
    loyalty_type: "Bonus system",
  });
  const [errors, setErrors] = useState({
    loyalty_amount: false,
    loyalty_type: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setFields({
      ...fields,
      loyalty_amount:
        typeof loyalty.loyalty_amount !== "undefined"
          ? loyalty.loyalty_amount
          : fields.loyalty_amount,
    });
  }, [loyalty]);
  const submitStoreForm = (e) => {
    e.preventDefault();
    const data = {
      loyalty_type: fields.loyalty_type,
      loyalty_amount: fields.loyalty_amount,
    };
    dispatch(add_new_loyalty(data));
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };
  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: validator.isEmpty(value),
    });
  };
  // const limit = (val, max) => {
  //   if (val.length === 1 && val[0] > max[0]) {
  //     val = "0" + val;
  //   }

  //   if (val.length === 2) {
  //     if (Number(val) === 0) {
  //       val = "0";

  //       //this can happen when user paste number
  //     } else if (val > max) {
  //       val = max;
  //     }
  //   }

  //   return val;
  // };

  // const amountFormat = (val) => {
  //   let number = limit(val.substring(0, 2), "99");
  //   let points = val.substring(2, 4);

  //   return number + (points.length ? "." + points : "." + "00");
  // };

  return (
    <CForm onSubmit={submitStoreForm}>
      <CFormGroup row={true}>
        <CCol md="12">
          <CLabel htmlFor="store_name">Loyalty type</CLabel>
          <CInputGroup>
            <CInputGroupPrepend>
              <CInputGroupText>
                <CIcon name="cil-everplaces" />
              </CInputGroupText>
            </CInputGroupPrepend>
            <CInput
              id="loyalty_type"
              name="loyalty_type"
              placeholder="Loyalty Type"
              onChange={handleOnChange}
              invalid={errors.loyalty_type}
              onBlur={handleOnBlur}
              value={fields.loyalty_type}
              disabled
            />
          </CInputGroup>
        </CCol>
      </CFormGroup>
      <CFormGroup row={true}>
        <CLabel>
          A percentage of the purchase amount to be credited to the points
          account of the customer
        </CLabel>
        <CInputGroup>
          <NumberFormat
            className="form-control"
            name="loyalty_amount"
            defaultValue={fields.loyalty_amount}
            format={"##.##"}
            onChange={handleOnChange}
            value={fields.loyalty_amount}
            decimalScale={decimal}
            allowNegative={false}
          />
          <CInputGroupAppend>
            <CInputGroupText>%</CInputGroupText>
          </CInputGroupAppend>
        </CInputGroup>
      </CFormGroup>
      <CRow>
        <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
          <CButton
            block
            variant="outline"
            className="btn-pill float-right"
            color="danger"
          >
            BACK
          </CButton>
        </CCol>
        <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0 form-actions">
          <CButton
            block
            type="submit"
            variant="outline"
            className="btn-pill float-right"
            color="success"
          >
            SAVE
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  );
};

export default AddLoyalty;
