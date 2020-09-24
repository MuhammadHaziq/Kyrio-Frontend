import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CRow,
  CFormGroup,
  CLabel,
  CInput,
  CInvalidFeedback,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
  CSelect,
  CListGroup,
  CListGroupItem,
  CSwitch,
  CLink,
} from "@coreui/react";
import {
  MdEmail,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdBusiness,
  MdGTranslate,
} from "react-icons/md";
import validator from "validator";
import { useSelector, useDispatch } from "react-redux";
import parse from "html-react-parser";
import { toggle_feature_module } from "../../../actions/settings/featuresActions";
const General = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [collapsed, setCollapsed] = React.useState([true, true]);
  const [sChecked, setChecked] = React.useState(user.roleData.features);
  const [formState, setFormState] = useState({
    values: {
      email: user.email,
      business: user.businessName,
      language: "",
    },
    errors: {
      email: false,
      business: false,
      language: false,
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
  const handleFeature = (index, enable) => {
    let array = sChecked;
    array[index].enable = !enable;
    setChecked([...array]);
  };
  const handleBlur = (e) => {};

  const saveFeatures = () => {
    const features = (sChecked || []).map((item) => {
      return {
        featureId: item.featureId,
        enable: item.enable,
        feature_id: item._id,
      };
    });
    console.log("features", features);
    const data = {
      features: JSON.stringify(features),
    };
    dispatch(toggle_feature_module(data));
  };

  const handleLanguageChange = (event) => {
    console.log(sChecked);
  };

  return (
    <div className="animated fadeIn">
      <CCard>
        <CCardHeader>
          <strong>General settings</strong>
          <div className="card-header-actions">
            <CLink
              className="card-header-action"
              onClick={() => setCollapsed([!collapsed[0], collapsed[1]])}
            >
              {collapsed[0] ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </CLink>
          </div>
        </CCardHeader>
        <CCollapse show={collapsed[0]}>
          <CCardBody>
            <CFormGroup row>
              <CLabel htmlFor="email">Email</CLabel>
              <CInputGroup>
                <CInput
                  type="text"
                  invalid={formState.errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={formState.values.email}
                />
                <CInputGroupAppend>
                  <CInputGroupText>
                    <MdEmail />
                  </CInputGroupText>
                </CInputGroupAppend>
                {validator.isEmpty(formState.values.email) ? (
                  <CInvalidFeedback>This cannot be blank</CInvalidFeedback>
                ) : !validator.isEmail(formState.values.email) ? (
                  <CInvalidFeedback>Address is not correct</CInvalidFeedback>
                ) : (
                  ""
                )}
              </CInputGroup>
            </CFormGroup>
            <CFormGroup row>
              <CLabel htmlFor="business">Business name</CLabel>
              <CInputGroup>
                <CInput
                  type="text"
                  invalid={formState.errors.business}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="business"
                  id="business"
                  placeholder="Business name"
                  value={formState.values.business}
                />
                <CInputGroupAppend>
                  <CInputGroupText>
                    <MdBusiness />
                  </CInputGroupText>
                </CInputGroupAppend>
                <CInvalidFeedback>This cannot be blank</CInvalidFeedback>
              </CInputGroup>
            </CFormGroup>
            {/* <CFormGroup row>
                        <CLabel htmlFor="timezone">Timezone</CLabel>
                        <CInputGroup>
                            <CSelect
                                type="select"
                                invalid={formState.errors.timezone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="timezone"
                                id="timezone"
                                placeholder="Timezone"
                                value={formState.values.timezone}>
                                <option value="">Please select</option>
                                <option value="1">(UTC+05:00) Islamabad, Karachi</option>
                                <option value="2">(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                                <option value="3">(UTC+05:30) Sri Jayawardenepura</option>
                            </CSelect>
                             <CInputGroupAppend>
                                <CInputGroupText>
                                    <MdAccessTime />
                                </CInputGroupText>
                            </CInputGroupAppend>
                            <CInvalidFeedback>
                                This cannot be blank
                            </CInvalidFeedback>
                        </CInputGroup>
                    </CFormGroup> */}
            <CFormGroup row>
              <CLabel htmlFor="language">UI Language</CLabel>
              <CInputGroup>
                <CSelect
                  type="select"
                  invalid={formState.errors.language}
                  onChange={handleLanguageChange}
                  onBlur={handleBlur}
                  name="language"
                  id="language"
                  placeholder="UI Language"
                  value={formState.values.language}
                >
                  <option value="">Please select</option>
                  <option label="English" value="en">
                    English
                  </option>
                  <option label="Korean" value="ko">
                    Korean
                  </option>
                  <option label="Chinese" value="chi">
                    Chinese
                  </option>
                  <option label="Urdu" value="ur">
                    Urdu
                  </option>
                </CSelect>
                <CInputGroupAppend>
                  <CInputGroupText>
                    <MdGTranslate />
                  </CInputGroupText>
                </CInputGroupAppend>
                <CInvalidFeedback>This cannot be blank</CInvalidFeedback>
              </CInputGroup>
            </CFormGroup>
          </CCardBody>
        </CCollapse>
      </CCard>
      <CCard>
        <CCardHeader>
          <strong>Features</strong>
          <div className="card-header-actions">
            <CLink
              className="card-header-action"
              onClick={() => setCollapsed([collapsed[0], !collapsed[1]])}
            >
              {collapsed[1] ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </CLink>
          </div>
        </CCardHeader>
        <CCollapse show={collapsed[1]}>
          <CCardBody>
            <CListGroup>
              {(user.roleData.features || []).map((itm, index) => {
                return (
                  <CListGroupItem
                    key={index}
                    className="justify-content-between"
                    style={{ marginBottom: "2%" }}
                  >
                    <h5>
                      {parse(itm.icon || "")}&nbsp;{itm.featureName || ""}
                      <CSwitch
                        className={"mx-1 float-right"}
                        shape="pill"
                        color={"success"}
                        checked={sChecked[index].enable || ""}
                        onChange={() =>
                          handleFeature(index, sChecked[index].enable)
                        }
                      />
                    </h5>
                    <p style={{ paddingLeft: "25px" }}>
                      {parse(itm.description)}
                    </p>
                  </CListGroupItem>
                );
              })}
            </CListGroup>
          </CCardBody>
        </CCollapse>
      </CCard>
      <CRow>
        <CCol sm xs="12" className="text-center mt-3">
          <CButton
            color="secondary"
            block
            className="btn-pill pull-right"
            outline="outline"
          >
            CANCEL
          </CButton>
        </CCol>
        <CCol sm xs="12" className="text-center mt-3">
          <CButton
            color="success"
            block
            className="btn-pill pull-right"
            outline="outline"
            onClick={saveFeatures}
          >
            SAVE
          </CButton>
        </CCol>
      </CRow>
    </div>
  );
};

export default General;
