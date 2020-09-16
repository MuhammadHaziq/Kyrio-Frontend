import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import AddNewPaymentType from "../../../components/settings/paymentTypes/AddNewPaymentType";
import {
  redirect_back_payment,
  get_payments_type,
  delete_payments_type,
} from "../../../actions/settings/paymentTypesActions";
const PaymentTypes = () => {
  const [fadePaymentTypes, setPaymentTypes] = useState(true);
  const [fadeAddPaymentTypes, setFadeAddPaymentTypes] = useState(false);
  const [timeout] = useState(300);
  const [storeId, setStoreId] = useState();

  const dispatch = useDispatch();
  const payment_types = useSelector(
    (state) => state.settingReducers.paymentTypesReducer.payment_types
  );
  const payments_type = useSelector(
    (state) => state.settingReducers.paymentTypesReducer.payments_type
  );
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    setStoreId(auth.user.stores[0] ? auth.user.stores[0]._id : "");
  }, [auth]);

  useEffect(() => {
    if (storeId !== "" && typeof storeId !== "undefined") {
      const data = {
        storeId,
      };
      dispatch(get_payments_type(data));
    }
  }, [storeId]);
  const addNewPaymentType = () => {
    dispatch(redirect_back_payment(false));
    setPaymentTypes(false);
    setFadeAddPaymentTypes(true);
  };
  const goBack = () => {
    dispatch(redirect_back_payment(true));
    setPaymentTypes(true);
    setFadeAddPaymentTypes(false);
  };
  const deletePayments = () => {
    const deletedPaymentsId = payments_type
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    dispatch(delete_payments_type(JSON.stringify(deletedPaymentsId)));
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
                      <CCol sm="8" md="8" xl="xl" className="mb-3 mb-xl-0">
                        <CButton color="success" onClick={addNewPaymentType}>
                          ADD PAYMENT TYPE
                        </CButton>
                        {payments_type.filter((item) => item.isDeleted === true)
                          .length > 0 ? (
                          <CButton
                            variant="outline"
                            color="danger"
                            className="btn-square pull-right ml-2"
                            onClick={deletePayments}
                          >
                            DELETE
                          </CButton>
                        ) : (
                          ""
                        )}
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <PaymentTypesDatatable payments={payments_type} />
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
