import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CFade,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CLabel,
  CFormGroup,
} from "@coreui/react";
import {
  MdKeyboardArrowLeft,
  MdMailOutline,
  MdLocationOn,
  MdNote,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { TextMask, InputAdapter } from "react-text-mask-hoc";
import CIcon from "@coreui/icons-react";
import NumberFormat from "react-number-format";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import dateFormat from "dateformat";
import EditCustomer from "./EditCustomer.jsx";
import {
  update_points_balance,
  edit_profile_view,
} from "../../actions/customer/customerActions";
import { amountFormat } from "../../utils/helpers";

const ViewCustomer = (props) => {
  const decimal = useSelector((state) => state.auth.user.decimal);

  const [fadeUpdateCustomer, setFadeUpdateCustomer] = useState(false);
  const [fadeViewCustomer, setFadeAddCustomer] = useState(true);

  const [modal, setModal] = useState(false);
  const [timeout] = useState(300);
  const [showAlert, setShowAlert] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    postal_code: "",
    country: "",
    customerCode: "",
    note: "",
    points_balance: "0.00",
    new_points_balance: "",
    first_visit: "",
    last_visit: "",
    total_points: 0,
    total_spent: 0,
    total_visits: 0,
  });

  const dispatch = useDispatch();
  const msg = useSelector((state) => state.msg);
  const customer = useSelector(
    (state) => state.customerReducers.customerReducer
  );

  useEffect(() => {
    if (
      customer.redirect_update !== undefined &&
      customer.redirect_update === true
    ) {
      setFadeUpdateCustomer(true);
      setFadeAddCustomer(false);
    }
  }, [customer.redirect_update]);

  useEffect(() => {
    if (
      customer.customer_view !== undefined &&
      customer.customer_view === true
    ) {
      setFadeUpdateCustomer(false);
      setFadeAddCustomer(true);
    }
  }, [customer.customer_view]);

  useEffect(() => {
    if (
      customer.redirect_customer !== undefined &&
      customer.redirect_customer === true
    ) {
      props.goBack();
    }
  }, [customer.redirect_customer]);

  useEffect(() => {
    if (
      customer.customer_row_data !== undefined &&
      customer.customer_row_data !== null
    ) {
      setFields({
        name: customer.customer_row_data.name || "",
        email: customer.customer_row_data.email || "",
        phone: customer.customer_row_data.phone || "",
        address: customer.customer_row_data.address || "",
        city: customer.customer_row_data.city || "",
        region: customer.customer_row_data.region || "",
        postal_code: customer.customer_row_data.postal_code || "",
        country: customer.customer_row_data.country || "",
        customerCode: customer.customer_row_data.customer_code || "",
        note: customer.customer_row_data.note || "",
        points_balance: customer.customer_row_data.points_balance || "",
        new_points_balance: customer.customer_row_data.points_balance || "",
        first_visit: customer.customer_row_data.first_visit || "",
        last_visit: customer.customer_row_data.last_visit || "",
        total_points: customer.customer_row_data.total_points || 0,
        total_spent: customer.customer_row_data.total_spent || 0,
        total_visits: customer.customer_row_data.total_visits || 0,
      });
    }
  }, [customer.customer_row_data]);

  const goBack = () => {
    props.goBack();
  };

  const editProfile = () => {
    dispatch(edit_profile_view(true, false));
  };

  const toggle = () => {
    setModal(!modal);
    setFields({
      ...fields,
      new_points_balance: fields.points_balance,
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const save_points_balance = () => {
    const data = {
      _id: customer.customer_row_data._id,
      points_balance: fields.new_points_balance,
    };
    dispatch(update_points_balance(data));
    setModal(!modal);
  };

  const deleteCustomer = () => {
    const data = [customer.customer_row_data._id];
    confirmAlert({
      title: "Delete Customer",
      message: `Are you sure you want to delete the customer? Upon deleting, his or her data will no longer be displayed in associated receipts.`,
      buttons: [
        {
          label: "Cancle",
          onClick: hideAlert,
        },
        {
          label: "Delete",
          // onClick: dispatch(delete_customer(JSON.stringify(data))),
        },
      ],
    });
    //
    setShowAlert(!showAlert);
  };

  const hideAlert = () => {
    setShowAlert(!showAlert);
  };

  const address =
    fields.address !== "" &&
    fields.address !== undefined &&
    fields.address !== null
      ? fields.address + ", "
      : "";
  const city =
    fields.city !== "" && fields.city !== undefined && fields.city !== null
      ? fields.city + ", "
      : "";
  const region =
    fields.region !== "" &&
    fields.region !== undefined &&
    fields.region !== null
      ? fields.region + ", "
      : "";
  const postal_code =
    fields.postal_code !== "" &&
    fields.postal_code !== undefined &&
    fields.postal_code !== null
      ? fields.postal_code + ", "
      : "";
  const country =
    fields.country !== "" &&
    fields.country !== undefined &&
    fields.country !== null
      ? fields.country
      : "";
  const fullAddress = address + city + region + postal_code + country;

  return (
    <div className="flex-row align-items-center">
      {fadeUpdateCustomer ? (
        <CFade timeout={timeout} in={fadeUpdateCustomer}>
          <EditCustomer goBack={goBack} />
        </CFade>
      ) : (
        ""
      )}
      {fadeViewCustomer ? (
        <React.Fragment>
          <CContainer>
            <CRow className="justify-content-left">
              <CCol md="9" lg="7" xl="6">
                <CCard>
                  <CCardHeader>
                    <CRow>
                      <CCol
                        xs="12"
                        sm="6"
                        md="6"
                        xl="xl"
                        className="mb-xl-0"
                        style={{ marginLeft: "-38px" }}
                      >
                        <CButton
                          color="default"
                          className="btn-square pull-left"
                          variant="outline"
                          block
                          onClick={goBack}
                        >
                          <MdKeyboardArrowLeft /> Customer Base
                        </CButton>
                      </CCol>
                      <CCol
                        xs="12"
                        sm="6"
                        md="6"
                        xl="xl"
                        className="mb-xl-0"
                        style={{ marginLeft: "38px" }}
                      >
                        <CButton
                          color="default"
                          className="btn-square pull-left"
                          variant="outline"
                          onClick={editProfile}
                        >
                          Edit Profile
                        </CButton>
                        <CDropdown style={{ float: "right" }}>
                          <CDropdownToggle caret color="default">
                            More
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem onClick={toggle}>
                              Edit Points Balance
                            </CDropdownItem>
                            <CDropdownItem onClick={deleteCustomer}>
                              Delete
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody className="p-2">
                    <CForm>
                      <h1 style={{ textAlign: "center" }}>{fields.name}</h1>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <MdMailOutline />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          id="email"
                          name="email"
                          placeholder="Email"
                          value={fields.email}
                          disabled
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-phone" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <TextMask
                          mask={[
                            "(",
                            /[1-9]/,
                            /\d/,
                            /\d/,
                            ")",
                            " ",
                            /\d/,
                            /\d/,
                            /\d/,
                            "-",
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                          ]}
                          Component={InputAdapter}
                          className={"form-control"}
                          name="phone"
                          value={fields.phone}
                          disabled
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <MdLocationOn />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          id="address"
                          name="address"
                          placeholder="Address"
                          value={fullAddress}
                          disabled
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <MdNote />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          id="note"
                          name="note"
                          placeholder="Note"
                          value={fields.note}
                          disabled
                        />
                      </CInputGroup>
                      <hr />
                      <CRow>
                        <CCol
                          xs="12"
                          sm="12"
                          md="6"
                          xl="xl"
                          className="mb-xl-0"
                        >
                          <CFormGroup>
                            <CLabel htmlFor="first_visit">
                              <strong>First Visit</strong>
                            </CLabel>
                            <CInputGroup className="mb-3">
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-calendar" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                id="first_visit"
                                name="first_visit"
                                placeholder="First visit"
                                value={dateFormat(
                                  fields.first_visit,
                                  "mmm dd, yyyy"
                                )}
                                disabled
                              />
                            </CInputGroup>
                          </CFormGroup>
                        </CCol>
                        <CCol
                          xs="12"
                          sm="12"
                          md="6"
                          xl="xl"
                          className="mb-xl-0"
                        >
                          <CFormGroup>
                            <CLabel htmlFor="last_visit">
                              <strong>Last Visit</strong>
                            </CLabel>
                            <CInputGroup className="mb-3">
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-calendar" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                id="last_visit"
                                name="last_visit"
                                placeholder="Last visit"
                                value={dateFormat(
                                  fields.last_visit,
                                  "mmm dd, yyyy hh:mm tt"
                                )}
                                disabled
                              />
                            </CInputGroup>
                          </CFormGroup>
                        </CCol>
                        <CCol
                          xs="12"
                          sm="12"
                          md="6"
                          xl="xl"
                          className="mb-xl-0"
                        >
                          <CFormGroup>
                            <CLabel htmlFor="Visits">
                              <strong>Visits</strong>
                            </CLabel>
                            <CInputGroup className="mb-3">
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-basket" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                id="Visits"
                                name="Visits"
                                placeholder="Total visit"
                                value={fields.total_visits}
                                disabled
                              />
                            </CInputGroup>
                          </CFormGroup>
                        </CCol>
                        <CCol
                          xs="12"
                          sm="12"
                          md="6"
                          xl="xl"
                          className="mb-xl-0"
                        >
                          <CFormGroup>
                            <CLabel htmlFor="total_spent">
                              <strong>Total spent</strong>
                            </CLabel>
                            <CInputGroup className="mb-3">
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-dollar" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                id="total_spent"
                                name="total_spent"
                                placeholder="Total visit"
                                value={amountFormat(
                                  fields?.total_spent,
                                  parseInt(decimal)
                                )}
                                disabled
                              />
                            </CInputGroup>
                          </CFormGroup>
                        </CCol>
                        <CCol
                          xs="12"
                          sm="12"
                          md="6"
                          xl="xl"
                          className="mb-xl-0"
                        >
                          <CFormGroup>
                            <CLabel htmlFor="total_points">
                              <strong>Points</strong>
                            </CLabel>
                            <CInputGroup className="mb-3">
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-star" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                id="total_points"
                                name="total_points"
                                placeholder="Total points"
                                value={fields.total_points}
                                disabled
                              />
                            </CInputGroup>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>

            {/* Model For Update Points Balance*/}
            <CModal show={modal} onClose={toggle}>
              <CModalHeader closeButton>Edit points balance</CModalHeader>
              <CModalBody>
                <NumberFormat
                  className="form-control"
                  id="new_points_balance"
                  name="new_points_balance"
                  placeholder="Balance"
                  value={fields.new_points_balance}
                  onChange={handleOnChange}
                  decimalScale={decimal}
                  allowNegative={false}
                  thousandSeparator={true}
                />
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={toggle}>
                  CANCEL
                </CButton>
                <CButton color="success" onClick={save_points_balance}>
                  SAVE
                </CButton>
              </CModalFooter>
            </CModal>
            {/* Model For Update Points Balance*/}
          </CContainer>
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default ViewCustomer;
