import React, {useEffect, useState} from "react";
import {
  CRow,
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CFade,
  CLink
} from "@coreui/react";
import {FaAddressCard, FaLuggageCart, FaRegCreditCard} from "react-icons/fa";

const PaymentMethod = (props) => {
  return (<React.Fragment>
    <p>
      <FaRegCreditCard/>
      &nbsp;&nbsp;No credit card currently on file.{" "}
      <CButton color="success" className="float-right btn-pill" variant="outline" onClick={props.addPaymentMethod}>
        ADD PAYMENT METHOD
      </CButton>
    </p>
    <p style={{
        marginTop: "5%"
      }}>
      Edit your business name, add a billing
      <br/>
      contact or other information you want to include on your invoices.{" "}
      <CButton color="success" className="float-right btn-pill" variant="outline" onClick={props.editBillingDetails}>
        EDIT BILLING DETAILS
      </CButton>
    </p>
  </React.Fragment>);
};

export default PaymentMethod;
