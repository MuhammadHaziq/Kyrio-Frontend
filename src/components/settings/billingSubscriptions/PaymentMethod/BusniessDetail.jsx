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
} from "@coreui/react";
import { FaRegCreditCard, FaCalendarAlt, FaLock } from "react-icons/fa";
import { TextMask, InputAdapter } from "react-text-mask-hoc";
import { CIcon } from "@coreui/icons-react";
import Select from "react-select";
const BusniessDetail = (props) => {
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
  const [state, setState] = useState({ businessName: "", businessDetail: "" });
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
  const saveBusinessDetail = () => {
    console.log(state);
  };

  return (
    <React.Fragment>
      <div className="animated fadeIn">
        <CFade timeout={timeout} in={true}>
          <CCard>
            <CCardHeader>
              <h4>
                <strong>Business Detail</strong>
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
                      <CLabel htmlFor="businessName">Busniess Name</CLabel>
                      <CInput
                        id="businessName"
                        placeholder="Enter your Busniess Name"
                        name="businessName"
                        required
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="businessDetail">Busniess details</CLabel>
                      <CInput
                        id="businessDetail"
                        placeholder="Enter your Busniess Detail"
                        name="businessDetail"
                        required
                      />
                    </CFormGroup>
                    <p>
                      Add billing address, tax ID or other information you need
                      on your invoices
                    </p>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="4" className="text-center mt-3">
                    <CButton
                      size="md"
                      color="secondary"
                      className="float-left btn-block"
                      variant="ghost"
                      onClick={props.goBack}
                    >
                      BACK
                    </CButton>
                  </CCol>
                  <CCol xs="4" className="text-center mt-3">
                    <CButton
                      size="md"
                      color="danger"
                      className="float-left btn-block"
                      variant="ghost"
                      onClick={props.goBack}
                    >
                      CANCEL
                    </CButton>
                  </CCol>
                  <CCol xs="4" className="text-center mt-3">
                    <CButton
                      size="md"
                      color="success"
                      className="float-right btn-block"
                      variant="ghost"
                      onClick={saveBusinessDetail}
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

export default BusniessDetail;
