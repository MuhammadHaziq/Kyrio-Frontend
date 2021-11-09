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
  CSelect,
} from "@coreui/react";
import { FaRegCreditCard, FaCalendarAlt, FaLock } from "react-icons/fa";
import { TextMask, InputAdapter } from "react-text-mask-hoc";
import CIcon from "@coreui/icons-react";
import Select from "react-select";
const AddPaymentMethod = (props) => {
  const [collapse, setCollapse] = useState([true, true]);
  const [expRight, setExpRight] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [timeout, setTimeout] = useState(300);
  const [fields, setFields] = useState({
    email: "",
    business: "",
    timezone: "",
    language: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    business: false,
    timezone: false,
    language: false,
  });
  const [value, setValue] = useState({});
  const [state, setState] = useState({
    credit_card: "",
    exp_date: "",
    cvc: "",
  });
  const [country, setSelectCountry] = useState("");
  const [cvc, setCVC] = useState("");
  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };
  const goBack = () => {
    props.goBack();
  };

  const handleOnChange = (e) => {
    const [name, value] = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const savePaymentMethod = () => {
    console.log(state);
  };
  const countryHandleChange = (e) => {
    setSelectCountry(e.target.value);
  };
  return (
    <React.Fragment>
      <div className="animated fadeIn">
        <CFade timeout={timeout} in={true}>
          <CCard>
            <CCardHeader>
              <h4>
                <strong>Add payment method</strong>
                <div className="card-header-actions">
                  <CLink
                    className="card-header-action"
                    onClick={() => toggle(0)}
                  >
                    <CIcon
                      name={
                        collapse[0] ? "cil-chevron-bottom" : "cil-chevron-top"
                      }
                    />
                  </CLink>
                </div>
              </h4>
            </CCardHeader>
            <CCollapse show={collapse[0]}>
              <CCardBody>
                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel>Credit Card Number</CLabel>
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-credit-card" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <TextMask
                          mask={[
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            " ",
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            " ",
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            " ",
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                          ]}
                          Component={InputAdapter}
                          className="form-control"
                          name="credit_card"
                        />
                      </CInputGroup>
                      <CFormText color="muted">
                        ex. 9999 9999 9999 9999
                      </CFormText>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel>Date input</CLabel>
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-calendar" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <TextMask
                          mask={[/\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                          Component={InputAdapter}
                          className="form-control"
                          name="exp_date"
                        />
                      </CInputGroup>
                      <CFormText color="muted">ex. 08/2000</CFormText>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">CVV/CVC</CLabel>
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          id="cvc"
                          placeholder="123"
                          required="required"
                          name="cvc"
                          value={cvc}
                          onChange={(e)=> setCVC(e.target.value)}
                        />
                      </CInputGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        Country of business registration
                      </CLabel>
                      <CSelect
                        name="country"
                        id="country"
                        value={country}
                        onChange={countryHandleChange}
                      >
                        <option value="0">Please select</option>
                        <option value="pakistan">Pakistan</option>
                        <option value="oman">Oman</option>
                        <option value="duabi">Dubai</option>
                      </CSelect>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="4" className="text-center mt-3">
                    <CButton
                      size="md"
                      color="secondary"
                      className="float-left btn-block btn-pill"
                      variant="outline"
                      onClick={props.goBack}
                    >
                      BACK
                    </CButton>
                  </CCol>
                  <CCol xs="4" className="text-center mt-3">
                    <CButton
                      size="md"
                      color="danger"
                      className="float-left btn-block btn-pill"
                      variant="outline"
                      onClick={props.goBack}
                    >
                      CANCEL
                    </CButton>
                  </CCol>
                  <CCol xs="4" className="text-center mt-3">
                    <CButton
                      size="md"
                      color="success"
                      className="float-right btn-block btn-pill"
                      variant="outline"
                      onClick={savePaymentMethod}
                    >
                      SAVE
                    </CButton>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCollapse>
          </CCard>
        </CFade>
      </div>
    </React.Fragment>
  );
};

export default AddPaymentMethod;
