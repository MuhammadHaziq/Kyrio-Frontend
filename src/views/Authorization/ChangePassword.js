import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInvalidFeedback,
  CSpinner,
} from "@coreui/react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { confirmPassword, checkUrl } from "../../actions/authAction";
import validator from "validator";

const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const msg = useSelector((state) => state.msg);

  useEffect(() => {
    let urlSplit = props.location.pathname.split("/");
    if (urlSplit[1] === "changepswd") {
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          ticket: urlSplit[2],
        },
      }));
      dispatch(checkUrl(urlSplit[2]));
    }
  }, []);

  useEffect(() => {
    if (msg.error) {
      if (msg.object.type === "url_check") {
        setDisabled(true);
      } else {
        setLoading(false);
        setFormState((formState) => ({
          ...formState,
          errors: {
            ...formState.errors,
            newPassword: msg.object.type === "email" ? true : false,
          },
        }));
      }
    } else if (msg.open) {
      if (msg.object.type !== "url_check") {
        setLoading(false);
        setFormState((formState) => ({
          ...formState,
          errors: {
            ...formState.errors,
            newPassword: false,
          },
        }));
        setRedirect(true);
      }
    }
  }, [msg]);
  useEffect(() => {
    localStorage.removeItem("kyrio");
    localStorage.removeItem("endDate");
    localStorage.removeItem("startDate");
    localStorage.removeItem("persist:primary");
    // history.push('/login')
  }, []);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formState, setFormState] = useState({
    values: {
      ticket: "",
      newPassword: "",
      confirmPassword: "",
    },
    errors: {
      newPassword: false,
      confirmPassword: false,
    },
  });
  const handleChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const showNewPasswordFunc = () => {
    setShowNewPassword(!showNewPassword);
  };

  const showConfirmPasswordFunc = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let errors = false;
    let newPassword = false;
    let confPassword = false;
    if (validator.isEmpty(formState.values.newPassword)) {
      newPassword = true;
      errors = true;
    }
    if (validator.isEmpty(formState.values.confirmPassword)) {
      confPassword = true;
      errors = true;
    }
    if (formState.values.newPassword !== formState.values.confirmPassword) {
      confPassword = true;
      errors = true;
    }
    if (errors) {
      setFormState((formState) => ({
        ...formState,
        errors: {
          ...formState.values,
          newPassword: newPassword,
          confirmPassword: confPassword,
        },
      }));
      setLoading(false);
      return;
    } else {
      let data = {
        ticket: formState.values.ticket,
        password: formState.values.newPassword,
        platform: "backoffice",
      };
      dispatch(confirmPassword(data));
    }
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      {/* {redirect ? <Redirect to="/login" /> : ""} */}

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={resetPasswordSubmit}>
                    <img
                      src={"logo/logo.png"}
                      className="c-sidebar-brand-full"
                      alt="kyrio POS"
                      style={{ width: "142px", height: "100%" }}
                    />
                    {redirect ? (
                      <h3>Password changed</h3>
                    ) : (
                      <>
                        <h3>Set new password</h3>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend
                            onClick={showNewPasswordFunc}
                            style={{ cursor: "pointer" }}
                          >
                            <CInputGroupText>
                              {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type={showNewPassword ? "text" : "password"}
                            invalid={
                              formState.errors.newPassword
                                ? validator.isEmpty(
                                    formState.values.newPassword
                                  )
                                  ? true
                                  : !validator.isEmail(
                                      formState.values.newPassword
                                    )
                                  ? true
                                  : formState.errors.newPassword
                                : false
                            }
                            placeholder="new password"
                            name="newPassword"
                            value={formState.values.newPassword}
                            onChange={(e) => handleChange(e)}
                          />
                          {validator.isEmpty(formState.values.newPassword) ? (
                            <CInvalidFeedback>
                              This cannot be blank
                            </CInvalidFeedback>
                          ) : (
                            ""
                          )}
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend
                            onClick={showConfirmPasswordFunc}
                            style={{ cursor: "pointer" }}
                          >
                            <CInputGroupText>
                              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type={showConfirmPassword ? "text" : "password"}
                            invalid={
                              formState.errors.confirmPassword
                                ? validator.isEmpty(
                                    formState.values.confirmPassword
                                  )
                                  ? true
                                  : !validator.isEmail(
                                      formState.values.confirmPassword
                                    )
                                  ? true
                                  : formState.errors.confirmPassword
                                : false
                            }
                            placeholder="Confirm password"
                            name="confirmPassword"
                            value={formState.values.confirmPassword}
                            onChange={(e) => handleChange(e)}
                          />
                          {validator.isEmpty(
                            formState.values.confirmPassword
                          ) ? (
                            <CInvalidFeedback>
                              This cannot be blank
                            </CInvalidFeedback>
                          ) : (
                            ""
                          )}
                        </CInputGroup>
                      </>
                    )}
                    {redirect ? (
                      <CRow>
                        <CCol xs="12">
                          <Link to="/login">
                            <CButton color="primary" className="px-4">
                              BACK TO SIGN IN FORM
                            </CButton>
                          </Link>
                        </CCol>
                      </CRow>
                    ) : (
                      <CRow>
                        <CCol md="12">
                          <p
                            className="text-muted"
                            style={{
                              fontSize: "18px",
                              color: "rgba(0,0,0,.54)",
                            }}
                          >
                            Changing your password will sign you out of Back
                            Office and Dashboard app on all devices
                          </p>
                          {disabled ? (
                            <p
                              style={{
                                fontSize: "14px",
                                color: "red",
                              }}
                            >
                              *You had already accessed this link!
                            </p>
                          ) : (
                            ""
                          )}
                        </CCol>
                        <CCol xs="6">
                          <CButton
                            color="primary"
                            className="px-4"
                            type="submit"
                            disabled={disabled}
                          >
                            SEND {loading ? <CSpinner size="sm" /> : ""}
                          </CButton>
                        </CCol>
                        <CCol xs="12" className="text-right">
                          <Link to="/login">
                            <CButton color="link" className="px-0">
                              Back to sign In form
                            </CButton>
                          </Link>
                        </CCol>
                      </CRow>
                    )}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ChangePassword;
