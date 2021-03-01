import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInvalidFeedback,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CLink,
  CCollapse,
  CSelect,
  CFormText,
} from "@coreui/react";
import { MdMailOutline, MdAccountCircle } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { TextMask, InputAdapter } from "react-text-mask-hoc";
import { CIcon } from "@coreui/icons-react";
import NumberFormat from "react-number-format";
import ConformationAlert from "../../conformationAlert/ConformationAlert";
import {
  update_employee,
  delete_employee,
} from "../../../actions/employee/employeeListActions";
import validator from "validator";

const EditEmployee = (props) => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    checkAll: true,
    sendMail: true,
    enablePin: false,
    posPin: "0000",
    allowBackOffice: "",
    pos: "",
    roleName: "",
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
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const employee = useSelector(
    (state) => state.employeeReducers.employeeListReducer
  );

  // let Roles = [
  //   { id: "1", name: "Administrator" },
  //   { id: "2", name: "Manager" },
  //   { id: "3", name: "Cashier" },
  // ];

  useEffect(() => {
    if (
      employee.redirect_employee !== undefined &&
      employee.redirect_employee === true
    )
      props.goBack();
  }, [dispatch, employee.redirect_employee]);

  useEffect(() => {
    if (props.employee_row_data !== undefined) {
      if (props.store !== undefined) {
        let stores = props.store;

        (props.employee_row_data.stores || []).map((ite) => {
          return (stores = stores.slice().map((item) => {
            if (item._id === ite.id) {
              return {
                ...item,
                isSelected: true,
              };
            }
            return item;
          }));
        });
        setFields({
          ...fields,
          checkAll:
            stores.filter((item) => item.isSelected === true).length ===
              props.store.length && props.store.length > 0
              ? true
              : false,
        });
        setStoreId(stores);
      }

      setFields({
        ...fields,
        name: props.employee_row_data.name,
        email: props.employee_row_data.email,
        phone: props.employee_row_data.phone,
        role:
          props.employee_row_data.role_id !== undefined &&
          props.employee_row_data.role_id !== undefined
            ? props.employee_row_data.role_id
            : "0",
        roleName:
          props.employee_row_data.role !== undefined &&
          props.employee_row_data.role["name"] !== undefined
            ? props.employee_row_data.role["name"]
            : "",
        sendMail:
          props.employee_row_data.role !== undefined &&
          props.employee_row_data.role["name"] === "Administrator"
            ? props.employee_row_data.sendMail === undefined
              ? true
              : props.employee_row_data.sendMail
            : true,
        posPin:
          props.employee_row_data.role !== undefined &&
          props.employee_row_data.role["name"] !== "Administrator"
            ? props.employee_row_data.posPin === undefined
              ? "0000"
              : props.employee_row_data.posPin
            : "0000",
        enablePin:
          props.employee_row_data.enablePin !== undefined
            ? props.employee_row_data.enablePin
            : false,
        allowBackOffice:
          props.employee_row_data.role !== undefined &&
          props.employee_row_data.role["id"] !== undefined
            ? (props.user_roles || [])
                .filter(
                  (item) => item.role_id === props.employee_row_data.role["id"]
                )
                .map((item) => {
                  return item.allowBackoffice;
                })[0]
            : "0",
        pos:
          props.employee_row_data.role !== undefined &&
          props.employee_row_data.role["id"] !== undefined
            ? (props.user_roles || [])
                .filter(
                  (item) => item.role_id === props.employee_row_data.role["id"]
                )
                .map((item) => {
                  return item.allowPOS;
                })[0]
            : "0",
      });
    }
  }, [props, props.employee_row_data]);

  useEffect(() => {
    if (
      employee.redirect_employee !== undefined &&
      employee.redirect_employee === true
    ) {
      props.goBack();
    }
  }, [dispatch, employee.redirect_employee]);

  const goBack = () => {
    props.goBack();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "role") {
      const allowBackOffice = (props.user_roles || [])
        .filter((item) => item.role_id === props.employee_row_data.role_id)
        .map((item) => {
          return item.allowBackoffice;
        })[0];
      const pos = (props.user_roles || [])
        .filter((item) => item.role_id === props.employee_row_data.role_id)
        .map((item) => {
          return item.allowPOS;
        })[0];
      setFields({
        ...fields,
        posPin: "0000",
        [name]: value,
        allowBackOffice: allowBackOffice,
        pos: pos,
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

  const updateEmployee = () => {
    if (fields.name === "" || fields.name === undefined) {
      setErrors({
        ...errors,
        name: validator.isEmpty(fields.name),
      });
      return false;
    }
    // else if (fields.email === "" || fields.email === undefined) {
    //   setErrors({
    //     ...errors,
    //     email: validator.isEmpty(fields.email),
    //   });
    //   return false;
    // } else if (fields.phone === "" || fields.phone === undefined) {
    //   setErrors({
    //     ...errors,
    //     phone: validator.isEmpty(fields.phone),
    //   });
    //   return false;
    // }
    else if (fields.role === "0" || fields.role === undefined) {
      setErrors({
        ...errors,
        role: true,
      });
      return false;
    } else if (
      props.user_roles
        .filter((item) => item.role_id === fields.role)
        .map((item) => {
          return item.allowPOS;
        })[0] === true &&
      fields.posPin === "0000"
    ) {
      setErrors({
        ...errors,
        posPin: true,
      });
      return false;
    } else {
      const data = {
        id: props.employee_row_data._id,
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        enablePin: fields.enablePin,
        stores: JSON.stringify(
          storeId
            .filter((item) => item.isSelected === true)
            .map((item) => {
              return {
                id: item._id,
                name: item.title,
              };
            })
        ),
        roles: JSON.stringify(
          props.user_roles
            .filter((item) => item.role_id === fields.role)
            .map((item) => {
              return {
                id: item.role_id,
                name: item.roleName,
              };
            })[0]
        ),
      };
      if (
        props.user_roles
          .filter((item) => item.role_id === fields.role)
          .map((item) => {
            return item.allowBackoffice;
          })[0] === true
      ) {
        data.sendMail = fields.sendMail;
      }
      if (
        props.user_roles
          .filter((item) => item.role_id === fields.role)
          .map((item) => {
            return item.allowPOS;
          })[0] === true
      ) {
        data.posPin = fields.posPin;
      }
      dispatch(update_employee(data));
    }
  };

  const changeMailStatus = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: !fields.sendMail,
    });
  };
  const changePinEnable = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: !fields.enablePin,
    });
  };
  const delete_employee_record = () => {
    const data = [props.employee_row_data._id];
    dispatch(delete_employee(JSON.stringify(data)));
    setShowAlert(!showAlert);
  };

  return (
    <React.Fragment>
      <CRow className="justify-content-left">
        <CCol md="9" lg="9" xl="6">
          <CCard>
            <CCardBody className="p-2">
              <CCol
                md="4"
                lg="4"
                xl="4"
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "40%",
                }}
              >
                <MdAccountCircle style={{ width: "150px", height: "150px" }} />
              </CCol>{" "}
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
                    disabled={fields.roleName.toUpperCase() == "OWNER"}
                  />
                  <CInvalidFeedback>
                    {errors.email === true ? "Please Enter Employee Email" : ""}
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
                    {errors.phone === true ? "Please Enter Employee Phone" : ""}
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
                  {props.employee_row_data.role !== undefined &&
                  props.employee_row_data.role["name"] !== undefined ? (
                    props.employee_row_data.role["name"] == "onwer" ||
                    props.employee_row_data.role["name"] == "Owner" ? (
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
                        <option value={props.employee_row_data.role["id"]}>
                          {props.employee_row_data.role["name"]}
                        </option>
                      </CSelect>
                    ) : (
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
                        {(props.user_roles || []).map((item, index) => {
                          return item.roleName !== "owner" &&
                            item.roleName !== "Owner" ? (
                            <React.Fragment>
                              <option value={item.role_id} key={index}>
                                {item.roleName}
                              </option>
                            </React.Fragment>
                          ) : null;
                        })}
                      </CSelect>
                    )
                  ) : (
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
                      {(props.user_roles || []).map((item, index) => {
                        return (
                          <option value={item._id} key={index}>
                            {item.roleName}
                          </option>
                        );
                      })}
                    </CSelect>
                  )}

                  <CInvalidFeedback>
                    {errors.role === true ? "Please Enter Employee Role" : ""}
                  </CInvalidFeedback>
                </CInputGroup>
                {fields.allowBackOffice === true && fields.pos === true ? (
                  <React.Fragment>
                    <CFormGroup variant="custom-checkbox" inline key={0}>
                      <CInputCheckbox
                        custom
                        name="sendMail"
                        id={"sendMail"}
                        value={fields.sendMail}
                        checked={fields.sendMail}
                        onChange={changeMailStatus}
                      />
                      <CLabel variant="custom-checkbox" htmlFor={"sendMail"}>
                        Invite to the back office
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-checkbox" inline key={0}>
                      <CInputCheckbox
                        custom
                        name="enablePin"
                        id={"enablePin"}
                        value={fields.enablePin}
                        checked={fields.enablePin}
                        onChange={changePinEnable}
                      />
                      <CLabel variant="custom-checkbox" htmlFor={"enablePin"}>
                        Enable Pin
                      </CLabel>
                    </CFormGroup>
                    {fields.enablePin ? (
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
                            invalid={errors.posPin}
                            className={
                              errors.posPin === true
                                ? "form-control is-invalid"
                                : "form-control"
                            }
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
                  </React.Fragment>
                ) : fields.allowBackOffice === true ? (
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
                ) : fields.pos === true && fields.enablePin ? (
                  <React.Fragment>
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
                          invalid={errors.posPin}
                          className={
                            errors.posPin === true
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                        />
                        <CInvalidFeedback>
                          {errors.posPin === true
                            ? "Please Enter POS  Pin"
                            : ""}
                        </CInvalidFeedback>
                      </CInputGroup>
                    </CFormGroup>
                  </React.Fragment>
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
                          collapse[0] ? "cil-chevron-bottom" : "cil-chevron-top"
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
                          collapse[0] ? "cil-chevron-bottom" : "cil-chevron-top"
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
                        disabled={fields.roleName.toUpperCase() == "OWNER"}
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
                      <CFormGroup variant="custom-checkbox" inline key={index}>
                        <CInputCheckbox
                          custom
                          name="storeId"
                          id={"storeId" + item._id}
                          value={item._id}
                          checked={item.isSelected}
                          onChange={storeHandleChange}
                          disabled={fields.roleName.toUpperCase() == "OWNER"}
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
            {/*  <CCol sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
              <ConformationAlert
                button_text="Delete"
                heading="Delete Employee"
                section="Are you sure you want to delete Employee?"
                buttonAction={delete_employee_record}
                show_alert={showAlert}
                hideAlert={setShowAlert}
                variant="outline"
                className="btn-pill pull-right"
                color="danger"
                block={true}
              />
            </CCol>*/}
            <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0 pull-right">
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
            <CCol
              sm="6"
              md="6"
              xl="xl"
              className="mb-3 mb-xl-0 form-actions pull-right"
            >
              <CButton
                block
                type="submit"
                variant="outline"
                className="btn-pill pull-right"
                color="success"
                onClick={updateEmployee}
              >
                UPDATE
              </CButton>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};

export default EditEmployee;
