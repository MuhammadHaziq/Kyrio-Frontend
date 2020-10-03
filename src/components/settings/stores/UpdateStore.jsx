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
  CFormText,
  CLink,
  CForm,
  CTextarea,
  CInvalidFeedback,
} from "@coreui/react";
import validator from "validator";
import { CIcon } from "@coreui/icons-react";
import { TextMask, InputAdapter } from "react-text-mask-hoc";
import {
  update_store,
  delete_store,
} from "../../../actions/settings/storeActions.js";
import { useDispatch, useSelector } from "react-redux";
const UpdateStore = (props) => {
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

  useEffect(() => {
    if (store.redirect_store !== undefined && store.redirect_store === true) {
      props.goBack();
    }
  }, [props, store.redirect_store]);

  useEffect(() => {
    if (
      props.update_store_data !== undefined &&
      Object.keys(props.update_store_data).length > 0
    ) {
      setFields({
        store_name: props.update_store_data.title || "",
        store_address: props.update_store_data.address || "",
        store_description: props.update_store_data.description || "",
        store_phone: props.update_store_data.phone || "",
      });
    }
  }, [props.update_store_data]);

  const goBack = () => {
    props.goBack();
  };
  const submitStoreForm = (e) => {
    e.preventDefault();
    if (fields.store_name === "") {
      setErrors({
        ...errors,
        store_name: validator.isEmpty(fields.store_name),
      });
    }
    // else if (fields.store_address === "") {
    //   setErrors({
    //     ...errors,
    //     store_address: validator.isEmpty(fields.store_address),
    //   });
    // } else if (fields.store_phone === "") {
    //   setErrors({
    //     ...errors,
    //     store_phone: validator.isEmpty(fields.store_phone),
    //   });
    // }
    else {
      const data = {
        title: fields.store_name,
        address: fields.store_address,
        phone: fields.store_phone,
        description: fields.store_description,
        _id: props.update_store_data._id,
      };
      dispatch(update_store(data));
      console.log("sote_name", data);
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

  const delete_str = () => {
    const data = [props.update_store_data._id];
    dispatch(delete_store(JSON.stringify(data)));
  };

  return (
    <CCard>
      <CCardHeader>
        <h4>
          <strong>Update Store</strong>
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
            <CFormGroup row={true}>
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
                    invalid={errors.store_name}
                    onBlur={handleOnBlur}
                    value={fields.store_name}
                  />
                  <CInvalidFeedback>
                    {validator.isEmpty(fields.store_name)
                      ? "Please Enter The Store Name"
                      : ""}
                  </CInvalidFeedback>
                </CInputGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row={true}>
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
                    // invalid={errors.store_address || ""}
                    // onBlur={handleOnBlur}
                    value={fields.store_address}
                  />
                  {/*<CInvalidFeedback>
                    {validator.isEmpty(fields.store_address)
                      ? "Please Enter The Store Address"
                      : ""}
                  </CInvalidFeedback>*/}
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
                  // className={
                  //   errors.store_phone === true
                  //     ? "form-control is-invalid"
                  //     : "form-control"
                  // }
                  className={"form-control"}
                  name="store_phone"
                  onChange={handleOnChange}
                  // invalid={errors.store_phone}
                  // onBlur={handleOnBlur}
                  value={fields.store_phone}
                />
                {/*<CInvalidFeedback>
                  {errors.store_phone ? "Please Enter The Store Phone" : ""}
                </CInvalidFeedback>*/}
              </CInputGroup>

              <CFormText color="muted">ex. (999) 999-9999</CFormText>
            </CFormGroup>
            <CFormGroup row={true}>
              <CCol md="12">
                <CLabel htmlFor="store_description">Store Description</CLabel>
                <CInputGroup>
                  <CTextarea
                    name="store_description"
                    id="store_description"
                    rows="9"
                    placeholder="Store Description"
                    onChange={handleOnChange}
                    // invalid={errors.store_description}
                    // onBlur={handleOnBlur}
                    value={fields.store_description}
                  />
                  {/*<CInvalidFeedback>
                    {errors.store_description
                      ? "Please Enter The Store Description"
                      : ""}
                  </CInvalidFeedback>*/}
                </CInputGroup>
              </CCol>
            </CFormGroup>
            <CRow>
              <CCol col="6" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  block
                  variant="outline"
                  className="btn-pill pull-right"
                  color="danger"
                  onClick={delete_str}
                >
                  <CIcon name="cil-trash" /> DELETE
                </CButton>
              </CCol>
              <CCol col="6" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  block
                  variant="outline"
                  className="btn-pill pull-right"
                  color="secondary"
                  onClick={goBack}
                >
                  CANCEL
                </CButton>
              </CCol>
              <CCol
                col="6"
                sm="4"
                md="4"
                xl="xl"
                className="mb-3 mb-xl-0 form-actions"
              >
                <CButton
                  block
                  type="submit"
                  variant="outline"
                  className="btn-pill pull-right"
                  color="success"
                >
                  Update
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCollapse>
    </CCard>
  );
};

export default UpdateStore;
