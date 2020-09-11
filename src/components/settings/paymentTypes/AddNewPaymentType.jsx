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
  CForm,
  CSelect,
  CInvalidFeedback,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { add_new_pos_device } from "../../../actions/settings/posDeviceActions.js";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

const AddNewPaymentType = (props) => {
  const [collapse, setCollapse] = useState([true, true]);
  const [fields, setFields] = useState({ name: "" });
  const [errors, setErrors] = useState({
    pos_device_name: false,
    paymentId: false,
  });
  const [PaymentType, setPaymentType] = useState({
    paymentId: 0,
    paymentName: "Select Payment Type",
  });
  const [selectedPaymentType, setSelectedPaymentId] = useState();
  const dispatch = useDispatch();

  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };
  const goBack = () => {
    props.goBack();
  };
  const submitPaymentForm = (e) => {
    e.preventDefault();
    if (PaymentType["paymentId"] === 0) {
      alert("Select Payment Type");
    } else {
      const data = {
        name: fields.name,
        PaymentType: JSON.stringify(PaymentType),
      };
      console.log(data);
      // dispatch(add_new_pos_device(data));
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

  const paymentHandleChange = (e) => {
    console.log(e.target.value);

    const payment = props.payment_types.filter(
      (item) => item._id === e.target.value
    );

    let paymentData;
    if (e.target.value === 0) {
      paymentData = {
        paymentId: 0,
        paymentName: "Select Payment Type",
      };
    } else {
      paymentData = {
        paymentId: payment[0]._id,
        paymentName: payment[0].title,
      };
    }

    setPaymentType(paymentData);
    setSelectedPaymentId(e.target.value);
  };
  return (
    <CCard>
      <CCardHeader>
        <h4>
          <strong>Create Payment Type</strong>
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
          <CForm onSubmit={submitPaymentForm}>
            <CFormGroup>
              <CSelect
                custom
                size="md"
                name="selectedPaymentType"
                id="selectedPaymentType"
                value={selectedPaymentType}
                onChange={paymentHandleChange}
              >
                <option value="0">Payment type</option>
                {props.payment_types.map((item) => {
                  return <option value={item._id}>{item.title}</option>;
                })}
              </CSelect>
            </CFormGroup>
            <CFormGroup row="row">
              <CCol md="12">
                <CLabel htmlFor="name">Name</CLabel>
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-device" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={handleOnChange}
                    invalid={errors.name}
                    onBlur={handleOnBlur}
                    value={fields.name}
                  />
                  <CInvalidFeedback>
                    {validator.isEmpty(fields.name) ? "Please Enter Name" : ""}
                  </CInvalidFeedback>
                </CInputGroup>
              </CCol>
            </CFormGroup>
            <CRow>
              <CCol col="6" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  block
                  className="btn-pill pull-right"
                  variant="outline"
                  color="default"
                  onClick={goBack}
                >
                  BACK
                </CButton>
              </CCol>
              <CCol col="6" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  block
                  className="btn-pill pull-right"
                  variant="outline"
                  color="danger"
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
                  type="submit"
                  color="success"
                  disabled={PaymentType["paymentId"] == 0 || fields.name == ""}
                  block
                  className="btn-pill pull-right"
                  variant="outline"
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

export default AddNewPaymentType;
