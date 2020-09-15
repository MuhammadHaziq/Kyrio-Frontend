import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLink,
  CForm,
  CSelect,
  CInvalidFeedback,
} from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { add_new_pos_device } from "../../../actions/settings/posDeviceActions.js";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

const AddPosDevice = (props) => {
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const redirect_pos_devices = useSelector(
    (state) => state.settingReducers.posDeviceReducer.redirect_pos_devices
  );
  const [collapse, setCollapse] = useState([true, true]);
  const [fields, setFields] = useState({ pos_device_name: "" });
  const [errors, setErrors] = useState({
    pos_device_name: false,
    storeId: false,
  });
  const [storeId, setStoreId] = useState({
    storeId: 0,
    storeName: "Select Store",
  });
  const [selectedStoreId, setSelectedStoreId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (redirect_pos_devices !== undefined && redirect_pos_devices === true) {
      props.goBack();
    }
  }, [redirect_pos_devices]);

  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };
  const goBack = () => {
    props.goBack();
  };
  const submitStoreForm = (e) => {
    e.preventDefault();
    if (storeId["storeId"] === "0") {
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
  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: validator.isEmpty(value),
    });
  };

  const storeHandleChange = (e) => {
    const store = props.stores.filter((item) => item._id === e.target.value);
    let storeData;
    if (e.target.value === 0) {
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
          <strong>Create Pos Device</strong>
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
                    invalid={errors.pos_device_name}
                    onBlur={handleOnBlur}
                    value={fields.pos_device_name}
                  />
                  <CInvalidFeedback>
                    {validator.isEmpty(fields.pos_device_name)
                      ? "Please Enter The Pos Device Name"
                      : ""}
                  </CInvalidFeedback>
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
              <CCol col="6" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  block
                  className="btn-pill pull-right"
                  variant="outline"
                  color="default"
                  onClick={goBack}
                >
                  BACK
                </CButton>
              </CCol>
              <CCol col="6" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  block
                  className="btn-pill pull-right"
                  variant="outline"
                  color="secondary"
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
                  color="success"
                  disabled={
                    storeId["storeId"] === 0 || fields.pos_device_name === ""
                  }
                  block
                  className="btn-pill pull-right"
                  variant="outline"
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
