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
import { MdPerson } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../../actions/authAction";
import validator from "validator";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const msg = useSelector((state) => state.msg);
  useEffect(() => {
    console.log(msg);
    if (msg.error) {
      setLoading(false);
      setFormState((formState) => ({
        ...formState,
        errors: {
          ...formState.errors,
          email: msg.object.type === "email" ? true : false,
        },
      }));
    } else if (msg.open) {
      setLoading(false);
      setFormState((formState) => ({
        ...formState,
        errors: {
          ...formState.errors,
          email: false,
        },
      }));
      setRedirect(true);
    }
  }, [msg]);
  useEffect(() => {
    localStorage.removeItem("kyrio");
    localStorage.removeItem("endDate");
    localStorage.removeItem("startDate");
    localStorage.removeItem("persist:primary");
    // history.push('/login')
  }, []);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [formState, setFormState] = useState({
    values: {
      email: "",
    },
    errors: {
      email: false,
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

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let errors = false;
    let email = false;
    if (
      validator.isEmpty(formState.values.email) ||
      !validator.isEmail(formState.values.email)
    ) {
      email = true;
      errors = true;
    }
    if (errors) {
      setFormState((formState) => ({
        ...formState,
        errors: {
          ...formState.values,
          email: email,
        },
      }));
      setLoading(false);
      return;
    } else {
      let data = {
        email: formState.values.email,
        platform: "backoffice",
      };
      dispatch(resetPassword(data));
    }
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
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
                    <h3>Reset password</h3>
                    {!redirect ? (
                      <>
                        <p className="text-muted" style={{ fontSize: "18px" }}>
                          Enter your email to receive instructions to reset your
                          password
                        </p>

                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <MdPerson />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="email"
                            invalid={
                              formState.errors.email
                                ? validator.isEmpty(formState.values.email)
                                  ? true
                                  : !validator.isEmail(formState.values.email)
                                  ? true
                                  : formState.errors.email
                                : false
                            }
                            placeholder="email"
                            autoComplete="email"
                            name="email"
                            value={formState.values.email}
                            onChange={(e) => handleChange(e)}
                          />
                          {validator.isEmpty(formState.values.email) ? (
                            <CInvalidFeedback>
                              This cannot be blank
                            </CInvalidFeedback>
                          ) : !validator.isEmail(formState.values.email) ? (
                            <CInvalidFeedback>
                              Address is not correct
                            </CInvalidFeedback>
                          ) : msg.object.type === "email" ? (
                            <CInvalidFeedback>{msg.message}</CInvalidFeedback>
                          ) : (
                            ""
                          )}
                        </CInputGroup>
                      </>
                    ) : (
                      <p className="text-muted" style={{ fontSize: "18px" }}>
                        If an account exists with that email address, you will
                        receive an email with instructions on how to reset your
                        password.
                      </p>
                    )}
                    {!redirect ? (
                      <CRow>
                        <CCol xs="6">
                          <CButton
                            color="primary"
                            className="px-4"
                            type="submit"
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
                    ) : (
                      ""
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

export default ResetPassword;
