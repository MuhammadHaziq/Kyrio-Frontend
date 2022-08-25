import React, { useState, useEffect, useCallback } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CInputGroup,
  CCardFooter,
  CInputGroupAppend,
  CSelect,
  CInvalidFeedback,
  CSpinner,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CInputRadio,
  CInputCheckbox,
  // CFormCheck
} from "@coreui/react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import validator from "validator";
import { useSelector, useDispatch } from "react-redux";
import {
  get_account,
  change_check_password,
  check_password,
  update_email,
  change_update_check,
  set_account_info,
  update_password,
  delete_account,
} from "../../actions/accounts/accountAction";
import { cibWindows } from "@coreui/icons";
var languages = require("language-list")();

const Account = () => {
  const dispatch = useDispatch();
  const updated = useSelector((state) => state.account.updated);
  const account_detail = useSelector((state) => state.account.account_detail);
  const password_correct = useSelector(
    (state) => state.account.password_correct
  );

  const [language] = useState(languages.getData());

  const [fields, setFields] = useState({
    businessName: "",
    email: "",
    password: "qwertyui",
    timezone: "",
    language: "",
  });
  const [errors, setErrors] = useState({
    businessName: false,
    email: false,
    password: false,
    timezone: false,
    language: false,
  });

  const [emailFields, setEmailFields] = useState({
    newEmail: "",
    confirmEmail: "",
  });
  const [emailErrors, setEmailErrors] = useState({
    newEmail: false,
    confirmEmail: false,
  });

  const [passwordFields, setPasswordFields] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [NPShow, setNPShow] = useState(false);
  const [CPShow, setCPShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [password, setPassword] = useState("");
  const [changeType, setChangeType] = useState("");
  const [comments, setComments] = useState("");
  const [reasons, setReasons] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteReasons] = useState([
    {
      id: 1,
      label: "Business closed",
    },
    {
      id: 2,
      label: "High subscription prices",
    },
    {
      id: 3,
      label: "Lack of features for my business",
    },
    {
      id: 4,
      label: "The service is difficult to use",
    },
    {
      id: 5,
      label: "Poor customer support",
    },
    {
      id: 6,
      label: "My hardware is not supported",
    },
    {
      id: 7,
      label: "It was an account for testing",
    },
    {
      id: 8,
      label: "Found a better service",
    },
    {
      id: 9,
      label: "Other reason",
    },
  ]);

  const handleDataFetching = useCallback(() => {
    setLoading(true);
    dispatch(get_account());
  }, []);

  useEffect(() => {
    handleDataFetching();
  }, []);

  useEffect(() => {
    if (updated === true) {
      toggle();
      dispatch(change_update_check(false));
    }
  }, [updated]);

  useEffect(() => {
    if (Object.keys(account_detail).length > 0) {
      setFields({
        ...fields,
        businessName: account_detail?.businessName,
        email: account_detail?.email,
        timezone: account_detail?.timezone,
        language: account_detail?.language,
      });
    }
    setLoading(false);
  }, [account_detail]);

  const handleEmailFields = (e) => {
    const { name, value } = e.target;
    setEmailFields({
      ...emailFields,
      [name]: value,
    });
  };

  const handleOnEmailBlur = (e) => {
    const { name, value } = e.target;
    if (validator.isEmpty(value) || !validator.isEmail(value)) {
      setEmailErrors({
        ...emailErrors,
        [name]: true,
      });
    } else {
      setEmailErrors({
        ...emailErrors,
        [name]: false,
      });
    }
    if (!validator.isEmpty(emailFields.confirmEmail)) {
      setEmailErrors({
        ...emailErrors,
        [name]:
          emailFields.newEmail !== emailFields.confirmEmail ? true : false,
      });
    }
  };
  const handlePasswordFields = (e) => {
    const { name, value } = e.target;
    setPasswordFields({
      ...passwordFields,
      [name]: value,
    });
  };

  const handleOnPasswordBlur = (e) => {
    const { name, value } = e.target;
    setPasswordErrors({
      ...passwordErrors,
      [name]: validator.isEmpty(value),
    });
    if (!validator.isEmpty(passwordFields.confirmPassword)) {
      setPasswordErrors({
        ...passwordErrors,
        [name]:
          passwordFields.newPassword !== passwordFields.confirmPassword
            ? true
            : false,
      });
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: validator.isEmpty(value),
    });
  };

  const openModal = (type) => {
    setModal(true);
    setChangeType(type);
  };
  const redirectToDashboard = () => {
    window.location.href = "/";
  };
  const saveAccount = () => {
    let error = false;
    if (fields.businessName === null && fields.businessName === undefined) {
      error = true;
    }
    if (fields.language === null && fields.language === undefined) {
      error = true;
    }
    if (!error) {
      const data = {
        businessName: fields.businessName,
        timezone: fields.timezone,
        language: fields.language,
      };
      setSaving(true);
      dispatch(set_account_info(data));
      setTimeout(() => {
        setSaving(false);
      }, 1000);
    }
  };

  const continueAction = () => {
    if (password_correct == "NO" || password_correct == "") {
      if (!validator.isEmpty(password)) {
        const data = { password: password };
        dispatch(check_password(data));
      }
    } else if (password_correct == "YES") {
      if (changeType == "email") {
        if (!emailErrors.newEmail && !emailErrors.confirmEmail) {
          const data = { email: emailFields.newEmail };
          dispatch(update_email(data));
        }
      } else if (changeType == "password") {
        if (!passwordErrors.newPassword && !passwordErrors.confirmPassword) {
          const data = { password: passwordFields.newPassword };
          dispatch(update_password(data));
        }
      } else if (changeType == "delete") {
        if (!validator.isEmpty(reasons)) {
          setChangeType("confirm");
        }
      } else if (changeType == "confirm") {
        if (!validator.isEmpty(reasons)) {
          setChangeType("confirm");
          const data = {
            reason: reasons,
            comments: comments,
            confirm: confirmDelete,
          };
          dispatch(delete_account(data));
        }
      }
    }
  };
  const showPassword = () => {
    setShow(!show);
  };
  const toggle = () => {
    dispatch(change_check_password(false));
    setModal(false);
    setConfirmDelete(false);
    setPassword("");
    setChangeType("");
    setComments("");
    setReasons("");
    setEmailFields({
      newEmail: "",
      confirmEmail: "",
    });
    setPasswordFields({
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <React.Fragment>
      {/* Model For Update Points Balance*/}
      <CModal show={modal} onClose={toggle}>
        {password_correct == "NO" || password_correct == "" ? (
          <>
            <CModalHeader closeButton>Enter your password</CModalHeader>
            <CModalBody>
              <p>
                For security reasons, please enter your password to continue
              </p>
              <CFormGroup>
                <CLabel htmlFor="password">Password</CLabel>
                <CInputGroup>
                  <CInput
                    id="password"
                    name="password"
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    invalid={password_correct == "NO" ? true : false}
                    value={password}
                  />
                  <CInputGroupAppend>
                    <CButton
                      block
                      variant="outline"
                      className="btn btn-sm "
                      color="success"
                      onClick={() => showPassword()}
                    >
                      {show ? <FaEye /> : <FaEyeSlash />}
                    </CButton>
                  </CInputGroupAppend>
                  <CInvalidFeedback>
                    {password_correct == "NO" ? "Wrong password" : ""}
                  </CInvalidFeedback>
                </CInputGroup>
              </CFormGroup>
            </CModalBody>
          </>
        ) : password_correct == "YES" && changeType == "email" ? (
          <>
            <CModalHeader closeButton>Change email</CModalHeader>
            <CModalBody>
              <CFormGroup>
                <CLabel htmlFor="newEmail">New email</CLabel>
                <CInputGroup>
                  <CInput
                    id="newEmail"
                    name="newEmail"
                    type="text"
                    placeholder="New email"
                    onChange={handleEmailFields}
                    onBlur={handleOnEmailBlur}
                    invalid={emailErrors.newEmail}
                    value={emailFields.newEmail}
                  />
                  <CInvalidFeedback>
                    {emailErrors.newEmail ? "Please enter a valid email" : ""}
                  </CInvalidFeedback>
                </CInputGroup>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="confirmEmail">Confirm email</CLabel>
                <CInputGroup>
                  <CInput
                    id="confirmEmail"
                    name="confirmEmail"
                    type="text"
                    placeholder="Confirm email"
                    onChange={handleEmailFields}
                    onBlur={handleOnEmailBlur}
                    invalid={emailErrors.confirmEmail}
                    value={emailFields.confirmEmail}
                  />
                  <CInvalidFeedback>
                    {emailErrors.confirmEmail
                      ? "Email addresses must match"
                      : ""}
                  </CInvalidFeedback>
                </CInputGroup>
              </CFormGroup>
              <p>
                You will no longer be able to sign in to your account using{" "}
                {fields.email}
              </p>
            </CModalBody>
          </>
        ) : password_correct == "YES" && changeType == "password" ? (
          <>
            <CModalHeader closeButton>Change password</CModalHeader>
            <CModalBody>
              <CFormGroup>
                <CLabel htmlFor="newPassword">New password</CLabel>
                <CInputGroup>
                  <CInput
                    id="newPassword"
                    name="newPassword"
                    type={NPShow ? "text" : "password"}
                    placeholder="New password"
                    onChange={handlePasswordFields}
                    onBlur={handleOnPasswordBlur}
                    invalid={passwordErrors.newPassword}
                    value={passwordFields.newPassword}
                  />
                  <CInputGroupAppend>
                    <CButton
                      block
                      variant="outline"
                      className="btn btn-sm "
                      color="success"
                      onClick={() => setNPShow(!NPShow)}
                    >
                      {NPShow ? <FaEye /> : <FaEyeSlash />}
                    </CButton>
                  </CInputGroupAppend>
                  <CInvalidFeedback>
                    {passwordErrors.newPassword
                      ? "This field must contain at least 8 characters"
                      : ""}
                  </CInvalidFeedback>
                </CInputGroup>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="confirmPassword">Confirm password</CLabel>
                <CInputGroup>
                  <CInput
                    id="confirmPassword"
                    name="confirmPassword"
                    type={CPShow ? "text" : "password"}
                    placeholder="Confirm Password"
                    onChange={handlePasswordFields}
                    onBlur={handleOnPasswordBlur}
                    invalid={passwordErrors.confirmPassword}
                    value={passwordFields.confirmPassword}
                  />
                  <CInputGroupAppend>
                    <CButton
                      block
                      variant="outline"
                      className="btn btn-sm "
                      color="success"
                      onClick={() => setCPShow(!CPShow)}
                    >
                      {CPShow ? <FaEye /> : <FaEyeSlash />}
                    </CButton>
                  </CInputGroupAppend>
                  <CInvalidFeedback>
                    {passwordErrors.confirmPassword
                      ? "The passwords you entered do not match"
                      : ""}
                  </CInvalidFeedback>
                </CInputGroup>
              </CFormGroup>
              <p>
                Changing your password will sign you out of Back Office and
                Dashboard app on all devices
              </p>
            </CModalBody>
          </>
        ) : password_correct == "YES" && changeType == "delete" ? (
          <>
            <CModalHeader closeButton>Reason for account deletion</CModalHeader>
            <CModalBody>
              <CFormGroup>
                {deleteReasons.map((item) => {
                  return (
                    <CFormGroup variant="checkbox" className="form-group-space">
                      <CInputRadio
                        className="form-check-input"
                        id={"deleteAccountReason" + item.id}
                        name="deleteAccountReason"
                        value={item.label}
                        onChange={(e) => setReasons(e.target.value)}
                      />
                      <CLabel
                        variant="checkbox"
                        className="checkbox-label"
                        htmlFor={"deleteAccountReason" + item.id}
                      >
                        {item.label}
                      </CLabel>
                    </CFormGroup>
                  );
                })}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="comments">Aditional comments</CLabel>
                <CInputGroup>
                  <CInput
                    id="comments"
                    name="comments"
                    type="text"
                    placeholder="Add comments"
                    onChange={(e) => setComments(e.target.value)}
                    value={comments}
                  />
                </CInputGroup>
              </CFormGroup>
            </CModalBody>
          </>
        ) : password_correct == "YES" && changeType == "confirm" ? (
          <>
            <CModalHeader closeButton>Delete account</CModalHeader>
            <CModalBody>
              <p>
                After deleting your account, you will no longer be able to
                access any of its data. All subscriptions to Kyrio services will
                be cancelled.
              </p>
              <CFormGroup variant="checkbox" className="form-group-space">
                <CInputCheckbox
                  className="form-check-input"
                  id="confirmDelete"
                  name="deleteAccountReason"
                  onChange={() => setConfirmDelete(!confirmDelete)}
                />
                <CLabel
                  variant="checkbox"
                  className="checkbox-label"
                  htmlFor="confirmDelete"
                >
                  Yes, I want to delete my Kyrio account and all its data
                </CLabel>
              </CFormGroup>
            </CModalBody>
          </>
        ) : (
          ""
        )}
        <CModalFooter>
          <CButton color="secondary" onClick={toggle}>
            CANCEL
          </CButton>
          <CButton
            color="success"
            disabled={
              password_correct == "" && validator.isEmpty(password)
                ? true
                : password_correct == "YES" &&
                  changeType == "email" &&
                  (validator.isEmpty(emailFields.newEmail) ||
                    validator.isEmpty(emailFields.confirmEmail) ||
                    !validator.isEmail(emailFields.newEmail) ||
                    emailFields.newEmail !== emailFields.confirmEmail)
                ? true
                : password_correct == "YES" &&
                  changeType == "password" &&
                  (validator.isEmpty(passwordFields.newPassword) ||
                    validator.isEmpty(passwordFields.confirmPassword) ||
                    passwordFields.newPassword !==
                      passwordFields.confirmPassword)
                ? true
                : password_correct == "YES" &&
                  changeType == "delete" &&
                  validator.isEmpty(reasons)
                ? true
                : password_correct == "YES" &&
                  changeType == "confirm" &&
                  !confirmDelete
                ? true
                : false
            }
            onClick={continueAction}
          >
            {changeType == "confirm" ? "DELETE ACCOUNT" : "CONTINUE"}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Model For Update Points Balance*/}
      <CRow className="justify-content-left">
        <CCol md="9" lg="7" xl="6">
          <CCard>
            <CCardHeader>
              <h4>
                <strong>Account</strong>
              </h4>
            </CCardHeader>

            <CCardBody>
              {loading ? (
                <CSpinner />
              ) : (
                <>
                  <CRow>
                    <CCol>
                      <CFormGroup>
                        <CLabel htmlFor="businessName">Business Name</CLabel>
                        <CInputGroup>
                          <CInput
                            id="businessName"
                            name="businessName"
                            placeholder="Buisness Name"
                            onChange={handleOnChange}
                            value={fields.businessName}
                            invalid={errors.businessName}
                            onBlur={handleOnBlur}
                            disabled={!account_detail.is_owner}
                          />
                          <CInvalidFeedback>
                            {errors.businessName === true
                              ? "Please Enter Buisness Name"
                              : ""}
                          </CInvalidFeedback>
                        </CInputGroup>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CFormGroup>
                        <CLabel htmlFor="email">Email</CLabel>
                        <CInputGroup>
                          <CInput
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            disabled={true}
                            onChange={handleOnChange}
                            value={fields.email}
                            invalid={errors.email}
                            onBlur={handleOnBlur}
                          />
                          <CInputGroupAppend>
                            <CButton
                              block
                              variant="outline"
                              className="btn btn-sm "
                              color="success"
                              onClick={() => openModal("email")}
                            >
                              CHANGE
                            </CButton>
                          </CInputGroupAppend>
                          <CInvalidFeedback>
                            {errors.email === true ? "Please Enter Email" : ""}
                          </CInvalidFeedback>
                        </CInputGroup>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CFormGroup>
                        <CLabel htmlFor="password">Password</CLabel>
                        <CInputGroup>
                          <CInput
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            autoComplete="new-password"
                            disabled={true}
                            onChange={handleOnChange}
                            value={fields.password}
                            invalid={errors.password}
                            onBlur={handleOnBlur}
                          />
                          <CInputGroupAppend>
                            <CButton
                              block
                              variant="outline"
                              className="btn btn-sm "
                              color="success"
                              onClick={() => openModal("password")}
                            >
                              CHANGE
                            </CButton>
                          </CInputGroupAppend>
                          <CInvalidFeedback>
                            {errors.email === true
                              ? "Please Enter Password"
                              : ""}
                          </CInvalidFeedback>
                        </CInputGroup>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CFormGroup>
                        <CLabel htmlFor="timezone">Timezone</CLabel>
                        <CInputGroup>
                          <CSelect
                            type="select"
                            name="timezone"
                            id="timezone"
                            placeholder="Timezone"
                            onChange={handleOnChange}
                            value={fields.timezone}
                            invalid={errors.timezone}
                            onBlur={handleOnBlur}
                          >
                            <option value="">Please select</option>
                            <option
                              label="(UTC-11:00) Coordinated Universal Time -11"
                              value="string:Etc/GMT+11"
                            >
                              (UTC-11:00) Coordinated Universal Time -11
                            </option>
                            <option
                              label="(UTC-12:00) International Date Line West"
                              value="string:Etc/GMT+12"
                            >
                              (UTC-12:00) International Date Line West
                            </option>
                            <option
                              label="(UTC-10:00) Hawaii"
                              value="string:Pacific/Honolulu"
                            >
                              (UTC-10:00) Hawaii
                            </option>
                            <option
                              label="(UTC-09:00) Alaska"
                              value="string:America/Anchorage"
                            >
                              (UTC-09:00) Alaska
                            </option>
                            <option
                              label="(UTC-08:00) Pacific Time (US and Canada)"
                              value="string:America/Los_Angeles"
                            >
                              (UTC-08:00) Pacific Time (US and Canada)
                            </option>
                            <option
                              label="(UTC-08:00) Baja California"
                              value="string:America/Tijuana"
                            >
                              (UTC-08:00) Baja California
                            </option>
                            <option
                              label="(UTC-07:00) Mountain Time (US and Canada)"
                              value="string:America/Denver"
                            >
                              (UTC-07:00) Mountain Time (US and Canada)
                            </option>
                            <option
                              label="(UTC-07:00) Chihuahua, La Paz, Mazatlan"
                              value="string:America/Chihuahua"
                            >
                              (UTC-07:00) Chihuahua, La Paz, Mazatlan
                            </option>
                            <option
                              label="(UTC-07:00) Arizona"
                              value="string:America/Phoenix"
                            >
                              (UTC-07:00) Arizona
                            </option>
                            <option
                              label="(UTC-06:00) Saskatchewan"
                              value="string:America/Regina"
                            >
                              (UTC-06:00) Saskatchewan
                            </option>
                            <option
                              label="(UTC-06:00) Central America"
                              value="string:America/Guatemala"
                            >
                              (UTC-06:00) Central America
                            </option>
                            <option
                              label="(UTC-06:00) Central Time (US and Canada)"
                              value="string:America/Chicago"
                            >
                              (UTC-06:00) Central Time (US and Canada)
                            </option>
                            <option
                              label="(UTC-06:00) Guadalajara, Mexico City, Monterrey"
                              value="string:America/Mexico_City"
                            >
                              (UTC-06:00) Guadalajara, Mexico City, Monterrey
                            </option>
                            <option
                              label="(UTC-05:00) Eastern Time (US and Canada)"
                              value="string:America/New_York"
                            >
                              (UTC-05:00) Eastern Time (US and Canada)
                            </option>
                            <option
                              label="(UTC-05:00) Bogota, Lima, Quito"
                              value="string:America/Bogota"
                            >
                              (UTC-05:00) Bogota, Lima, Quito
                            </option>
                            <option
                              label="(UTC-05:00) Indiana (East)"
                              value="string:America/Indianapolis"
                            >
                              (UTC-05:00) Indiana (East)
                            </option>
                            <option
                              label="(UTC-04:30) Caracas"
                              value="string:America/Caracas"
                            >
                              (UTC-04:30) Caracas
                            </option>
                            <option
                              label="(UTC-04:00) Atlantic Time (Canada)"
                              value="string:America/Halifax"
                            >
                              (UTC-04:00) Atlantic Time (Canada)
                            </option>
                            <option
                              label="(UTC-04:00) Cuiaba"
                              value="string:America/Cuiaba"
                            >
                              (UTC-04:00) Cuiaba
                            </option>
                            <option
                              label="(UTC-04:00) Santiago"
                              value="string:America/Santiago"
                            >
                              (UTC-04:00) Santiago
                            </option>
                            <option
                              label="(UTC-04:00) Georgetown, La Paz, Manaus, San Juan"
                              value="string:America/La_Paz"
                            >
                              (UTC-04:00) Georgetown, La Paz, Manaus, San Juan
                            </option>
                            <option
                              label="(UTC-04:00) Asuncion"
                              value="string:America/Asuncion"
                            >
                              (UTC-04:00) Asuncion
                            </option>
                            <option
                              label="(UTC-03:30) Newfoundland"
                              value="string:America/St_Johns"
                            >
                              (UTC-03:30) Newfoundland
                            </option>
                            <option
                              label="(UTC-03:00) Brasilia"
                              value="string:America/Sao_Paulo"
                            >
                              (UTC-03:00) Brasilia
                            </option>
                            <option
                              label="(UTC-03:00) Greenland"
                              value="string:America/Godthab"
                            >
                              (UTC-03:00) Greenland
                            </option>
                            <option
                              label="(UTC-03:00) Montevideo"
                              value="string:America/Montevideo"
                            >
                              (UTC-03:00) Montevideo
                            </option>
                            <option
                              label="(UTC-03:00) Cayenne, Fortaleza"
                              value="string:America/Cayenne"
                            >
                              (UTC-03:00) Cayenne, Fortaleza
                            </option>
                            <option
                              label="(UTC-03:00) Buenos Aires"
                              value="string:America/Buenos_Aires"
                            >
                              (UTC-03:00) Buenos Aires
                            </option>
                            <option
                              label="(UTC-02:00) Mid-Atlantic"
                              value="string:Etc/GMT+2"
                            >
                              (UTC-02:00) Mid-Atlantic
                            </option>
                            <option
                              label="(UTC-01:00) Azores"
                              value="string:Atlantic/Azores"
                            >
                              (UTC-01:00) Azores
                            </option>
                            <option
                              label="(UTC-01:00) Cabo Verde Is."
                              value="string:Atlantic/Cape_Verde"
                            >
                              (UTC-01:00) Cabo Verde Is.
                            </option>
                            <option
                              label="(UTC+00:00) Dublin, Edinburgh, Lisbon, London"
                              value="string:Europe/London"
                            >
                              (UTC+00:00) Dublin, Edinburgh, Lisbon, London
                            </option>
                            <option
                              label="(UTC+00:00) Monrovia, Reykjavik"
                              value="string:Atlantic/Reykjavik"
                            >
                              (UTC+00:00) Monrovia, Reykjavik
                            </option>
                            <option
                              label="(UTC+00:00) Casablanca"
                              value="string:Africa/Casablanca"
                            >
                              (UTC+00:00) Casablanca
                            </option>
                            <option
                              label="(UTC+00:00) Coordinated Universal Time"
                              value="string:Etc/GMT"
                            >
                              (UTC+00:00) Coordinated Universal Time
                            </option>
                            <option
                              label="(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague"
                              value="string:Europe/Budapest"
                            >
                              (UTC+01:00) Belgrade, Bratislava, Budapest,
                              Ljubljana, Prague
                            </option>
                            <option
                              label="(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb"
                              value="string:Europe/Warsaw"
                            >
                              (UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb
                            </option>
                            <option
                              label="(UTC+01:00) Brussels, Copenhagen, Madrid, Paris"
                              value="string:Europe/Paris"
                            >
                              (UTC+01:00) Brussels, Copenhagen, Madrid, Paris
                            </option>
                            <option
                              label="(UTC+01:00) West Central Africa"
                              value="string:Africa/Lagos"
                            >
                              (UTC+01:00) West Central Africa
                            </option>
                            <option
                              label="(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"
                              value="string:Europe/Berlin"
                            >
                              (UTC+01:00) Amsterdam, Berlin, Bern, Rome,
                              Stockholm, Vienna
                            </option>
                            <option
                              label="(UTC+01:00) Windhoek"
                              value="string:Africa/Windhoek"
                            >
                              (UTC+01:00) Windhoek
                            </option>
                            <option
                              label="(UTC+03:00) Minsk"
                              value="string:Europe/Minsk"
                            >
                              (UTC+03:00) Minsk
                            </option>
                            <option
                              label="(UTC+02:00) Cairo"
                              value="string:Africa/Cairo"
                            >
                              (UTC+02:00) Cairo
                            </option>
                            <option
                              label="(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius"
                              value="string:Europe/Kiev"
                            >
                              (UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn,
                              Vilnius
                            </option>
                            <option
                              label="(UTC+02:00) Athens, Bucharest"
                              value="string:Europe/Bucharest"
                            >
                              (UTC+02:00) Athens, Bucharest
                            </option>
                            <option
                              label="(UTC+02:00) Jerusalem"
                              value="string:Asia/Jerusalem"
                            >
                              (UTC+02:00) Jerusalem
                            </option>
                            <option
                              label="(UTC+02:00) Amman"
                              value="string:Asia/Amman"
                            >
                              (UTC+02:00) Amman
                            </option>
                            <option
                              label="(UTC+02:00) Beirut"
                              value="string:Asia/Beirut"
                            >
                              (UTC+02:00) Beirut
                            </option>
                            <option
                              label="(UTC+02:00) Harare, Pretoria"
                              value="string:Africa/Johannesburg"
                            >
                              (UTC+02:00) Harare, Pretoria
                            </option>
                            <option
                              label="(UTC+02:00) Damascus"
                              value="string:Asia/Damascus"
                            >
                              (UTC+02:00) Damascus
                            </option>
                            <option
                              label="(UTC+02:00) Istanbul"
                              value="string:Europe/Istanbul"
                            >
                              (UTC+02:00) Istanbul
                            </option>
                            <option
                              label="(UTC+03:00) Kuwait, Riyadh"
                              value="string:Asia/Riyadh"
                            >
                              (UTC+03:00) Kuwait, Riyadh
                            </option>
                            <option
                              label="(UTC+03:00) Baghdad"
                              value="string:Asia/Baghdad"
                            >
                              (UTC+03:00) Baghdad
                            </option>
                            <option
                              label="(UTC+03:00) Nairobi"
                              value="string:Africa/Nairobi"
                            >
                              (UTC+03:00) Nairobi
                            </option>
                            <option
                              label="(UTC+02:00) Kaliningrad"
                              value="string:Europe/Kaliningrad"
                            >
                              (UTC+02:00) Kaliningrad
                            </option>
                            <option
                              label="(UTC+03:30) Tehran"
                              value="string:Asia/Tehran"
                            >
                              (UTC+03:30) Tehran
                            </option>
                            <option
                              label="(UTC+03:00) Moscow, St. Petersburg, Volgograd"
                              value="string:Europe/Moscow"
                            >
                              (UTC+03:00) Moscow, St. Petersburg, Volgograd
                            </option>
                            <option
                              label="(UTC+04:00) Abu Dhabi, Muscat"
                              value="string:Asia/Dubai"
                            >
                              (UTC+04:00) Abu Dhabi, Muscat
                            </option>
                            <option
                              label="(UTC+04:00) Baku"
                              value="string:Asia/Baku"
                            >
                              (UTC+04:00) Baku
                            </option>
                            <option
                              label="(UTC+04:00) Yerevan"
                              value="string:Asia/Yerevan"
                            >
                              (UTC+04:00) Yerevan
                            </option>
                            <option
                              label="(UTC+04:00) Tbilisi"
                              value="string:Asia/Tbilisi"
                            >
                              (UTC+04:00) Tbilisi
                            </option>
                            <option
                              label="(UTC+04:00) Port Louis"
                              value="string:Indian/Mauritius"
                            >
                              (UTC+04:00) Port Louis
                            </option>
                            <option
                              label="(UTC+04:30) Kabul"
                              value="string:Asia/Kabul"
                            >
                              (UTC+04:30) Kabul
                            </option>
                            <option
                              label="(UTC+05:00) Tashkent"
                              value="string:Asia/Tashkent"
                            >
                              (UTC+05:00) Tashkent
                            </option>
                            <option
                              label="(UTC+05:00) Islamabad, Karachi"
                              value="string:Asia/Karachi"
                              selected="selected"
                            >
                              (UTC+05:00) Islamabad, Karachi
                            </option>
                            <option
                              label="(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi"
                              value="string:Asia/Calcutta"
                            >
                              (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi
                            </option>
                            <option
                              label="(UTC+05:30) Sri Jayawardenepura"
                              value="string:Asia/Colombo"
                            >
                              (UTC+05:30) Sri Jayawardenepura
                            </option>
                            <option
                              label="(UTC+05:45) Kathmandu"
                              value="string:Asia/Katmandu"
                            >
                              (UTC+05:45) Kathmandu
                            </option>
                            <option
                              label="(UTC+05:00) Ekaterinburg"
                              value="string:Asia/Yekaterinburg"
                            >
                              (UTC+05:00) Ekaterinburg
                            </option>
                            <option
                              label="(UTC+06:00) Astana"
                              value="string:Asia/Almaty"
                            >
                              (UTC+06:00) Astana
                            </option>
                            <option
                              label="(UTC+06:00) Dhaka"
                              value="string:Asia/Dhaka"
                            >
                              (UTC+06:00) Dhaka
                            </option>
                            <option
                              label="(UTC+06:30) Yangon (Rangoon)"
                              value="string:Asia/Rangoon"
                            >
                              (UTC+06:30) Yangon (Rangoon)
                            </option>
                            <option
                              label="(UTC+06:00) Novosibirsk"
                              value="string:Asia/Novosibirsk"
                            >
                              (UTC+06:00) Novosibirsk
                            </option>
                            <option
                              label="(UTC+07:00) Bangkok, Hanoi, Jakarta"
                              value="string:Asia/Bangkok"
                            >
                              (UTC+07:00) Bangkok, Hanoi, Jakarta
                            </option>
                            <option
                              label="(UTC+07:00) Krasnoyarsk"
                              value="string:Asia/Krasnoyarsk"
                            >
                              (UTC+07:00) Krasnoyarsk
                            </option>
                            <option
                              label="(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi"
                              value="string:Asia/Shanghai"
                            >
                              (UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi
                            </option>
                            <option
                              label="(UTC+08:00) Kuala Lumpur, Singapore"
                              value="string:Asia/Singapore"
                            >
                              (UTC+08:00) Kuala Lumpur, Singapore
                            </option>
                            <option
                              label="(UTC+08:00) Taipei"
                              value="string:Asia/Taipei"
                            >
                              (UTC+08:00) Taipei
                            </option>
                            <option
                              label="(UTC+08:00) Perth"
                              value="string:Australia/Perth"
                            >
                              (UTC+08:00) Perth
                            </option>
                            <option
                              label="(UTC+08:00) Ulaanbaatar"
                              value="string:Asia/Ulaanbaatar"
                            >
                              (UTC+08:00) Ulaanbaatar
                            </option>
                            <option
                              label="(UTC+08:00) Irkutsk"
                              value="string:Asia/Irkutsk"
                            >
                              (UTC+08:00) Irkutsk
                            </option>
                            <option
                              label="(UTC+09:00) Seoul"
                              value="string:Asia/Seoul"
                            >
                              (UTC+09:00) Seoul
                            </option>
                            <option
                              label="(UTC+09:00) Osaka, Sapporo, Tokyo"
                              value="string:Asia/Tokyo"
                            >
                              (UTC+09:00) Osaka, Sapporo, Tokyo
                            </option>
                            <option
                              label="(UTC+09:30) Darwin"
                              value="string:Australia/Darwin"
                            >
                              (UTC+09:30) Darwin
                            </option>
                            <option
                              label="(UTC+09:30) Adelaide"
                              value="string:Australia/Adelaide"
                            >
                              (UTC+09:30) Adelaide
                            </option>
                            <option
                              label="(UTC+09:00) Yakutsk"
                              value="string:Asia/Yakutsk"
                            >
                              (UTC+09:00) Yakutsk
                            </option>
                            <option
                              label="(UTC+10:00) Canberra, Melbourne, Sydney"
                              value="string:Australia/Sydney"
                            >
                              (UTC+10:00) Canberra, Melbourne, Sydney
                            </option>
                            <option
                              label="(UTC+10:00) Brisbane"
                              value="string:Australia/Brisbane"
                            >
                              (UTC+10:00) Brisbane
                            </option>
                            <option
                              label="(UTC+10:00) Hobart"
                              value="string:Australia/Hobart"
                            >
                              (UTC+10:00) Hobart
                            </option>
                            <option
                              label="(UTC+10:00) Guam, Port Moresby"
                              value="string:Pacific/Port_Moresby"
                            >
                              (UTC+10:00) Guam, Port Moresby
                            </option>
                            <option
                              label="(UTC+10:00) Vladivostok"
                              value="string:Asia/Vladivostok"
                            >
                              (UTC+10:00) Vladivostok
                            </option>
                            <option
                              label="(UTC+11:00) Solomon Is., New Caledonia"
                              value="string:Pacific/Guadalcanal"
                            >
                              (UTC+11:00) Solomon Is., New Caledonia
                            </option>
                            <option
                              label="(UTC+10:00) Magadan"
                              value="string:Asia/Magadan"
                            >
                              (UTC+10:00) Magadan
                            </option>
                            <option
                              label="(UTC+12:00) Fiji"
                              value="string:Pacific/Fiji"
                            >
                              (UTC+12:00) Fiji
                            </option>
                            <option
                              label="(UTC+12:00) Auckland, Wellington"
                              value="string:Pacific/Auckland"
                            >
                              (UTC+12:00) Auckland, Wellington
                            </option>
                            <option
                              label="(UTC+12:00) Coordinated Universal Time +12"
                              value="string:Etc/GMT-12"
                            >
                              (UTC+12:00) Coordinated Universal Time +12
                            </option>
                            <option
                              label="(UTC+13:00) Nuku'alofa"
                              value="string:Pacific/Tongatapu"
                            >
                              (UTC+13:00) Nuku'alofa
                            </option>
                            <option
                              label="(UTC+13:00) Samoa"
                              value="string:Pacific/Samoa"
                            >
                              (UTC+13:00) Samoa
                            </option>
                          </CSelect>
                        </CInputGroup>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CFormGroup>
                        <CLabel htmlFor="language">UI Language</CLabel>
                        <CInputGroup>
                          <CSelect
                            size="md"
                            name="language"
                            id="language"
                            onChange={handleOnChange}
                            value={fields.language}
                            invalid={errors.language}
                            onBlur={handleOnBlur}
                          >
                            <option value="">Select language</option>
                            {language.map((item, index) => {
                              return (
                                <option value={item.code} key={index}>
                                  {item.language}
                                </option>
                              );
                            })}
                          </CSelect>
                        </CInputGroup>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </>
              )}
              <hr />
              {account_detail.is_owner ? (
                <CRow>
                  <CCol sm="8" md="8" xl="xl">
                    <h6>Delete account</h6>
                    <p>
                      You can permanently delete your Kyrio account and all its
                      data
                    </p>
                  </CCol>
                  <CCol sm="4" md="4" xl="xl" className="mt-3 mb-xl-0">
                    <CButton
                      block
                      variant="ghost"
                      className="btn-pill pull-right"
                      color="success"
                      onClick={() => openModal("delete")}
                    >
                      DELETE
                    </CButton>
                  </CCol>
                </CRow>
              ) : (
                ""
              )}
            </CCardBody>
            <CCardFooter>
              <CRow>
                <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                  <CButton
                    block
                    variant="outline"
                    className="btn-pill pull-right"
                    color="danger"
                    onClick={redirectToDashboard}
                  >
                    CANCEL
                  </CButton>
                </CCol>
                <CCol
                  sm="6"
                  md="6"
                  xl="xl"
                  className="mb-3 mb-xl-0 form-actions"
                >
                  <CButton
                    block
                    type="submit"
                    variant="outline"
                    className="btn-pill pull-right"
                    color="success"
                    onClick={saveAccount}
                  >
                    {saving ? <CSpinner /> : "SAVE"}
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

export default Account;
