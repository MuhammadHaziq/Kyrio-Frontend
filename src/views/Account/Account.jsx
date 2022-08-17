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
const redirectToDashboard =  () => {
  window.location.href = "/"
}
  const saveAccount = () => {
      let error = false;
      if(fields.businessName === null && fields.businessName === undefined){
        error = true
      }
      if(fields.language === null && fields.language === undefined){
        error = true
      }
      if(!error){
        const data = {
          businessName: fields.businessName,
          timezone: fields.timezone,
          language: fields.language,
        };
        setSaving(true);
        dispatch(set_account_info(data));
        setTimeout(()=>{
          setSaving(false);
        },1000)
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
          const data = { reason: reasons, comments: comments, confirm: confirmDelete };
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
                access any of its data. All subscriptions to Kyrio services
                will be cancelled.
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
            {changeType == "confirm" ? "DELETE ACCOUNT" : "CONTINUE" }
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
                            <option value="1">
                              (UTC+05:00) Islamabad, Karachi
                            </option>
                            <option value="2">
                              (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi
                            </option>
                            <option value="3">
                              (UTC+05:30) Sri Jayawardenepura
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
                    {saving ? (
                      <CSpinner />
                    ) : (
                    "SAVE")}
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
