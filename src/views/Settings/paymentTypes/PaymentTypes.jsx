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
import PaymentTypesDatatableNew from "../../../datatables/settings/paymentTypes/PaymentTypesDatatableNew";
import { useSelector, useDispatch } from "react-redux";
import AddNewPaymentType from "../../../components/settings/paymentTypes/AddNewPaymentType";
import UpdatePaymentType from "../../../components/settings/paymentTypes/UpdatePaymentType";
import UpdatePaymentTypeCash from "../../../components/settings/paymentTypes/UpdatePaymentTypeCash";
import ConformationAlert from "../../../components/conformationAlert/ConformationAlert";
import {
  redirect_back_payment,
  get_payments_type,
  delete_payments_type,
  get_payment_types,
} from "../../../actions/settings/paymentTypesActions";
import CIcon from "@coreui/icons-react";

const PaymentTypes = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [fadePaymentTypes, setPaymentTypes] = useState(true);
  const [fadeAddPaymentTypes, setFadeAddPaymentTypes] = useState(false);
  const [fadeUpdatePaymentTypes, setFadeUpdatePaymentTypes] = useState(false);
  const [timeout] = useState(300);
  const [storeId, setStoreId] = useState("0");

  const dispatch = useDispatch();
  const payment_types = useSelector(
    (state) => state.settingReducers.paymentTypesReducer.payment_types
  );
  const payments_type = useSelector(
    (state) => state.settingReducers.paymentTypesReducer.payments_type
  );
  const update_redirect = useSelector(
    (state) => state.settingReducers.paymentTypesReducer.update_redirect
  );
  const row_data = useSelector(
    (state) => state.settingReducers.paymentTypesReducer.row_data
  );
  const auth = useSelector((state) => state.auth);

  // useEffect(() => {
  //   setStoreId(auth.user.stores[0] ? auth.user.stores[0]._id : "");
  // }, [auth]);

  // useEffect(() => {
  //   if (payment_types.length === 0 || payment_types === undefined) {
  //     dispatch(get_payment_types());
  //   }
  // }, [dispatch, payment_types]);
  useEffect(() => {
    if (payment_types.length === 0 || payment_types === undefined) {
      dispatch(get_payment_types());
    }
  }, []);
  useEffect(() => {
    // if (storeId !== "" && typeof storeId !== "undefined") {
    //   const data = {
    //     storeId,
    //   };
      dispatch(get_payments_type());
    // }
  }, [dispatch]);

  useEffect(() => {
    if (update_redirect === true && update_redirect !== undefined) {
      setFadeUpdatePaymentTypes(true);
      setPaymentTypes(false);
      setFadeAddPaymentTypes(false);
    }
  }, [update_redirect]);
  const addNewPaymentType = () => {
    dispatch(redirect_back_payment(false));
    setPaymentTypes(false);
    setFadeAddPaymentTypes(true);
    setFadeUpdatePaymentTypes(false);
  };
  const goBack = () => {
    dispatch(redirect_back_payment(true));
    setPaymentTypes(true);
    setFadeAddPaymentTypes(false);
    setFadeUpdatePaymentTypes(false);
  };
  const deletePayments = () => {
    const deletedPaymentsId = payments_type
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    dispatch(delete_payments_type(JSON.stringify(deletedPaymentsId)));
  };

  const hideAlert = () => {
    setShowAlert(!showAlert);
  };

  return (
    <React.Fragment>
      <div className="animated fadeIn">
        {fadeUpdatePaymentTypes ? (
          row_data.title.toUpperCase() === "Cash".toUpperCase() ? (
            <CFade timeout={timeout} in={fadeUpdatePaymentTypes}>
              <UpdatePaymentTypeCash
                goBack={goBack}
                payment_types={payment_types}
                update_data={row_data}
              />
            </CFade>
          ) : (
            <CFade timeout={timeout} in={fadeUpdatePaymentTypes}>
              <UpdatePaymentType
                goBack={goBack}
                payment_types={payment_types}
                update_data={row_data}
              />
            </CFade>
          )
        ) : (
          ""
        )}
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="c-icon c-icon-sm"
                            role="img"
                          >
                            <polygon
                              fill="var(--ci-primary-color, currentColor)"
                              points="440 240 272 240 272 72 240 72 240 240 72 240 72 272 240 272 240 440 272 440 272 272 440 272 440 240"
                              className="ci-primary"
                            ></polygon>
                          </svg>
                          ADD PAYMENT TYPE
                        </CButton>
                        {payments_type.filter((item) => item.isDeleted === true)
                          .length > 0 ? (
                          <ConformationAlert
                            button_text="Confirm"
                            heading="Delete payment type"
                            section={`Are you sure you want to delete the payment type (${payments_type
                              .filter((item) => item.isDeleted === true)
                              .map((item) => {
                                return item.name;
                              })
                              .join(",")}) ?`}
                            buttonAction={deletePayments}
                            show_alert={showAlert}
                            hideAlert={setShowAlert}
                            variant="outline"
                            color="danger"
                            className="btn-square pull-right ml-2"
                            block={false}
                          />
                        ) : (
                          ""
                        )}
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <PaymentTypesDatatableNew payments={payments_type} />
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
