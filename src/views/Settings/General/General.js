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
import { toggle_feature_module, get_setting_features } from "../../../actions/settings/featuresActions";
// import ConformationAlert from "../../../components/conformationAlert/ConformationAlert";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { setTimeout } from "core-js";

var languages = require("language-list")();

const General = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [collapsed, setCollapsed] = React.useState([true, true]);
  const [showFeatures, setShowFeatures] = React.useState(true);
  const [sChecked, setChecked] = React.useState(user.features);
  const [language] = useState(languages.getData());
  const [checkPrev, setCheckPrev] = useState([]);

  const [formState, setFormState] = useState({
    values: {
      email: user.email,
      business: user.businessName,
      language: "en",
    },
    errors: {
      email: false,
      business: false,
      language: false,
    },
  });
 useEffect(()=>{
  dispatch(get_setting_features());
 },[])
  const closeAlert = () => {
    // setChecked(user.features);
    dispatch(get_setting_features());
  }
  const showAlert = (param) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h3>{param.heading}</h3>
            <p>{param.section}</p>
            <CRow>
              <CCol sm xs="6" md="6" lg="6" className="text-center mt-3">
                <CButton
                  color="secondary"
                  block
                  className="btn-pill pull-right"
                  outline="outline"
                  onClick={() => { closeAlert(); onClose(); }}
                >
                  CANCEL
                </CButton>
              </CCol>
              <CCol sm xs="6" md="6" lg="6" className="text-center mt-3">
                <CButton
                  color="danger"
                  block
                  className="btn-pill pull-right"
                  outline="outline"
                  onClick={() => {
                    saveAlertFeatures();
                    onClose();
                  }}
                >
                  DISABLE
                </CButton>
              </CCol>
            </CRow>
          </div>
        );
      }
    });
  };
  useEffect(() => {
    if (
      user.features !== undefined &&
      user.features !== null &&
      user.features.length > 0
    ) {
      setCheckPrev([
        user.features.filter(
          (item) =>
            item.feature.title.toUpperCase() ===
              "Customer displays".toUpperCase() && item.enable === true
        ).length > 0,

        user.features.filter(
          (item) =>
            item.feature.title.toUpperCase() === "Dining options".toUpperCase() &&
            item.enable === true
        ).length > 0,
        user.features.filter(
          (item) =>
            item.feature.title.toUpperCase() ===
              "Kitchen printers".toUpperCase() && item.enable === true
        ).length > 0,
      ]);
      setChecked(user.features);
    }
  }, [user.features]);

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
    let hold = false
    let settings = (user.settings || []).map((item, index) => {
      let feature = item.feature !== null ? item.feature._id : null
      let enable = (sChecked || []).filter(itm => itm.feature._id == feature)
      enable = enable.length > 0 ? enable[0].enable : item.enable
      return {
        feature: feature,
        enable: enable,
        _id: item._id,
        module: item.module._id
      };
    })
    const features = (sChecked || []).map((item, index) => {
      return {
        featureId: item.feature._id,
        enable: item.enable,
        _id: item._id,
        name: item.feature.title,
        index: index,
      };
    });
    // const settings = (sChecked || []).map((item, index) => {
    //   return {
    //     featureId: item.feature._id,
    //     enable: item.enable,
    //     _id: item._id,
    //     name: item.feature.title,
    //     index: index,
    //   };
    // });
    const customer_displays =
      features.filter(
        (item) =>
          item.name.toUpperCase() ===
            "Customer displays".toUpperCase() && item.enable === false
      ).length > 0;
    const dining_option =
      features.filter(
        (item) =>
          item.name.toUpperCase() === "Dining options".toUpperCase() &&
          item.enable === false
      ).length > 0;
    const kitchen_printer =
      features.filter(
        (item) =>
          item.name.toUpperCase() ===
            "Kitchen printers".toUpperCase() && item.enable === false
      ).length > 0;
      
    if (
      kitchen_printer &&
      checkPrev[2] === true
    ) {
      showAlert({
        button_text: "Disbale",
        heading: "Disable kitchen printers",
        section:
          "Are you sure you want to disable kitchen printers? All settings of the kitchen printers will be lost.",
        index: features
          .filter(
            (item) => item.name.toUpperCase() ===
                "Kitchen printers".toUpperCase()
          )
          .map((item) => {
            return item.index;
          }),
      });
      hold = true
    } else if (
      customer_displays &&
      checkPrev[0] === true
    ) {
      showAlert({
        button_text: "Disbale",
        heading: "Disable customer displays",
        section:
          "Are you sure you want to disable customer displays? All customer displays settings will be reset.",
        index: features
          .filter(
            (item) =>
              item.name.toUpperCase() ===
                "Customer displays".toUpperCase()
          )
          .map((item) => {
            return item.index;
          }),
      });
      hold = true
    } else if (
      dining_option &&
      checkPrev[1] === true
    ) {
      showAlert({
        button_text: "Disbale",
        heading: "Disable dining options",
        section:
          "Are you sure you want to disable dining options? All settings of the dining options will be lost.",
        index: features
          .filter(
            (item) =>
              item.name.toUpperCase() ===
                "Dining options".toUpperCase()
          )
          .map((item) => {
            return item.index;
          }),
      });
      hold = true
    } 
    if(!hold){
      const data = {
        features: features,
        settings: settings
      };
      dispatch(toggle_feature_module(data));
    }
  };

  const saveAlertFeatures = () => {
    let settings = (user.settings || []).map((item, index) => {
      let feature = item.feature !== null ? item.feature._id : null
      let enable = (sChecked || []).filter(itm => itm.feature._id == feature)
      enable = enable.length > 0 ? enable[0].enable : item.enable
      return {
        feature: feature,
        enable: enable,
        _id: item._id,
        module: item.module._id
      };
    })
    const features = (sChecked || []).map((item, index) => {
      return {
        featureId: item.feature._id,
        enable: item.enable,
        _id: item._id,
        name: item.feature.title,
        index: index,
      };
    });
    const data = {
      features: features,
      settings: settings
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
                  custom
                  size="md"
                  name="language"
                  id="language"
                  value={formState.values.language}
                  onChange={handleChange}
                  invalid={formState.errors.language}
                  onBlur={handleBlur}
                >
                  {language.map((item, index) => {
                    return (
                      <option value={item.code} key={index}>
                        {item.language}
                      </option>
                    );
                  })}
                </CSelect>
                <CInputGroupAppend>
                  <CInputGroupText>
                    <MdGTranslate />
                  </CInputGroupText>
                </CInputGroupAppend>
                <CInvalidFeedback>
                  {formState.errors.language
                    ? "Please Select The Language"
                    : ""}
                </CInvalidFeedback>
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
            {showFeatures ? 
            <CListGroup>
              {/*// user.features */}
              {(sChecked || []).map((itm, index) => {
                return (
                  <CListGroupItem
                    key={index}
                    className="justify-content-between"
                    style={{
                      marginBottom: "2%",
                      height: "65px",
                      lineHeight: "0.23",
                      border: "none",
                    }}
                  >
                    <h5>
                      {parse(itm.feature.icon || "")}&nbsp;{itm.feature.title || ""}
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
                    <p style={{ paddingLeft: "25px", lineHeight: "normal" }}>
                      {parse(itm.feature.description)}
                    </p>
                  </CListGroupItem>
                );
              })}
            </CListGroup>
            : "Loading..."}
          </CCardBody>
        </CCollapse>
      </CCard>
      <CRow>
        <CCol sm xs="6" md="6" lg="6" className="text-center mt-3">
          <CButton
            color="danger"
            block
            className="btn-pill pull-right"
            outline="outline"
          >
            BACK
          </CButton>
        </CCol>
        <CCol sm xs="6" md="6" lg="6" className="text-center mt-3">
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
        {/* <CCol sm xs="12" md="2" lg="2" className="text-center mt-3">
         <ConformationAlert
           button_text={modelState.button_text}
           heading={modelState.heading}
           section={modelState.section}
           buttonAction={saveAlertFeatures}
           show_alert={showAlert}
           hideAlert={hideShowAlert}
           className="btn-pill pull-right"
           outline="outline"
           block="block"
         />
       </CCol> */}
    </div>
  );
};

export default General;
