
import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLink,
  CInputCheckbox,
  CInvalidFeedback,
  CCardFooter,
  CInputRadio,
  CListGroup,
  CListGroupItem,
  CSwitch,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { add_new_disocunt } from "../../../actions/items/discountActions";

const AddDiscount = (props) => {
  const discount = useSelector((state) => state.items.discountReducer);

  const [collapse, setCollapse] = useState([true, true]);
  const [restricted_access, setRestrictedAccess] = useState(false);
  const [fields, setFields] = useState({
    discount_name: "",
    discount_value: "",
    disocunt_type: "Percentage",
    checkAll: true,
  });
  const [errors, setErrors] = useState({
    discount_name: false,
    discount_value: false,
    disocunt_type: false,
    checkAll_error: false,
  });
  const [storeId, setStoreId] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.store !== undefined) {
      const stores = props.store.slice().map((item) => {
        return {
          ...item,
          isSelected: true,
        };
      });
      setStoreId(stores);
    }
  }, [props.store]);

  useEffect(() => {
    if (
      discount.redirect_discountList !== undefined &&
      discount.redirect_discountList === true
    )
      props.goBack();
  }, [discount.redirect_discountList]);

  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };

  const restrictedOnChange = () => {
    setRestrictedAccess(!restricted_access);
  };

  const goBack = () => {
    props.goBack();
  };

  const submitDiscount = () => {
    if (storeId.filter((item) => item.isSelected === true).length === 0) {
      alert("Select Store");
    } else if (fields.discount_name === "") {
      setErrors({
        ...errors,
        discount_name: validator.isEmpty(fields.discount_name),
      });
    } else {
      const store = storeId.filter((item) => item.isSelected === true);
      let storeData = [];
      store.map((item) => {
        return storeData.push({
          id: item._id,
          title: item.title,
        });
      });

      const data = {
        title: fields.discount_name,
        value: fields.discount_value,
        type: fields.disocunt_type,
        restricted: restricted_access,
        stores: JSON.stringify(storeData),
        // store: JSON.stringify(storeId),
      };
      dispatch(add_new_disocunt(data));
      console.log(data);
    }
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

  const storeHandleChange = (e) => {
    let selectedStore = [];
    if (e.target.value === "0") {
      setFields({
        ...fields,
        checkAll: !fields.checkAll,
      });
      selectedStore = storeId.slice().map((item) => {
        return {
          ...item,
          isSelected: !fields.checkAll === true ? true : false,
          // !item.isSelected,
        };
      });
    } else {
      selectedStore = storeId.slice().map((item) => {
        if (item._id === e.target.value) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return item;
      });
    }
    setFields({
      ...fields,
      checkAll:
        selectedStore.filter((item) => item.isSelected === true).length ===
          props.store.length && props.store.length > 0
          ? true
          : false,
    });

    setStoreId(selectedStore);
  };
  return (
    <React.Fragment>
      <CCard>
        <CCardHeader>
          <h4>
            <strong>Create Discount</strong>
          </h4>
        </CCardHeader>

        <CCardBody>
          <CFormGroup>
            <CCol md="12">
              <CLabel htmlFor="store_name">Discount Name</CLabel>
              <CInputGroup>
                <CInput
                  id="discount_name"
                  name="discount_name"
                  placeholder="Discount Name"
                  onChange={handleOnChange}
                  value={fields.discount_name}
                  invalid={errors.discount_name}
                  onBlur={handleOnBlur}
                />
                <CInvalidFeedback>
                  {errors.discount_name === true
                    ? "Please Enter Discount Name"
                    : ""}
                </CInvalidFeedback>
              </CInputGroup>
            </CCol>
          </CFormGroup>
          <CCol md="12">
            <CRow>
              <CCol sm="2">
                <CLabel>Type</CLabel>
              </CCol>
              <CCol sm="3">
                <CInputGroup variant="custom-radio" inline>
                  <CInputRadio
                    id="disocunt_type"
                    name="disocunt_type"
                    onChange={handleOnChange}
                    value={"Percentage"}
                    checked
                  />
                  <CLabel htmlFor="disocunt_type">Percentage</CLabel>
                </CInputGroup>
              </CCol>
              <CCol sm="3">
                <CInputGroup variant="custom-radio" inline>
                  <CInputRadio
                    id="disocunt_type"
                    name="disocunt_type"
                    onChange={handleOnChange}
                    value={"Amount"}
                  />
                  <CLabel htmlFor="disocunt_type">Amount</CLabel>
                </CInputGroup>
              </CCol>
            </CRow>
          </CCol>
          <CFormGroup>
            <CCol md="12">
              <CLabel htmlFor="discount_value">Value</CLabel>
              <CInputGroup>
                <CInput
                  id="discount_value"
                  name="discount_value"
                  placeholder="Value"
                  onChange={handleOnChange}
                  value={fields.discount_value}
                  type="number"
                />
              </CInputGroup>
            </CCol>
          </CFormGroup>
          <CCol sm="12">
            <CListGroup>
              <CListGroupItem
                className="justify-content-between"
                style={{
                  marginBottom: "2%",
                  height: "65px",
                  lineHeight: "0.23",
                  border: "none",
                }}
              >
                <h5>
                  Restricted access
                  <CSwitch
                    className={"mx-1 float-right"}
                    shape="pill"
                    color={"success"}
                    checked={restricted_access}
                    onChange={restrictedOnChange}
                  />
                </h5>
                <p style={{ lineHeight: "normal" }}>
                  Only employees with appropriate access right are able to apply
                  this discount
                </p>
              </CListGroupItem>
            </CListGroup>
          </CCol>
        </CCardBody>
        {collapse[0] ? (
          <CCardFooter>
            <h4>
              Stores
              <div className="card-footer-actions float-right">
                <CLink className="card-footer-action" onClick={() => toggle(0)}>
                  <CIcon
                    name={
                      collapse[0] ? "cil-chevron-bottom" : "cil-chevron-top"
                    }
                  />
                </CLink>
              </div>
            </h4>
            <span>
              <small>
                {storeId.filter((item) => item.isSelected === false).length ===
                0
                  ? "Available in all stores"
                  : "Not available in stores"}
              </small>
            </span>
          </CCardFooter>
        ) : (
          ""
        )}
      </CCard>
      <CCollapse show={!collapse[0]}>
        <CCard>
          <CCardHeader>
            <h4>
              <strong>Stores</strong>
              <div className="card-header-actions">
                <CLink className="card-header-action" onClick={() => toggle(0)}>
                  <CIcon
                    name={
                      collapse[0] ? "cil-chevron-bottom" : "cil-chevron-top"
                    }
                  />
                </CLink>
              </div>
            </h4>
          </CCardHeader>
          <CCardBody>
            <CFormGroup>
              <CCol md="3">
                <CLabel>Select Store</CLabel>
              </CCol>
              <CCol md="9">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    name="checkAll"
                    id={"checkAll"}
                    value={0}
                    checked={fields.checkAll}
                    onChange={storeHandleChange}
                  />
                  <CLabel variant="custom-checkbox" htmlFor={"checkAll"}>
                    {storeId.filter((item) => item.isSelected !== true)
                      .length === 0
                      ? "UnSelect All"
                      : "Select All"}
                  </CLabel>
                </CFormGroup>
              </CCol>
              <CCol md="8">
                {storeId.map((item, index) => (
                  <CFormGroup variant="custom-checkbox" inline key={index}>
                    <CInputCheckbox
                      custom
                      name="storeId"
                      id={"storeId" + item._id}
                      value={item._id}
                      checked={item.isSelected}
                      onChange={storeHandleChange}
                    />
                    <CLabel
                      variant="custom-checkbox"
                      htmlFor={"storeId" + item._id}
                    >
                      {item.title}
                    </CLabel>
                  </CFormGroup>
                ))}
              </CCol>
            </CFormGroup>
          </CCardBody>
        </CCard>
      </CCollapse>
      <CRow>
        <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
          <CButton
            block
            variant="outline"
            className="btn-pill pull-right"
            color="secondary"
            onClick={goBack}
          >
            BACK
          </CButton>
        </CCol>
        <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
          <CButton
            block
            variant="outline"
            className="btn-pill pull-right"
            color="danger"
            onClick={goBack}
          >
            CANCEL
          </CButton>
        </CCol>
        <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0 form-actions">
          <CButton
            block
            type="submit"
            variant="outline"
            className="btn-pill pull-right"
            color="success"
            onClick={submitDiscount}
          >
            SAVE
          </CButton>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default AddDiscount;