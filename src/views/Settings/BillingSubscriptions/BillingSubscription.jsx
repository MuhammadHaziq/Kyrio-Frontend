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
import {CIcon} from "@coreui/icons-react";
import Subscriptions from '../../../components/billingSubscriptions/Subscriptions.jsx'
import PaymentMethod from '../../../components/billingSubscriptions/PaymentMethod.jsx'
import AddPaymentMethod from '../../../components/billingSubscriptions/PaymentMethod/AddPaymentMethod.jsx'
import BusniessDetail from '../../../components/billingSubscriptions/PaymentMethod/BusniessDetail.jsx'

const BillingSubscriptions = () => {
  const [collapse, setCollapse] = useState([true, true]);
  const [fadeSubscription, setFadeSubscription] = useState(true);
  const [fadePaymentMethod, setFadePaymentMethod] = useState(false);
  const [fadeBusinessDetails, setFadeBusinessDetails] = useState(false);
  const [expRight, setExpRight] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [timeout, setTimeout] = useState(300);

  const toggleCollapse = (tab) => {
    const state = collapse.map((x, index) => (
      tab === index
      ? !x
      : x));
    setCollapse(state)
  }
  const addPaymentMethod = () => {
    setFadeSubscription(false)
    setFadePaymentMethod(true)
    setFadeBusinessDetails(false)
  }
  const editBillingDetails = () => {
    // alert('hello')
    setFadeSubscription(false)
    setFadePaymentMethod(false)
    setFadeBusinessDetails(true)
  }
  const goBack = () => {
    setFadeSubscription(true)
    setFadePaymentMethod(false)
    setFadeBusinessDetails(false)
  }
  return (<React.Fragment >
    {fadePaymentMethod == true ?
    <AddPaymentMethod goBack={goBack}/>
    : fadeBusinessDetails == true ?
    <BusniessDetail goBack={goBack}/>
    : fadeSubscription == true ?
    <React.Fragment >
    <CRow>
      <CCol xs="12" sm="12">
        <CCard>
          <CCardHeader>
            Subscriptions
            <div className="card-header-actions">

              <CLink className="card-header-action" onClick={() => toggleCollapse(0)}>
                <CIcon name={collapse[0]
                    ? 'cil-chevron-bottom'
                    : 'cil-chevron-top'}/>
              </CLink>

            </div>
          </CCardHeader>
          <CCollapse show={collapse[0]}>
            <CCardBody>
              <Subscriptions/>
            </CCardBody>
          </CCollapse>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol xs="12" sm="12">
        <CCard>
          <CCardHeader>
            Payment method
            <div className="card-header-actions">

              <CLink className="card-header-action" onClick={() => toggleCollapse(1)}>
                <CIcon name={collapse[1]
                    ? 'cil-chevron-bottom'
                    : 'cil-chevron-top'}/>
              </CLink>

            </div>
          </CCardHeader>
          <CCollapse show={collapse[1]}>
            <CCardBody>
              <PaymentMethod editBillingDetails={editBillingDetails} addPaymentMethod={addPaymentMethod}/>
            </CCardBody>
          </CCollapse>
        </CCard>
      </CCol>
    </CRow>
  </React.Fragment > : ''}
  </React.Fragment>)
}

export default BillingSubscriptions
