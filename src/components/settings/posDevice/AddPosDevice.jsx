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
import { add_new_pos_device } from "../../../actions/settings/posDeviceActions.js";
import { useDispatch, useSelector } from "react-redux";
const AddPosDevice = (props) => {
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const [collapse, setCollapse] = useState([true, true]);
  const [expRight, setExpRight] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [timeout, setTimeout] = useState(300);
  const [fields, setFields] = useState({ pos_device_name: "" });
  const [errors, setErrors] = useState({ pos_device_name: "" });
  const [storeId, setStoreId] = useState({
    storeId: 0,
    storeName: "Select Store",
  });
  const [selectedStoreId, setSelectedStoreId] = useState();

  const [fade, setFade] = useState(true);
  const dispatch = useDispatch();
  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };
  const goBack = () => {
    props.goBack();
  };
  const submitStoreForm = (e) => {
    e.preventDefault();
    if (storeId["storeId"] == 0) {
      alert("Select Store");
    } else {
      const data = {
        title: fields.pos_device_name,
        store: JSON.stringify(storeId),
      };
      dispatch(add_new_pos_device(data));
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
    console.log(e.target.value);
    const store = props.stores.filter((item) => item._id == e.target.value);
    let storeData;
    if (e.target.value == 0) {
      storeData = {
        storeId: 0,
        storeName: "Select Store",
      };
    } else {
      storeData = {
        storeId: store[0]._id,
        storeName: store[0].title,
      };
    }

    setStoreId(storeData);
    setSelectedStoreId(e.target.value);
  };
  return (
    <CCard>
      <CCardHeader>
        <h4>
          <strong>Add New Pos Device</strong>
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
          <CForm onSubmit={submitStoreForm}>
            <CFormGroup row="row">
              <CCol md="12">
                <CLabel htmlFor="store_name">Pos Device Name</CLabel>
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-device" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    id="pos_device_name"
                    name="pos_device_name"
                    placeholder="Pos Device Name"
                    onChange={handleOnChange}
                  />
                </CInputGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup>
              <CSelect
                custom
                size="md"
                name="selectStore"
                id="selectStore"
                value={selectedStoreId}
                onChange={storeHandleChange}
              >
                <option value="0">Select Store</option>
                {props.stores.map((item) => {
                  return <option value={item._id}>{item.title}</option>;
                })}
              </CSelect>
            </CFormGroup>
            <CRow>
              <CCol col="6" sm="4" md="2" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  variant="ghost"
                  className="float-left"
                  color="default"
                  onClick={goBack}
                >
                  BACK
                </CButton>
              </CCol>
              <CCol col="6" sm="4" md="2" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  variant="ghost"
                  className="float-left"
                  color="danger"
                  onClick={goBack}
                >
                  CANCEL
                </CButton>
              </CCol>
              <CCol
                col="6"
                sm="4"
                md="8"
                xl="xl"
                className="mb-3 mb-xl-0 form-actions"
              >
                <CButton
                  type="submit"
                  variant="ghost"
                  className="float-right"
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

export default AddPosDevice;
