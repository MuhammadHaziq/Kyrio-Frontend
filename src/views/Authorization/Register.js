import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
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
} from "@coreui/react";
import { MdPerson, MdLock, MdBusiness, MdFlag } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { CountryDropdown } from "react-country-region-selector";
import { signup } from "../../actions/authAction";
import validator from "validator";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [formState, setFormState] = useState({
    values: {
      // username: "",
      email: "",
      password: "",
      businessName: "",
      country: "",
      timezone: "",
    },
    errors: {
      // username: false,
      email: false,
      password: false,
      businessName: false,
      country: false,
      terms: false,
    },
  });

  const dispatch = useDispatch();
  const msg = useSelector((state) => state.msg);

  useEffect(() => {
    fetch("https://extreme-ip-lookup.com/json/?key=CCEvn3ZsTSeEWoEF2eNI")
      .then((res) => res.json())
      .then((response) => {
        console.log(response, "response");
        setFormState((formState) => ({
          ...formState,
          values: {
            ...formState.values,
            country: response.country,
            timezone: response.timezone,
          },
        }));
      })
      .catch((data, status) => {
        console.log("Request failed:", data);
      });
  }, []);

  useEffect(() => {
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
  const selectCountry = (val) => {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        country: val,
      },
    });
  };
  const handleOnBlur = (e) => {
    setFormState((formState) => ({
      ...formState,
      errors: {
        ...formState.errors,
        country: validator.isEmpty(formState.values.country) ? true : false,
      },
    }));
  };
  const registerUser = () => {
    setLoading(true);
    let errors = false;
    // let username = false;
    let email = false;
    let password = false;
    let businessName = false;
    let country = false;
    let terms = document.getElementById("terms").checked;

    // if (validator.isEmpty(formState.values.username)) {
    //   username = true;
    //   errors = true;
    // }
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
    if (validator.isEmpty(formState.values.businessName)) {
      businessName = true;
      errors = true;
    }
    if (validator.isEmpty(formState.values.country)) {
      country = true;
      errors = true;
    }
    if (terms === false) {
      terms = true;
      errors = true;
    } else {
      terms = false;
    }

    if (errors) {
      setLoading(false);
      setFormState((formState) => ({
        ...formState,
        errors: {
          ...formState.errors,
          // username: username,
          email: email,
          password: password,
          businessName: businessName,
          country: country,
          terms: terms,
        },
      }));
      return;
    } else {
      setFormState((formState) => ({
        ...formState,
        errors: {
          ...formState.errors,
          // username: username,
          email: email,
          password: password,
          businessName: businessName,
          country: country,
          terms: terms,
        },
      }));
      let data = {
        username: "",
        email: formState.values.email,
        password: formState.values.password,
        businessName: formState.values.businessName,
        country: formState.values.country,
        timezone: formState.values.timezone,
        terms: terms,
        platform: "backoffice",
      };
      dispatch(signup(data));
    }
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      {redirect ? <Redirect to="/dashboard" /> : ""}
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <img
                    src={"logo/logo.png"}
                    className="c-sidebar-brand-full"
                    alt="kyrio POS"
                    style={{ width: "142px", height: "100%" }}
                  />
                  <p className="text-muted" style={{ fontSize: "18px" }}>
                    Create Your Free Kyrio Account
                  </p>
                  {/* <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <MdPerson />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      name="username"
                      invalid={
                        formState.errors.username
                          ? validator.isEmpty(formState.values.username)
                            ? true
                            : false
                          : false
                      }
                      value={formState.values.username}
                      onChange={(e) => handleChange(e)}
                    />
                    {validator.isEmpty(formState.values.username) ? (
                      <CInvalidFeedback>This cannot be blank</CInvalidFeedback>
                    ) : (
                      ""
                    )}
                  </CInputGroup> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      name="email"
                      invalid={
                        formState.errors.email
                          ? validator.isEmpty(formState.values.email)
                            ? true
                            : !validator.isEmail(formState.values.email)
                            ? true
                            : msg.error
                            ? true
                            : false
                          : false
                      }
                      value={formState.values.email}
                      onChange={(e) => handleChange(e)}
                    />
                    {validator.isEmpty(formState.values.email) ? (
                      <CInvalidFeedback>This cannot be blank</CInvalidFeedback>
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
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <MdLock />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      invalid={
                        formState.errors.password
                          ? validator.isEmpty(formState.values.password)
                            ? true
                            : false
                          : false
                      }
                      name="password"
                      value={formState.values.password}
                      onChange={(e) => handleChange(e)}
                    />
                    {validator.isEmpty(formState.values.password) ? (
                      <CInvalidFeedback>This cannot be blank</CInvalidFeedback>
                    ) : (
                      ""
                    )}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <MdBusiness />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Business name"
                      autoComplete="businessName"
                      invalid={
                        formState.errors.businessName
                          ? validator.isEmpty(formState.values.businessName)
                            ? true
                            : false
                          : false
                      }
                      name="businessName"
                      value={formState.values.businessName}
                      onChange={(e) => handleChange(e)}
                    />
                    {validator.isEmpty(formState.values.businessName) ? (
                      <CInvalidFeedback>This cannot be blank</CInvalidFeedback>
                    ) : (
                      ""
                    )}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <MdFlag />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CountryDropdown
                      className={
                        formState.errors.country === true
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Country"
                      name="country"
                      value={formState.values.country}
                      onChange={(val) => selectCountry(val)}
                      invalid={
                        formState.errors.country
                          ? validator.isEmpty(formState.values.country)
                            ? "true"
                            : "false"
                          : "false"
                      }
                      onBlur={handleOnBlur}
                    />
                    {/*

                      <CInput
                      type="text"
                      placeholder="Country"
                      autoComplete="country"
                      invalid={
                        formState.errors.country
                          ? validator.isEmpty(formState.values.country)
                            ? true
                            : false
                          : false
                      }
                      name="country"
                      value={formState.values.country}
                      onChange={(e) => handleChange(e)}
                      {validator.isEmpty(formState.errors.country) ? (
                        <CInvalidFeedback>This cannot be blank</CInvalidFeedback>
                      ) : (
                        ""
                      )}
                    />*/}
                    {validator.isEmpty(formState.values.country) ? (
                      <CInvalidFeedback>This cannot be blank</CInvalidFeedback>
                    ) : (
                      ""
                    )}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox
                        invalid={formState.errors.terms}
                        custom
                        id="terms"
                        name="terms"
                      />
                      <CLabel variant="custom-checkbox" htmlFor="terms">
                        I agree to Kyrio <Link to="/">Terms of Use</Link> and
                        have read and acknowledged{" "}
                        <Link to="/">Privacy Policy</Link>
                      </CLabel>
                      <br />
                    </CFormGroup>
                  </CInputGroup>
                  <CButton color="success" block onClick={registerUser}>
                    Create Account {loading ? <CSpinner size="sm" /> : ""}
                  </CButton>
                  <p style={{ marginTop: "3%" }}>
                    Already have an account? <Link to="/login">Sign in</Link>
                  </p>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
