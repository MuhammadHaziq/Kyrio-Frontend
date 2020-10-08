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
  CFormText,
  CForm,
  CInvalidFeedback,
} from "@coreui/react";
import validator from "validator";
import { CIcon } from "@coreui/icons-react";
import { TextMask, InputAdapter } from "react-text-mask-hoc";
import { add_new_loyalty } from "../../../actions/settings/loyaltyActions.js";
import { useDispatch, useSelector } from "react-redux";
const AddLoyalty = (props) => {
  const auth = useSelector((state) => state.auth);
  const loyalty = useSelector((state) => state.settingReducers.loyaltyReducer);
  const [storeId, setStoreId] = useState();
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
    setStoreId(auth.user.stores[0] ? auth.user.stores[0]._id : "");
  }, [auth]);

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
      storeId: storeId,
    };
    dispatch(add_new_loyalty(data));
    console.log("loyalty_type", data);
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
            <CInvalidFeedback>
              {validator.isEmpty(fields.loyalty_type)
                ? "Please Enter The Loyalty Type"
                : ""}
            </CInvalidFeedback>
          </CInputGroup>
        </CCol>
      </CFormGroup>
      <CFormGroup row={true}>
        <CLabel>
          A percentage of the purchase amount to be credited to the points
          account of the customer
        </CLabel>
        <CInputGroup>
          <TextMask
            mask={[/\d/, ".", /\d/, /\d/]}
            Component={InputAdapter}
            className="form-control"
            name="loyalty_amount"
            onChange={handleOnChange}
            invalid={errors.loyalty_amount}
            onBlur={handleOnBlur}
            value={fields.loyalty_amount}
          />
          <CInputGroupAppend>
            <CInputGroupText>%</CInputGroupText>
          </CInputGroupAppend>
        </CInputGroup>
        <CFormText color="muted">ex. 9.99</CFormText>
      </CFormGroup>
      <CRow>
        <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
          <CButton
            block
            variant="outline"
            className="btn-pill float-right"
            color="secondary"
          >
            CANCEL
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
