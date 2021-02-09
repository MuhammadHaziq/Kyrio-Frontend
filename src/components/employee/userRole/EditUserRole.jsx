import React, { useState, useEffect, useRef } from "react";
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
  update_user_role,
} from "../../../actions/employee/userRolesActions";
// import ConformationAlert from "../../components/conformationAlert/ConformationAlert";
import { useSelector, useDispatch } from "react-redux";
const EditUserRole = (props) => {
  const dispatch = useDispatch();
  const [roleName, setRoleName] = useState("");
  const [roleNameOrg, setRoleNameOrg] = useState("");
  const [allowBackOffice, setBackOffice] = useState([]);
  const [allowPos, setAllowPos] = useState([]);
  const [roles, setRoles] = useState({
    checkBackOffice: false,
    checkPos: false,
  });
  const [roleNameError, setRoleNameError] = useState(false);
  const userRoles = useSelector(
    (state) => state.employeeReducers.userRolesReducer
  );

  const prevBackOfficeCheck = useRef();
  useEffect(() => {
    prevBackOfficeCheck.current = roles.checkBackOffice;
  });
  const prevBackOffice = prevBackOfficeCheck.current;
  const prevPosCheck = useRef();
  useEffect(() => {
    prevPosCheck.current = roles.checkPos;
  });
  const prevPos = prevPosCheck.current;

  const goBack = () => {
    props.goBack();
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
    if (props.user_role_row_data !== undefined) {
      setRoleName(
        props.user_role_row_data.roleName !== undefined &&
          props.user_role_row_data.roleName !== null
          ? props.user_role_row_data.roleName
          : ""
      );
      setRoleNameOrg(
        props.user_role_row_data.roleName !== undefined &&
          props.user_role_row_data.roleName !== null
          ? props.user_role_row_data.roleName
          : ""
      );
      setBackOffice(
        props.user_role_row_data.allowBackoffice !== undefined &&
          props.user_role_row_data.allowBackoffice !== null
          ? [props.user_role_row_data.allowBackoffice]
          : []
      );
      setAllowPos(
        props.user_role_row_data.allowPOS !== undefined &&
          props.user_role_row_data.allowPOS !== null
          ? [props.user_role_row_data.allowPOS]
          : []
      );
      setRoles({
        ...roles,
        checkBackOffice:
          props.user_role_row_data.allowBackoffice !== undefined &&
          props.user_role_row_data.allowBackoffice !== null &&
          props.user_role_row_data.allowBackoffice.enable !== undefined
            ? props.user_role_row_data.allowBackoffice.enable
            : false,
        checkPos:
          props.user_role_row_data.allowPOS !== undefined &&
          props.user_role_row_data.allowPOS !== null &&
          props.user_role_row_data.allowPOS.enable !== undefined
            ? props.user_role_row_data.allowPOS.enable
            : false,
      });
    }
  }, [props.user_role_row_data]);
  useEffect(() => {
    if (allowBackOffice.length > 0) {
      setBackOffice(
        (allowBackOffice || []).slice().map((item) => {
          return {
            ...item,
            enable: roles.checkBackOffice,
          };
        })
      );
    }
  }, [roles.checkBackOffice]);

  useEffect(() => {
    if (allowPos.length > 0) {
      setAllowPos(
        (allowPos || []).slice().map((item) => {
          return {
            ...item,
            enable: roles.checkPos,
          };
        })
      );
    }
  }, [roles.checkPos]);

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    setRoleNameError(validator.isEmpty(value));
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRoleName(value);
  };
  const changeOnModule = (name, value) => {
    setRoles({
      ...roles,
      [name]: !value,
    });
  };
  const backOfficeCheck = (id) => {
    setBackOffice(
      allowBackOffice.slice().map((item) => {
        return {
          ...item,
          modules: (item.modules || []).slice().map((mod, modIndex) => {
            if (mod._id == id) {
              return {
                ...mod,
                enable: !mod.enable,
              };
            }
            return mod;
          }),
        };
      })
    );
  };
  const posToggleCheck = (id) => {
    setAllowPos(
      allowPos.slice().map((item) => {
        return {
          ...item,
          modules: (item.modules || []).slice().map((pos, modIndex) => {
            if (pos._id == id) {
              return {
                ...pos,
                enable: !pos.enable,
              };
            }
            return pos;
          }),
        };
      })
    );
  };
  const updateUserRole = () => {
    if (roleName !== undefined && roleName !== null && roleName.trim() === "") {
      setRoleNameError(validator.isEmpty(roleName));
      return false;
    } else {
      const data = {
        name: roleName,
        roleId:
          props.user_role_row_data !== undefined &&
          props.user_role_row_data !== null &&
          props.user_role_row_data._id !== undefined &&
          props.user_role_row_data._id !== null
            ? props.user_role_row_data._id
            : "",
        backoffice:
          allowBackOffice !== undefined &&
          allowBackOffice !== null &&
          allowBackOffice.length > 0
            ? allowBackOffice[0]
            : {},
        pos:
          allowPos !== undefined && allowPos !== null && allowPos.length > 0
            ? allowPos[0]
            : {},
      };
      dispatch(update_user_role(data));
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
                        invalid={roleNameError}
                        disabled={roleNameOrg.toUpperCase() == "OWNER"}
                      />
                      <CInvalidFeedback>
                        {roleNameError === true ? "Please Enter Role Name" : ""}
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
                        value={roles.checkPos}
                        onChange={() =>
                          changeOnModule("checkPos", roles.checkPos)
                        }
                        disabled={roleNameOrg.toUpperCase() == "OWNER"}
                      />
                    </CCol>
                  </CRow>
                </CListGroupItem>
              </CRow>
              <CCollapse show={roles.checkPos}>
                <CRow>
                  <CCol sm="12" md="12" lg="12">
                    <CListGroup>
                      {allowPos !== undefined &&
                      allowPos !== null &&
                      allowPos.length > 0
                        ? (allowPos[0].modules || []).map((item, index) => (
                            <React.Fragment>
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
                                    value={item._id}
                                    checked={item.enable}
                                    onChange={() => posToggleCheck(item._id)}
                                    style={{
                                      marginLeft: "0px",
                                      width: "17px",
                                      height: "20px",
                                    }}
                                    disabled={
                                      roleNameOrg.toUpperCase() == "OWNER"
                                    }
                                  />
                                  <CLabel
                                    variant="custom-checkbox"
                                    htmlFor={"pos_module" + index}
                                    style={{
                                      fontWeight: 400,
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
                          ))
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
                        value={roles.checkBackOffice}
                        onChange={() =>
                          changeOnModule(
                            "checkBackOffice",
                            roles.checkBackOffice
                          )
                        }
                        disabled={roleNameOrg.toUpperCase() == "OWNER"}
                      />
                    </CCol>
                  </CRow>
                </CListGroupItem>
              </CRow>
              <CCollapse show={roles.checkBackOffice}>
                <CRow>
                  <CCol sm="12" md="12" lg="12">
                    <CListGroup>
                      {allowBackOffice !== undefined &&
                      allowBackOffice !== null &&
                      allowBackOffice.length > 0
                        ? (allowBackOffice[0].modules || []).map(
                            (item, index) => (
                              <React.Fragment>
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
                                      value={item._id}
                                      checked={item.enable}
                                      onChange={() => backOfficeCheck(item._id)}
                                      style={{
                                        marginLeft: "0px",
                                        width: "17px",
                                        height: "20px",
                                      }}
                                      disabled={
                                        roleNameOrg.toUpperCase() == "OWNER"
                                      }
                                    />
                                    <CLabel
                                      variant="custom-checkbox"
                                      htmlFor={"kpyo_back" + index}
                                      style={{
                                        fontWeight: 400,
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
                    onClick={updateUserRole}
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
export default EditUserRole;
