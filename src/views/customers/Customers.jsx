import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CSelect,
  CForm,
  CFormGroup,
  CCardHeader,
  CCardBody,
  CCollapse,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CLink,
  CButton,
  CFade,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import CustomerDatatable from "../../datatables/customers/CustomerDatatable.jsx";
import ConformationAlert from "../../components/conformationAlert/ConformationAlert";
import AddCustomer from "../../components/customers/AddCustomer.jsx";
import { useSelector, useDispatch } from "react-redux";

const Customers = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [fadeCustomer, setFadeCustomer] = useState(true);
  const [fadeUpdateCustomer, setUpdateCustomer] = useState(false);
  const [fadeAddCustomer, setFadeAddCustomer] = useState(false);
  const [timeout] = useState(300);

  // useEffect(() => {
  //   if (item.redirect_update !== undefined && item.redirect_update === true) {
  //     setFadeCustomer(false);
  //     setFadeAddCustomer(false);
  //     setUpdateCustomer(true);
  //   }
  // }, [item.redirect_update]);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const deleteCustomer = () => {
    console.log("delete");
    // const item_id = item.item_list
    //   .filter((item) => item.isDeleted === true)
    //   .map((item) => {
    //     return item._id;
    //   });
    // // dispatch(delete_item_list(JSON.stringify(item_id)));
    // setShowAlert(!showAlert);
  };

  const hideAlert = () => {
    setShowAlert(!showAlert);
  };

  const addCustomer = () => {
    setFadeCustomer(false);
    setFadeAddCustomer(true);
    setUpdateCustomer(false);
    // dispatch(redirect_back_items(false));
  };

  const goBack = () => {
    setFadeCustomer(true);
    setFadeAddCustomer(false);
    setUpdateCustomer(false);
    // dispatch(redirect_back_items(true));
  };

  return (
    <React.Fragment>
      <div className="animated fadeIn">
        {fadeUpdateCustomer ? (
          <CFade timeout={timeout} in={fadeUpdateCustomer}>
            Update
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
                        {true ? (
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
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CustomerDatatable customers={[]} />
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
