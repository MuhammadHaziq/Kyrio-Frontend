import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CFade,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CFormText,
  CLink,
  CInputGroupAppend,
  CForm,
  CInputCheckbox,
  CInputRadio,
  CSelect,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { TextMask, InputAdapter } from "react-text-mask-hoc";
import { add_new_dining_option } from "../../../actions/settings/diningOptionActions.js";
import { get_stores } from "../../../actions/settings/storeActions.js";
import { useDispatch, useSelector } from "react-redux";
const AddDiningOption = (props) => {
  // const store = useSelector((state) => state.settingReducers.storeReducer);
  const [collapse, setCollapse] = useState([true, true]);
  const [expRight, setExpRight] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [timeout, setTimeout] = useState(300);
  const [fields, setFields] = useState({ dining_name: "" });
  const [errors, setErrors] = useState({ dining_name: "" });
  const [storeId, setStoreId] = useState([]);

  const [fade, setFade] = useState(true);
  const dispatch = useDispatch();
  // useEffect(()=> {
  //   dispatch(get_stores())
  //
  // },[])
  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };
  const goBack = () => {
    props.goBack();
  };
  const submitDiningForm = (e) => {
    e.preventDefault();
    if (storeId.length == 0) {
      alert("Select Store");
    } else {
      const data = {
        title: fields.dining_name,
        store: JSON.stringify(storeId),
      };
      dispatch(add_new_dining_option(data));
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };
  const storeHandleChange = (e) => {
    const store = props.store.filter((item) => item._id == e.target.value);
    let storeData;
    storeData = {
      storeId: store[0]._id,
      storeName: store[0].title,
    };
    if (storeId.length == 0) {
      setStoreId([storeData]);
    } else {
      const checkExist = storeId.filter((item) => item.storeId == store[0]._id);
      if (checkExist.length == 0) {
        setStoreId([...storeId, storeData]);
      } else {
        const data = storeId.filter((item) => item.storeId !== store[0]._id);
        setStoreId(data);
      }
    }

    // setStoreId(storeData);
    // setSelectedStoreId(e.target.value);
  };
  return (
    <CCard>
      <CCardHeader>
        <h4>
          <strong>Add New Dining</strong>
          <div className="card-header-actions">
            <CLink className="card-header-action" onClick={() => toggle(0)}>
              <CIcon
                name={collapse[0] ? "cil-chevron-bottom" : "cil-chevron-top"}
              />
            </CLink>
          </div>
        </h4>
      </CCardHeader>
      <CCollapse show={collapse[0]}>
        <CCardBody>
          <CForm onSubmit={submitDiningForm}>
            <CFormGroup row="row">
              <CCol md="12">
                <CLabel htmlFor="store_name">Dining Name</CLabel>
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-device" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    id="dining_name"
                    name="dining_name"
                    placeholder="Dining Name"
                    onChange={handleOnChange}
                  />
                </CInputGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>Select Store</CLabel>
              </CCol>
              <CCol md="9">
                {props.store.map((item) => (
                  <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox
                      custom
                      name="storeId"
                      id={"storeId" + item._id}
                      value={item._id}
                      onChange={storeHandleChange}
                    />
                    <CLabel
                      variant="custom-checkbox"
                      htmlFor={"storeId" + item._id}
                    >
                      {item.title}
                    </CLabel>
                  </CFormGroup>
                ))}
              </CCol>
            </CFormGroup>
            <CRow>
              <CCol col="6" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  block="block"
                  variant="outline"
                  className="btn-pill pull-right"
                  color="default"
                  onClick={goBack}
                >
                  BACK
                </CButton>
              </CCol>
              <CCol col="6" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  block="block"
                  variant="outline"
                  className="btn-pill pull-right"
                  color="danger"
                  onClick={goBack}
                >
                  CANCEL
                </CButton>
              </CCol>
              <CCol
                col="6"
                sm="4"
                md="4"
                xl="xl"
                className="mb-3 mb-xl-0 form-actions"
              >
                <CButton
                  type="submit"
                  block="block"
                  variant="outline"
                  className="btn-pill pull-right"
                  color="primary"
                >
                  SAVE
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCollapse>
    </CCard>
  );
};

export default AddDiningOption;
