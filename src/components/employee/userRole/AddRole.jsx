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
  CSwitch,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import validator from "validator";
import parse from "html-react-parser";
import {
  toggleBackOffice,
  togglePOS,
  toggle_back_office_module,
  toggle_pos_module,
  remove_selected_modules,
  add_new_role,
} from "../../../actions/employee/userRolesActions";
// import ConformationAlert from "../../components/conformationAlert/ConformationAlert";
import { useSelector, useDispatch } from "react-redux";
const AddRole = (props) => {
  const dispatch = useDispatch();
  const [roleName, setRoleName] = useState("");
  const [roles, setRoles] = useState({
    checkBackOffice: false,
    checkPos: false,
  });
  const [roleNameError, setRoleNameError] = useState(false);
  const [roleNameDupError, setRoleNameSupError] = useState(false);
  const userRoles = useSelector(
    (state) => state.employeeReducers.userRolesReducer
  );
  const goBack = () => {
    props.goBack();
    dispatch(remove_selected_modules());
  };
  useEffect(() => {
    if (
      userRoles.redirect_user_roles !== undefined &&
      userRoles.redirect_user_roles === true
    ) {
      props.goBack();
    }
  }, [userRoles.redirect_user_roles]);

  useEffect(() => {
    console.log(roleNameDupError);

    dispatch(toggleBackOffice(roles.checkBackOffice));
  }, [roles.checkBackOffice]);

  useEffect(() => {
    dispatch(togglePOS(roles.checkPos));
  }, [roles.checkPos]);

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    setRoleNameError(validator.isEmpty(value));
    setRoleNameSupError(false);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRoleName(value);
  };
  const changeOnBackOffice = (name, value) => {
    setRoles({
      ...roles,
      [name]: !value,
    });
  };
  const backOfficeCheck = (id) => {
    dispatch(toggle_back_office_module(id));
  };
  const posToggleCheck = (id) => {
    dispatch(toggle_pos_module(id));
  };
  const saveUserRole = (e) => {
    if (roleName !== undefined && roleName !== null && roleName.trim() === "") {
      setRoleNameError(validator.isEmpty(roleName));
      return false;
    } else if (roleName.toUpperCase() == "OWNER") {
      setRoleNameSupError(true);
      return false;
    } else {
      const data = {
        name: roleName,
        backoffice:
          userRoles.backOfficeModules !== undefined &&
          userRoles.backOfficeModules !== null &&
          userRoles.backOfficeModules.length > 0
            ? userRoles.backOfficeModules[0]
            : {},
        pos:
          userRoles.posModules !== undefined &&
          userRoles.posModules !== null &&
          userRoles.posModules.length > 0
            ? userRoles.posModules[0]
            : {},
      };
      dispatch(add_new_role(data));
      console.log(data);
    }
  };
  return (
    <React.Fragment>
      <CRow className="justify-content-left">
        <CCol md="6" lg="6" xl="6">
          <CCard>
            <CCardBody className="p-2">
              <CRow>
                <CCol sm="12" md="12" lg="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Name</CLabel>
                    <CInputGroup className="mb-3">
                      <CInput
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={roleName}
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                        invalid={roleNameError || roleNameDupError}
                      />
                      <CInvalidFeedback>
                        {roleNameError === true ? "Please Enter Role Name" : ""}
                        {roleNameDupError === true
                          ? "Role with the same name already exists"
                          : ""}
                      </CInvalidFeedback>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CListGroupItem
                  key={0}
                  className="justify-content-between"
                  style={{
                    border: "none",
                  }}
                >
                  <CRow>
                    <CCol sm="1" md="1" lg="1">
                      <img
                        src="../../../green.png"
                        style={{ height: "40px", width: "40px" }}
                      />
                    </CCol>
                    <CCol sm="10" md="10" lg="10">
                      <div style={{ fontSize: "24px", paddingLeft: "10px" }}>
                        POS
                      </div>

                      <div
                        style={{ paddingLeft: "10px", lineHeight: "normal" }}
                      >
                        {parse(
                          "Employees can log in to the app using personal PIN code"
                        )}
                      </div>
                    </CCol>
                    <CCol md="1" sm="1" lg="1">
                      <CSwitch
                        className={"mx-1 float-right"}
                        shape="pill"
                        color={"success"}
                        checked={roles.checkPos}
                        onChange={() =>
                          changeOnBackOffice("checkPos", roles.checkPos)
                        }
                      />
                    </CCol>
                  </CRow>
                </CListGroupItem>
              </CRow>
              <CCollapse show={roles.checkPos}>
                <CRow>
                  <CCol sm="12" md="12" lg="12">
                    <CListGroup>
                      {userRoles.posModules !== undefined &&
                      userRoles.posModules !== null &&
                      userRoles.posModules.length > 0
                        ? (userRoles.posModules[0].modules || []).map(
                            (item, index) => (
                              <React.Fragment key={index}>
                                <CListGroupItem
                                  key={index}
                                  style={{
                                    border: "none",
                                    marginLeft: "20px",
                                  }}
                                >
                                  <CFormGroup variant="custom-checkbox">
                                    <CInputCheckbox
                                      custom
                                      name="pos_module"
                                      id={"pos_module" + index}
                                      value={item.moduleId}
                                      checked={item.enable}
                                      onChange={() =>
                                        posToggleCheck(item.moduleId)
                                      }
                                      style={{
                                        marginLeft: "0px",
                                        width: "17px",
                                        height: "20px",
                                      }}
                                    />
                                    <CLabel
                                      variant="custom-checkbox"
                                      htmlFor={"pos_module" + index}
                                      style={{
                                        fontWeight: 400,
                                        // color: "rgba(0,0,0,0.87)",
                                      }}
                                    >
                                      {item.moduleName}<br/>
                                      <small
                                        className="mb-1"
                                      >
                                        {item.description}
                                      </small>
                                    </CLabel>
                                  </CFormGroup>
                                </CListGroupItem>
                              </React.Fragment>
                            )
                          )
                        : null}
                    </CListGroup>
                  </CCol>
                </CRow>
              </CCollapse>
              {/**
               *
               *  Back Office
               *
               */}
              <CRow>
                <CListGroupItem
                  key={0}
                  className="justify-content-between"
                  style={{
                    border: "none",
                  }}
                >
                  <CRow>
                    <CCol sm="1" md="1" lg="1">
                      <img
                        src="../../../blue.png"
                        style={{ height: "40px", width: "40px" }}
                      />
                    </CCol>
                    <CCol sm="10" md="10" lg="10">
                      <div style={{ fontSize: "24px", paddingLeft: "10px" }}>
                        Back office
                      </div>

                      <div
                        style={{ paddingLeft: "10px", lineHeight: "normal" }}
                      >
                        {parse(
                          "Employees can log in to the back office using their email and password"
                        )}
                      </div>
                    </CCol>
                    <CCol md="1" sm="1" lg="1">
                      <CSwitch
                        className={"mx-1 float-right"}
                        shape="pill"
                        color={"success"}
                        checked={roles.checkBackOffice}
                        onChange={() =>
                          changeOnBackOffice(
                            "checkBackOffice",
                            roles.checkBackOffice
                          )
                        }
                      />
                    </CCol>
                  </CRow>
                </CListGroupItem>
              </CRow>
              <CCollapse show={roles.checkBackOffice}>
                <CRow>
                  <CCol sm="12" md="12" lg="12">
                    <CListGroup>
                      {userRoles.backOfficeModules !== undefined &&
                      userRoles.backOfficeModules !== null &&
                      userRoles.backOfficeModules.length > 0
                        ? (userRoles.backOfficeModules[0].modules || []).map(
                            (item, index) => (
                              <React.Fragment key={index}>
                                <CListGroupItem
                                  key={index}
                                  style={{
                                    border: "none",
                                    marginLeft: "20px",
                                  }}
                                >
                                  <CFormGroup variant="custom-checkbox">
                                    <CInputCheckbox
                                      custom
                                      name="kpyo_back"
                                      id={"kpyo_back" + index}
                                      value={item.moduleId}
                                      checked={item.enable}
                                      onChange={() =>
                                        backOfficeCheck(item.moduleId)
                                      }
                                      style={{
                                        marginLeft: "0px",
                                        width: "17px",
                                        height: "20px",
                                      }}
                                    />
                                    <CLabel
                                      variant="custom-checkbox"
                                      htmlFor={"kpyo_back" + index}
                                      style={{
                                        fontWeight: 400,
                                        // color: "rgba(0,0,0,0.87)",
                                      }}
                                    >
                                      {item.moduleName}<br/>
                                      <small
                                        className="mb-1"
                                      >
                                        {item.description}
                                      </small>
                                    </CLabel>
                                  </CFormGroup>
                                </CListGroupItem>
                              </React.Fragment>
                            )
                          )
                        : null}
                    </CListGroup>
                  </CCol>
                </CRow>
              </CCollapse>
            </CCardBody>
            <CCardFooter>
              <CRow>
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
                <CCol
                  sm="4"
                  md="4"
                  xl="xl"
                  className="mb-3 mb-xl-0 form-actions"
                >
                  <CButton
                    block
                    type="submit"
                    variant="outline"
                    className="btn-pill pull-right"
                    color="success"
                    onClick={saveUserRole}
                  >
                    SAVE
                  </CButton>
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </React.Fragment>
  );
};
export default AddRole;
