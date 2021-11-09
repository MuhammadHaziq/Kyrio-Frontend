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
import CIcon from "@coreui/icons-react";
import { update_payment_type } from "../../../actions/settings/paymentTypesActions.js";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

const UpdatePaymentType = (props) => {
  const [collapse, setCollapse] = useState([true, true]);
  const [fields, setFields] = useState({ name: "" });
  const [cashPaymentRound, setCashPaymentRound] = useState(0.01);
  const [PaymentType, setPaymentType] = useState({
    paymentTypeId: 0,
    paymentTypeName: "Select Payment Type",
  });
  const [selectedPaymentType, setSelectedPaymentId] = useState();
  const redirect_payment = useSelector(
    (state) => state.settingReducers.paymentTypesReducer.redirect_payment
  );
  const roundingInterval = [
    {
      value: 0.01,
      lable: "0.01",
    },
    {
      value: 0.05,
      lable: "0.05",
    },
    {
      value: 0.1,
      lable: "0.10",
    },
    {
      value: 0.5,
      lable: "0.50",
    },
    {
      value: 1.0,
      lable: "1.00",
    },
  ];
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
        name: props.update_data.title,
      });
      setPaymentType({
        paymentTypeId:
          props.update_data.paymentMethod !== undefined
            ? props.update_data.paymentMethod._id || "0"
            : "0",
        paymentTypeName:
          props.update_data.paymentMethod !== undefined
            ? props.update_data.paymentMethod.title ||
              "Select Payment Type"
            : "Select Payment Type",
      });
      setSelectedPaymentId(
        props.update_data.paymentMethod !== undefined
          ? props.update_data.paymentMethod._id || "0"
          : "0"
      );
      setCashPaymentRound(
        props.update_data !== undefined &&
          props.update_data !== null &&
          Object.keys(props.update_data).length > 0
          ? props.update_data.cashPaymentRound || "0.01"
          : "0.01"
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

    const data = {
      title: fields.name,
      paymentTypes: PaymentType,
      storeId: props.update_data.store._id,
      id: props.update_data._id,
      cashPaymentRound: cashPaymentRound,
    };
    dispatch(update_payment_type(data));
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };
  const handleOnChangeCash = (e) => {
    setCashPaymentRound(e.target.value);
  };

  return (
    <CCard>
      <CCardHeader>
        <h4>
          <strong>Update Payment Type</strong>
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
            <CFormGroup row="row">
              <CCol md="12">
                <CLabel htmlFor="name">Payment Type</CLabel>
                <CInputGroup>
                  <CInput
                    id="PaymentType"
                    name="PaymentType"
                    value={PaymentType.paymentTypeName}
                    disabled
                  />
                </CInputGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row="row">
              <CCol md="12">
                <CLabel htmlFor="name">Name</CLabel>
                <CInputGroup>
                  <CInput
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={fields.name}
                    disabled
                  />
                </CInputGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup>
              <CSelect
                size="md"
                name="cashPaymentRound"
                id="cashPaymentRound"
                value={cashPaymentRound}
                onChange={handleOnChangeCash}
              >
                {roundingInterval.map((item) => {
                  return <option value={item.value}>{item.lable}</option>;
                })}
              </CSelect>
            </CFormGroup>
            <CRow>
              <CCol col="6" sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
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
                sm="6"
                md="6"
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
                  UPDATE
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
