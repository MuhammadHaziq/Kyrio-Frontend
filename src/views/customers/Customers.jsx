import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CForm,
  CFormGroup,
  CCardHeader,
  CCardBody,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CButton,
  CFade,
} from "@coreui/react";
import CustomerDatatable from "../../datatables/customers/CustomerDatatable.jsx";
import ConformationAlert from "../../components/conformationAlert/ConformationAlert";
import AddCustomer from "../../components/customers/AddCustomer.jsx";
import ViewCustomer from "../../components/customers/ViewCustomer.jsx";
import {
  redirect_back_customer,
  get_customers,
  get_customers_search,
  delete_customer,
} from "../../actions/customer/customerActions";
import { useSelector, useDispatch } from "react-redux";

const Customers = () => {
  const dispatch = useDispatch();
  const customer = useSelector(
    (state) => state.customerReducers.customerReducer
  );
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [fadeCustomer, setFadeCustomer] = useState(true);
  const [fadeCustomerView, setCustomerView] = useState(false);
  const [fadeAddCustomer, setFadeAddCustomer] = useState(false);
  const [timeout] = useState(300);

  useEffect(() => {
    if (
      customer.customer_view !== undefined &&
      customer.customer_view === true
    ) {
      setFadeCustomer(false);
      setFadeAddCustomer(false);
      setCustomerView(true);
    }
  }, [customer.customer_view]);

  useEffect(() => {
    dispatch(get_customers());
  }, [dispatch]);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const deleteCustomer = () => {
    const customer_id = customer.customer_detail
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    dispatch(delete_customer(JSON.stringify(customer_id)));
    setShowAlert(!showAlert);
  };
  const addCustomer = () => {
    setFadeCustomer(false);
    setFadeAddCustomer(true);
    setCustomerView(false);
    dispatch(redirect_back_customer(false));
  };

  const goBack = () => {
    setFadeCustomer(true);
    setFadeAddCustomer(false);
    setCustomerView(false);
    dispatch(redirect_back_customer(true));
  };

  const searchFilterOnSubmit = (e) => {
    e.preventDefault();
    const data = {
      search: search,
    };
    dispatch(get_customers_search(data));
  };

  const closeSearch = () => {
    setShowSearch(!showSearch);
    setSearch("");
    dispatch(get_customers());
  };

  return (
    <React.Fragment>
      <div className="animated fadeIn">
        {fadeCustomerView ? (
          <CFade timeout={timeout} in={fadeCustomerView}>
            <ViewCustomer goBack={goBack} />
          </CFade>
        ) : (
          ""
        )}
        {fadeAddCustomer ? (
          <CFade timeout={timeout} in={fadeAddCustomer}>
            <AddCustomer goBack={goBack} />
          </CFade>
        ) : (
          ""
        )}
        {fadeCustomer ? (
          <React.Fragment>
            <CRow>
              <CCol xs="12" sm="12">
                <CCard>
                  <CCardHeader>
                    <CRow>
                      <CCol
                        xs="12"
                        sm="4"
                        md="4"
                        xl="xl"
                        className="mb-3 mb-xl-0"
                      >
                        <CButton
                          color="success"
                          className="btn-square pull right"
                          onClick={addCustomer}
                        >
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
                          ADD CUSTOMER
                        </CButton>
                        {customer.customer_detail.filter(
                          (item) => item.isDeleted === true
                        ).length > 0 ? (
                          <React.Fragment>
                            <ConformationAlert
                              button_text="Delete"
                              heading="Delete Customer"
                              section={`Are you sure you want to delete the customer? Upon deleting, his or her data will no longer be displayed in associated receipts.`}
                              buttonAction={deleteCustomer}
                              show_alert={showAlert}
                              hideAlert={setShowAlert}
                              variant="outline"
                              className="ml-2 btn-square"
                              color="danger"
                              block={false}
                            />
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                      </CCol>
                      <CCol xs="12" sm="8" md="8" xl="xl">
                        {showSearch == false ? (
                          <React.Fragment>
                            <svg
                              viewBox="0 0 20 20"
                              className="c-icon c-icon-lg"
                              role="img"
                              style={{
                                marginTop: "10px",
                                cursor: "pointer",
                                float: "right",
                              }}
                              onClick={() => setShowSearch(!showSearch)}
                            >
                              <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                            </svg>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <CForm
                              onSubmit={searchFilterOnSubmit}
                              method="post"
                            >
                              <CFormGroup>
                                <div className="controls">
                                  <CInputGroup className="input-prepend">
                                    <CInput
                                      id="prependedInput"
                                      size="50"
                                      type="text"
                                      name="search"
                                      placeholder="Search By Name , Email"
                                      onChange={handleOnChange}
                                    />
                                    <CInputGroupPrepend onClick={closeSearch}>
                                      <CInputGroupText>X</CInputGroupText>
                                    </CInputGroupPrepend>
                                  </CInputGroup>
                                </div>
                              </CFormGroup>
                            </CForm>
                          </React.Fragment>
                        )}
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CustomerDatatable customers={customer.customer_detail} />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};

export default Customers;
//
