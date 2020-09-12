import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFade,
} from "@coreui/react";
import PaymentTypesDatatable from "../../../datatables/settings/paymentTypes/PaymentTypesDatatable";
import { useSelector } from "react-redux";
import AddNewPaymentType from "../../../components/settings/paymentTypes/AddNewPaymentType";
const PaymentTypes = () => {
  const [fadePaymentTypes, setPaymentTypes] = useState(true);
  const [fadeAddPaymentTypes, setFadeAddPaymentTypes] = useState(false);
  const [timeout] = useState(300);

  const payment_types = useSelector(
    (state) => state.settingReducers.paymentTypesReducer.payment_types
  );

  const addNewPaymentType = () => {
    setPaymentTypes(false);
    setFadeAddPaymentTypes(true);
  };
  const goBack = () => {
    setPaymentTypes(true);
    setFadeAddPaymentTypes(false);
  };

  return (
    <React.Fragment>
      <div className="animated fadeIn">
        {fadeAddPaymentTypes ? (
          <CFade timeout={timeout} in={fadeAddPaymentTypes}>
            <AddNewPaymentType goBack={goBack} payment_types={payment_types} />
          </CFade>
        ) : (
          ""
        )}
        {fadePaymentTypes ? (
          <CFade timeout={timeout} in={fadePaymentTypes}>
            <CRow>
              <CCol xs="12" lg="12">
                <CCard>
                  <CCardHeader>
                    <CRow>
                      <CCol
                        col="6"
                        sm="4"
                        md="4"
                        xl="xl"
                        className="mb-3 mb-xl-0"
                      >
                        <CButton color="success" onClick={addNewPaymentType}>
                          ADD PAYMENT TYPE
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <PaymentTypesDatatable pos_devices={[]} />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CFade>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};
export default PaymentTypes;
