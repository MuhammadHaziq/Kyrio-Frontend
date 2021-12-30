import React, { useState, useEffect, useRef } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormGroup,
  CFade,
  CCollapse,
  CSelect,
} from "@coreui/react";
import PosDeviceDatatable from "../../../datatables/settings/posDevice/PosDeviceDatatable";
import CIcon from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";
import {
  get_pos_devices,
  get_store_pos_device,
  delete_pos_devices,
  redirect_back_pos_devices,
} from "../../../actions/settings/posDeviceActions";
import AddPosDevice from "../../../components/settings/posDevice/AddPosDevice";
import UpdatePosDevice from "../../../components/settings/posDevice/UpdatePosDevice";
import ConformationAlert from "../../../components/conformationAlert/ConformationAlert";

const PosDevice = () => {
  const [collapse, ] = useState([true, true]);
  const [fadePosDevice, setFadePosDevice] = useState(true);
  const [fadeAddPosDevice, setFadeAddPosDevice] = useState(false);
  const [fadeUpdatePosDevice, setFadeUpdatePosDevice] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [timeout] = useState(300);
  const [selectedStoreId, setSelectedStoreId] = useState("");
  const dispatch = useDispatch();
  const posDevice = useSelector(
    (state) => state.settingReducers.posDeviceReducer
  );

  const store = useSelector((state) => state.settingReducers.storeReducer);

  useEffect(() => {
    dispatch(get_pos_devices());
  }, [dispatch]);

  useEffect(() => {
    if (
      posDevice.redirect_pos_device_update !== undefined &&
      posDevice.redirect_pos_device_update === true
    ) {
      setFadeUpdatePosDevice(true);
      setFadePosDevice(false);
      setFadeAddPosDevice(false);
    }
  }, [posDevice.redirect_pos_device_update]);
  const addNewPosDevice = () => {
    dispatch(redirect_back_pos_devices(false));
    setFadePosDevice(false);
    setFadeAddPosDevice(true);
    setFadeUpdatePosDevice(false);
  };
  const goBack = () => {
    dispatch(redirect_back_pos_devices(true));
    setFadePosDevice(true);
    setFadeAddPosDevice(false);
    setFadeUpdatePosDevice(false);
  };

  const storeHandleChange = (e) => {
    setSelectedStoreId(e.target.value);
    dispatch(get_store_pos_device(e.target.value));
  };
  // const toggleCollapse = (tab) => {
  //   const state = collapse.map((x, index) => (tab === index ? !x : x));
  //   setCollapse(state);
  // };
  const deletePosDevices = () => {
    const data = posDevice.pos_device_list
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    dispatch(delete_pos_devices(JSON.stringify(data)));
  };

  // const hideAlert = () => {
  //   setShowAlert(!showAlert);
  // };

  return (
    <React.Fragment>
      <div className="animated fadeIn">
        {fadeUpdatePosDevice ? (
          <CFade timeout={timeout} in={fadeUpdatePosDevice}>
            <UpdatePosDevice
              goBack={goBack}
              posDevices={posDevice.pos_device_row}
            />
          </CFade>
        ) : (
          ""
        )}
        {fadeAddPosDevice ? (
          <CFade timeout={timeout} in={fadeAddPosDevice}>
            <AddPosDevice goBack={goBack} stores={store.stores_list} />
          </CFade>
        ) : (
          ""
        )}
        {fadePosDevice ? (
          <CFade timeout={timeout} in={fadePosDevice}>
            <CRow>
              <CCol xs="12" lg="12">
                <CCard>
                  <CCardHeader>
                    <CRow>
                      <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                        <CButton
                          className="btn-square pull right"
                          color="success"
                          onClick={addNewPosDevice}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="c-icon c-icon-sm"
                            role="img"
                          >
                            <polygon
                              fill="var(--ci-primary-color, currentColor)"
                              points="440 240 272 240 272 72 240 72 240 240 72 240 72 272 240 272 240 440 272 440 272 272 440 272 440 240"
                              className="ci-primary"
                            ></polygon>
                          </svg>
                          ADD POS DEVICE
                        </CButton>
                        { posDevice?.pos_device_list?.filter(
                          (item) => item.isDeleted === true
                        ).length > 0 ? (
                          <ConformationAlert
                            button_text="Ok"
                            heading="Delete POS"
                            section={`Are you sure you want to delete POS  (${posDevice?.pos_device_list?.filter((item) => item.isDeleted === true)
                              .map((item) => item.title)
                              .join(",")}) ?
                              Kyrio POS app will be deactivated on the device assigned to this POS.`}
                            buttonAction={deletePosDevices}
                            show_alert={showAlert}
                            hideAlert={setShowAlert}
                            variant="outline"
                            className="ml-2"
                            color="danger"
                            block={false}
                          />
                        ) : (
                          ""
                        )}
                      </CCol>

                      <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                        <CFormGroup>
                          <CSelect
                            size="md"
                            name="selectStore"
                            id="selectStore"
                            value={selectedStoreId}
                            onChange={storeHandleChange}
                          >
                            <option value="0">Select Store</option>
                            {store.stores_list.map((item, index) => {
                              return (
                                <option value={item._id} key={index}>
                                  {item.title}
                                </option>
                              );
                            })}
                          </CSelect>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCollapse show={collapse[0]}>
                    <CCardBody>
                      <PosDeviceDatatable
                        pos_devices={posDevice.pos_device_list}
                      />
                    </CCardBody>
                  </CCollapse>
                </CCard>
              </CCol>
            </CRow>
          </CFade>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};
export default PosDevice;
// sm={
//   posDevice.pos_device_list.filter(
//     (item) => item.isDeleted == true
//   ).length > 0
//     ? "4"
//     : "8"
// }
// md={
//   posDevice.pos_device_list.filter(
//     (item) => item.isDeleted == true
//   ).length > 0
//     ? "4"
//     : "8"
// }
