import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInvalidFeedback,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CSpinner,
  CFade,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CLink,
  CCollapse,
  CSelect,
  CFormText,
} from "@coreui/react";
import {
  MdPerson,
  MdLock,
  MdBusiness,
  MdFlag,
  MdKeyboardArrowLeft,
  MdMailOutline,
  MdLocationOn,
  MdNote,
  MdPermContactCalendar,
  MdStar,
  MdShoppingBasket,
  MdAccountCircle,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { TextMask, InputAdapter } from "react-text-mask-hoc";
import { CIcon } from "@coreui/icons-react";
import NumberFormat from "react-number-format";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

import { add_new_employee } from "../../../actions/employee/employeeListActions";
import validator from "validator";

const AddEmployee = (props) => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    checkAll: true,
    sendMail: true,
    posPin: "0000",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    role: false,
    posPin: false,
  });
  const [storeId, setStoreId] = useState([]);
  const [collapse, setCollapse] = useState([true, true]);

  const dispatch = useDispatch();
  const employee = useSelector(
    (state) => state.employeeReducers.employeeListReducer
  );
  useEffect(() => {
    if (props.store !== undefined) {
      const stores = props.store.slice().map((item) => {
        return {
          ...item,
          isSelected: true,
        };
      });
      setStoreId(stores);
    }
  }, [props.store]);

  useEffect(() => {
    if (
      employee.redirect_employee !== undefined &&
      employee.redirect_employee === true
    ) {
      props.goBack();
    }
  }, [employee.redirect_employee]);

  let Roles = [
    { _id: "1", title: "Administrator" },
    { _id: "2", title: "Manager" },
    { _id: "3", title: "Cashier" },
  ];

  const goBack = () => {
    props.goBack();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "role") {
      setFields({
        ...fields,
        posPin: "0000",
        [name]: value,
      });
    } else {
      setFields({
        ...fields,
        [name]: value,
      });
    }
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "role" && e.target.value === "0") {
      setErrors({
        ...errors,
        role: true,
      });
    } else {
      setErrors({
        ...errors,
        [name]: validator.isEmpty(value),
      });
    }
  };

  const storeHandleChange = (e) => {
    let selectedStore = [];
    if (e.target.value === "0") {
      setFields({
        ...fields,
        checkAll: !fields.checkAll,
      });
      selectedStore = storeId.slice().map((item) => {
        return {
          ...item,
          isSelected: !fields.checkAll === true ? true : false,
          // !item.isSelected,
        };
      });
    } else {
      selectedStore = storeId.slice().map((item) => {
        if (item._id === e.target.value) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return item;
      });
    }
    setFields({
      ...fields,
      checkAll:
        selectedStore.filter((item) => item.isSelected === true).length ===
          props.store.length && props.store.length > 0
          ? true
          : false,
    });

    setStoreId(selectedStore);
  };

  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };

  const saveEmployee = () => {
    if (fields.name === "") {
      setErrors({
        ...errors,
        name: validator.isEmpty(fields.name),
      });
      return false;
    } else if (fields.email === "") {
      setErrors({
        ...errors,
        email: validator.isEmpty(fields.email),
      });
      return false;
    } else if (fields.phone === "") {
      setErrors({
        ...errors,
        phone: validator.isEmpty(fields.phone),
      });
      return false;
    } else if (fields.role === "0") {
      setErrors({
        ...errors,
        role: true,
      });
      return false;
    } else {
      const data = {
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        // role: fields.role,
        stores: storeId
          .filter((item) => item.isSelected === true)
          .map((item) => {
            return {
              id: item._id,
              name: item.title,
            };
          }),
        roles: Roles.filter((item) => item._id === fields.role).map((item) => {
          return item;
        })[0],
      };
      if (
        Roles.filter((item) => item._id === fields.role).map((item) => {
          return item.title;
        })[0] === "Administrator"
      ) {
        data.sendMail = fields.sendMail;
      } else if (
        Roles.filter((item) => item._id === fields.role).map((item) => {
          return item.title;
        })[0] !== "Administrator"
      ) {
        data.posPin = fields.posPin;
      }
      console.log(data);
      dispatch(add_new_employee(data));
    }
  };

  return (
    <React.Fragment>
      <CContainer>
        <CRow className="justify-content-left">
          <CCol md="9" lg="9" xl="6">
            <CCard>
              <CCardBody className="p-2">
                <MdAccountCircle style={{ width: "150px", height: "150px" }} />
                <CFormGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <MdMailOutline />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={fields.name}
                      onChange={handleOnChange}
                      onBlur={handleOnBlur}
                      invalid={errors.name}
                    />
                    <CInvalidFeedback>
                      {errors.name === true ? "Please Enter Employee Name" : ""}
                    </CInvalidFeedback>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
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
                      onChange={handleOnChange}
                      onBlur={handleOnBlur}
                      invalid={errors.email}
                    />
                    <CInvalidFeedback>
                      {errors.email === true
                        ? "Please Enter Employee Email"
                        : ""}
                    </CInvalidFeedback>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
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
                      className={
                        errors.phone === true
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      name="phone"
                      value={fields.phone}
                      onChange={handleOnChange}
                      onBlur={handleOnBlur}
                      invalid={errors.phone}
                    />
                    <CInvalidFeedback>
                      {errors.phone === true
                        ? "Please Enter Employee Phone"
                        : ""}
                    </CInvalidFeedback>
                  </CInputGroup>
                  <CFormText color="muted">ex. (999) 999-9999</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <MdAccountCircle />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect
                      className={
                        errors.role === true
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      custom
                      size="md"
                      name="role"
                      id="role"
                      value={fields.role}
                      onChange={handleOnChange}
                      onBlur={handleOnBlur}
                      invalid={errors.role}
                    >
                      <option value="0">Select Role</option>
                      {Roles.map((item, index) => {
                        return (
                          <option value={item._id} key={index}>
                            {item.title}
                          </option>
                        );
                      })}
                    </CSelect>

                    <CInvalidFeedback>
                      {errors.role === true ? "Please Enter Employee Role" : ""}
                    </CInvalidFeedback>
                  </CInputGroup>
                  {fields.role === "1" ? (
                    <React.Fragment>
                      <CFormGroup variant="custom-checkbox" inline key={0}>
                        <CInputCheckbox
                          custom
                          name="sendMail"
                          id={"sendMail"}
                          value={fields.sendMail}
                          checked={fields.sendMail}
                          onChange={handleOnChange}
                        />
                        <CLabel variant="custom-checkbox" htmlFor={"sendMail"}>
                          Invite to the back office
                        </CLabel>
                      </CFormGroup>
                    </React.Fragment>
                  ) : fields.role !== "0" && fields.role !== "" ? (
                    <CFormGroup>
                      <CLabel htmlFor="posPin">POS PIN</CLabel>
                      <CInputGroup>
                        <NumberFormat
                          id="posPin"
                          name="posPin"
                          value={fields.posPin}
                          format="# # # #"
                          mask="_"
                          onChange={handleOnChange}
                          onBlur={handleOnBlur}
                          className="form-control"
                        />
                        <CInvalidFeedback>
                          {errors.posPin === true
                            ? "Please Enter POS  Pin"
                            : ""}
                        </CInvalidFeedback>
                      </CInputGroup>
                    </CFormGroup>
                  ) : (
                    ""
                  )}
                </CFormGroup>
              </CCardBody>
              {collapse[0] ? (
                <CCardFooter>
                  <h4>
                    Stores
                    <div className="card-footer-actions float-right">
                      <CLink
                        className="card-footer-action"
                        onClick={() => toggle(0)}
                      >
                        <CIcon
                          name={
                            collapse[0]
                              ? "cil-chevron-bottom"
                              : "cil-chevron-top"
                          }
                        />
                      </CLink>
                    </div>
                  </h4>
                  <span>
                    <small>
                      {storeId.filter((item) => item.isSelected === false)
                        .length === 0
                        ? "Available in all stores"
                        : "Not available in stores"}
                    </small>
                  </span>
                </CCardFooter>
              ) : (
                ""
              )}
            </CCard>
            <CCollapse show={!collapse[0]}>
              <CCard>
                <CCardHeader>
                  <h4>
                    <strong>Stores</strong>
                    <div className="card-header-actions">
                      <CLink
                        className="card-header-action"
                        onClick={() => toggle(0)}
                      >
                        <CIcon
                          name={
                            collapse[0]
                              ? "cil-chevron-bottom"
                              : "cil-chevron-top"
                          }
                        />
                      </CLink>
                    </div>
                  </h4>
                </CCardHeader>
                <CCardBody>
                  <CFormGroup>
                    <CCol md="12">
                      <CLabel>Select Store</CLabel>
                    </CCol>
                    <CCol md="9">
                      <CFormGroup variant="custom-checkbox" inline>
                        <CInputCheckbox
                          custom
                          name="checkAll"
                          id={"checkAll"}
                          value={0}
                          checked={fields.checkAll}
                          onChange={storeHandleChange}
                        />
                        <CLabel variant="custom-checkbox" htmlFor={"checkAll"}>
                          {storeId.filter((item) => item.isSelected !== true)
                            .length === 0
                            ? "UnSelect All"
                            : "Select All"}
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                    <CCol md="8">
                      {storeId.map((item, index) => (
                        <CFormGroup
                          variant="custom-checkbox"
                          inline
                          key={index}
                        >
                          <CInputCheckbox
                            custom
                            name="storeId"
                            id={"storeId" + item._id}
                            value={item._id}
                            checked={item.isSelected}
                            onChange={storeHandleChange}
                          />
                          <CLabel
                            variant="custom-checkbox"
                            htmlFor={"storeId" + item._id}
                          >
                            {item.title}
                          </CLabel>
                        </CFormGroup>
                      ))}
                    </CCol>
                  </CFormGroup>
                </CCardBody>
              </CCard>
            </CCollapse>
            <CRow>
              <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  block
                  variant="outline"
                  className="btn-pill pull-right"
                  color="secondary"
                  onClick={goBack}
                >
                  BACK
                </CButton>
              </CCol>
              <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  block
                  variant="outline"
                  className="btn-pill pull-right"
                  color="danger"
                  onClick={goBack}
                >
                  CANCEL
                </CButton>
              </CCol>
              <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0 form-actions">
                <CButton
                  block
                  type="submit"
                  variant="outline"
                  className="btn-pill pull-right"
                  color="success"
                  onClick={saveEmployee}
                >
                  SAVE
                </CButton>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
    </React.Fragment>
  );
};

export default AddEmployee;
