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
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/authAction";
import validator from "validator";

const Login = () => {
  const dispatch = useDispatch();
  const msg = useSelector((state) => state.msg);
  useEffect(() => {
    if (msg.error) {
      setLoading(false);
      setFormState((formState) => ({
        ...formState,
        errors: {
          ...formState.errors,
          email: msg.object.type === "email" ? true : false,
          password: msg.object.type === "password" ? true : false,
        },
      }));
    } else if (msg.open) {
      setLoading(false);
      setFormState((formState) => ({
        ...formState,
        errors: {
          ...formState.errors,
          email: false,
          password: false,
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
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    values: {
      email: "",
      password: "",
    },
    errors: {
      email: false,
      password: false,
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

  const showPasswordFunc = () => {
    setShowPassword(!showPassword);
  };

  const loginUser = (e) => {
    e.preventDefault();
    setLoading(true);
    let errors = false;
    let email = false;
    let password = false;
    if (
      validator.isEmpty(formState.values.email) ||
      !validator.isEmail(formState.values.email)
    ) {
      email = true;
      errors = true;
    }
    if (validator.isEmpty(formState.values.password)) {
      password = true;
      errors = true;
    }
    if (errors) {
      setFormState((formState) => ({
        ...formState,
        errors: {
          ...formState.values,
          email: email,
          password: password,
        },
      }));
      setLoading(false);
      return;
    } else {
      let data = {
        email: formState.values.email,
        password: formState.values.password,
        platform: "backoffice",
      };
      dispatch(login(data));
    }
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      {redirect ? <Redirect to="/dashboard" /> : ""}

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={loginUser}>
                    <img
                      src={"logo/logo.png"}
                      className="c-sidebar-brand-full"
                      alt="kyrio POS"
                      style={{ width: "142px", height: "100%" }}
                    />
                    <p className="text-muted" style={{ fontSize: "18px" }}>
                      Sign In to your Kyrio account
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
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend
                        onClick={showPasswordFunc}
                        style={{ cursor: "pointer" }}
                      >
                        <CInputGroupText>
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type={showPassword ? "text" : "password"}
                        invalid={
                          formState.errors.password
                            ? validator.isEmpty(formState.values.email)
                              ? true
                              : formState.errors.password
                            : false
                        }
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={formState.values.password}
                        onChange={(e) => handleChange(e)}
                      />
                      {validator.isEmpty(formState.values.password) ? (
                        <CInvalidFeedback>
                          This cannot be blank
                        </CInvalidFeedback>
                      ) : msg.object.type === "password" ? (
                        <CInvalidFeedback>
                          {msg.object.message}
                        </CInvalidFeedback>
                      ) : (
                        ""
                      )}
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" type="submit">
                          Login {loading ? <CSpinner size="sm" /> : ""}
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <Link to="/resetpswd">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </Link>
                      </CCol>
                      <CCol xs="12" className="text-right">
                        <Link to="/register">
                          <CButton color="link" className="px-0">
                            New to kyrio?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Create Your Free Kyrio Account</p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        New to Kyrio?{" "}
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
