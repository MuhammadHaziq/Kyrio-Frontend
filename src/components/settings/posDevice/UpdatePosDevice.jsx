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
import CIcon from "@coreui/icons-react";
import {
  update_pos_device,
  delete_pos_devices,
  update_redirect_states_after_delete,
} from "../../../actions/settings/posDeviceActions.js";
import ConformationAlert from "../../conformationAlert/ConformationAlert";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

const UpdatePosDevice = (props) => {
  const redirect_pos_devices = useSelector(
    (state) => state.settingReducers.posDeviceReducer.redirect_pos_devices
  );
  const [collapse, setCollapse] = useState([true, true]);
  const [fields, setFields] = useState({ pos_device_name: "" });
  const [errors, setErrors] = useState({
    pos_device_name: false,
    selectedStoreId: false,
  });
  const [storeObject, setStore] = useState({
    _id: 0,
    title: "Select Store",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (redirect_pos_devices !== undefined && redirect_pos_devices === true) {
      props.goBack();
    }
  }, [props, redirect_pos_devices]);

  useEffect(() => {
    if (props.posDevices !== undefined) {
      setFields({
        pos_device_name: props.posDevices.title || "",
      });
      setStore({
        _id: props.posDevices.store._id || "0",
        title: props.posDevices.store.title || "Select STore",
      });
      setSelectedStoreId(props.posDevices.store._id || "0");
    }
  }, [props.posDevices]);
  const toggle = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };
  const goBack = () => {
    props.goBack();
  };
  const updatePosDevice = (e) => {
    e.preventDefault();
    if (fields.pos_device_name === "") {
      setErrors({
        ...errors,
        pos_device_name: validator.isEmpty(fields.pos_device_name),
      });
    } else {
      const data = {
        title: fields.pos_device_name,
        // store: JSON.stringify(storeObject),
        _id: props.posDevices._id,
      };
      dispatch(update_pos_device(data));
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

  const hideAlert = () => {
    setShowAlert(!showAlert);
  };

  const pos_device_delete = () => {
    const id = [props.posDevices._id];
    dispatch(delete_pos_devices(JSON.stringify(id)));
    dispatch(update_redirect_states_after_delete());
  };
  return (
    <CCard>
      <CCardHeader>
        <h4>
          <strong>Update Pos Device</strong>
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
          <CForm onSubmit={updatePosDevice}>
            <CFormGroup row={true}>
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
                size="md"
                name="selectedStoreId"
                id="selectedStoreId"
                value={selectedStoreId}
                disabled
              >
                <option value={storeObject._id || "0"}>
                  {storeObject.title || "Select Store"}
                </option>
              </CSelect>
            </CFormGroup>
            <CRow>
              <CCol col="6" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                <ConformationAlert
                  button_text="Delete"
                  heading="Delete POS"
                  section="Are you sure you want to delete POS? Loyverse POS app will be deactivated on the device assigned to this POS."
                  buttonAction={pos_device_delete}
                  show_alert={showAlert}
                  hideAlert={setShowAlert}
                  variant="outline"
                  color="danger"
                  className="btn-pill pull-left"
                  block={true}
                />
              </CCol>
              <CCol col="6" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                <CButton
                  block
                  className="btn-pill pull-right"
                  variant="outline"
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
                  color="success"
                  block
                  className="btn-pill pull-right"
                  variant="outline"
                >
                  UPDATE
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCollapse>
    </CCard>
  );
};

export default UpdatePosDevice;
