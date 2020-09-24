import React, { useState, useEffect } from "react";
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
import { CIcon } from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";
import {
  get_pos_devices,
  get_store_pos_device,
  delete_pos_devices,
  redirect_back_pos_devices,
} from "../../../actions/settings/posDeviceActions";
import AddPosDevice from "../../../components/settings/posDevice/AddPosDevice";

const PosDevice = () => {
  const [collapse, setCollapse] = useState([true, true]);
  const [fadePosDevice, setFadePosDevice] = useState(true);
  const [fadeAddPosDevice, setFadeAddPosDevice] = useState(false);
  const [timeout] = useState(300);
  const [selectedStoreId, setSelectedStoreId] = useState("");
  const dispatch = useDispatch();
  const posDevice = useSelector(
    (state) => state.settingReducers.posDeviceReducer
  );
  const store = useSelector((state) => state.settingReducers.storeReducer);

  useEffect(() => {
    // if (
    //   posDevice.pos_device_list === undefined ||
    //   posDevice.pos_device_list.length === 0
    // ) {
    dispatch(get_pos_devices());
    // }
  }, [dispatch]);

  const addNewPosDevice = () => {
    dispatch(redirect_back_pos_devices(false));
    setFadePosDevice(false);
    setFadeAddPosDevice(true);
  };
  const goBack = () => {
    dispatch(redirect_back_pos_devices(true));
    setFadePosDevice(true);
    setFadeAddPosDevice(false);
  };

  const storeHandleChange = (e) => {
    setSelectedStoreId(e.target.value);
    dispatch(get_store_pos_device(e.target.value));
  };
  const toggleCollapse = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };
  const deletePosDevices = () => {
    const data = posDevice.pos_device_list
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    dispatch(delete_pos_devices(JSON.stringify(data)));
  };
  return (
    <React.Fragment>
      <div className="animated fadeIn">
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
                          ADD POS DEVICE
                        </CButton>
                        {posDevice.pos_device_list.filter(
                          (item) => item.isDeleted === true
                        ).length > 0 ? (
                          <CButton
                            variant="outline"
                            className="ml-2"
                            color="danger"
                            onClick={deletePosDevices}
                          >
                            DELETE
                          </CButton>
                        ) : (
                          ""
                        )}
                      </CCol>

                      <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
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

                    {/*<div className="card-header-actions">
                      <CLink
                        className="card-header-action"
                        onClick={() => toggleCollapse(0)}
                      >
                        <CIcon
                          name={
                            collapse[0]
                              ? "cil-chevron-bottom"
                              : "cil-chevron-top"
                          }
                        />
                      </CLink>
                    </div>*/}
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
