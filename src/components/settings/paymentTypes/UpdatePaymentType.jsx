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
import { update_payment_type } from "../../../actions/settings/paymentTypesActions.js";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

const UpdatePaymentType = (props) => {
  const [collapse, setCollapse] = useState([true, true]);
  const [fields, setFields] = useState({ name: "" });
  const [errors, setErrors] = useState({
    name: false,
    selectedPaymentType: false,
  });
  const [PaymentType, setPaymentType] = useState({
    paymentTypeId: 0,
    paymentTypeName: "Select Payment Type",
  });
  const [selectedPaymentType, setSelectedPaymentId] = useState();
  const redirect_payment = useSelector(
    (state) => state.settingReducers.paymentTypesReducer.redirect_payment
  );

  const dispatch = useDispatch();

  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };

  useEffect(() => {
    if (
      props.update_data !== undefined &&
      Object.keys(props.update_data).length > 0
    ) {
      setFields({
        name: props.update_data.name,
      });
      setPaymentType({
        paymentTypeId:
          props.update_data.paymentType !== undefined
            ? props.update_data.paymentType.paymentTypeId || "0"
            : "0",
        paymentTypeName:
          props.update_data.paymentType !== undefined
            ? props.update_data.paymentType.paymentTypeName ||
              "Select Payment Type"
            : "Select Payment Type",
      });
      setSelectedPaymentId(
        props.update_data.paymentType !== undefined
          ? props.update_data.paymentType.paymentTypeId || "0"
          : "0"
      );
    }
  }, [props.update_data]);
  useEffect(() => {
    if (redirect_payment !== undefined && redirect_payment === true) {
      props.goBack();
    }
  }, [props, redirect_payment]);

  const goBack = () => {
    props.goBack();
  };
  const submitPaymentForm = (e) => {
    e.preventDefault();
    if (PaymentType["paymentTypeId"] === 0) {
      setErrors({
        ...errors,
        selectedPaymentType: true,
      });
    } else if (fields.name === "") {
      setErrors({
        ...errors,
        name: true,
      });
    } else {
      const data = {
        name: fields.name,
        paymentTypes: JSON.stringify(PaymentType),
        storeId: props.update_data.storeId,
        id: props.update_data._id,
      };
      console.log(data);
      dispatch(update_payment_type(data));
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
  const handleOnBlurSelect = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: value === "0" || "" ? true : false,
    });
  };

  const paymentHandleChange = (e) => {
    const payment = props.payment_types.filter(
      (item) => item._id === e.target.value
    );

    let paymentData;
    if (e.target.value === 0) {
      paymentData = {
        paymentTypeId: 0,
        paymentTypeName: "Select Payment Type",
      };
    } else {
      paymentData = {
        paymentTypeId: payment[0] ? payment[0]._id : 0,
        paymentTypeName: payment[0] ? payment[0].title : "Select Payment Type",
      };
      setFields({
        name:
          fields.name !== "" ? fields.name : payment[0] ? payment[0].title : "",
      });
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
                invalid={errors.selectedPaymentType}
                onBlur={handleOnBlurSelect}
                value={selectedPaymentType}
                onChange={paymentHandleChange}
              >
                <option value="0">Payment type</option>
                {props.payment_types.map((item) => {
                  return <option value={item._id}>{item.title}</option>;
                })}
              </CSelect>
              <CInvalidFeedback>
                {errors.selectedPaymentType ? "Please Select Payment Type" : ""}
              </CInvalidFeedback>
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
                  type="submit"
                  color="success"
                  block
                  className="btn-pill pull-right"
                  variant="outline"
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

export default UpdatePaymentType;
