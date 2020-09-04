import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CFade,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CFormText,
  CLink,
  CInputGroupAppend,
  CForm,
  CTextarea,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { TextMask, InputAdapter } from "react-text-mask-hoc";
import { add_new_store } from "../../../actions/settings/storeActions.js";
import { useDispatch, useSelector } from "react-redux";
const AddStore = (props) => {
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const [collapse, setCollapse] = useState([true, true]);
  const [fields, setFields] = useState({
    store_name: "",
    store_address: "",
    store_description: "",
    store_phone: "",
  });
  const [errors, setErrors] = useState({
    store_name: false,
    store_address: false,
    store_description: false,
    store_phone: false,
  });
  const dispatch = useDispatch();
  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };
  const goBack = () => {
    props.goBack();
  };
  const submitStoreForm = (e) => {
    e.preventDefault();
    const data = {
      title: fields.store_name,
      address: fields.store_address,
      phone: fields.store_phone,
      description: fields.store_description,
    };
    dispatch(add_new_store(data));
    console.log("sote_name", data);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };
  // useEffect(()=> {
  //   props.goBack();
  // },[store.save_store])
  return (
    <CCard>
      <CCardHeader>
        <h4>
          <strong>Add New Store</strong>
          <div className="card-header-actions">
            <CLink className="card-header-action" onClick={() => toggle(0)}>
              <CIcon
                name={collapse[0] ? "cil-chevron-bottom" : "cil-chevron-top"}
              />
            </CLink>
          </div>
        </h4>
      </CCardHeader>
      <CCollapse show={collapse[0]}>
        <CCardBody>
          <CForm onSubmit={submitStoreForm}>
            <CFormGroup row="row">
              <CCol md="12">
                <CLabel htmlFor="store_name">Store Name</CLabel>
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-everplaces" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    id="store_name"
                    name="store_name"
                    placeholder="Store Name"
                    onChange={handleOnChange}
                  />
                </CInputGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row="row">
              <CCol md="12">
                <CLabel htmlFor="store_address">Store Addresss</CLabel>
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-map" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    id="store_address"
                    name="store_address"
                    placeholder="Store Address"
                    onChange={handleOnChange}
                  />
                </CInputGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup>
              <CLabel>Store Phone</CLabel>
              <CInputGroup>
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-phone" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <TextMask
                  mask={[
                    "(",
                    /[1-9]/,
                    /\d/,
                    /\d/,
                    ")",
                    " ",
                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  Component={InputAdapter}
                  className="form-control"
                  name="store_phone"
                  onChange={handleOnChange}
                />
              </CInputGroup>

              <CFormText color="muted">ex. (999) 999-9999</CFormText>
            </CFormGroup>
            <CFormGroup row="row">
              <CCol md="12">
                <CLabel htmlFor="store_description">Store Description</CLabel>
                <CInputGroup>
                  <CTextarea
                    name="store_description"
                    id="store_description"
                    rows="9"
                    placeholder="Store Description"
                    onChange={handleOnChange}
                  />
                </CInputGroup>
              </CCol>
            </CFormGroup>
            <CRow>
              <CCol col="6" sm="4" md="2" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  variant="ghost"
                  className="float-left"
                  color="default"
                  onClick={goBack}
                >
                  BACK
                </CButton>
              </CCol>
              <CCol col="6" sm="4" md="2" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  variant="ghost"
                  className="float-left"
                  color="danger"
                  onClick={goBack}
                >
                  CANCEL
                </CButton>
              </CCol>
              <CCol
                col="6"
                sm="4"
                md="8"
                xl="xl"
                className="mb-3 mb-xl-0 form-actions"
              >
                <CButton
                  type="submit"
                  variant="ghost"
                  className="float-right"
                  color="primary"
                >
                  SAVE
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCollapse>
    </CCard>
  );
};

export default AddStore;
