import React, {useState, useEffect} from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CFormGroup,
  CInput,
  CLabel,
  CFade,
  CCollapse,
  CLink,
  CSelect
} from "@coreui/react";
import PosDeviceDatatable from '../../../datatables/settings/posDevice/PosDeviceDatatable'
import {CIcon} from "@coreui/icons-react";
import {useSelector, useDispatch} from "react-redux";
import {get_pos_devices, get_store_pos_device} from "../../../actions/settings/posDeviceActions";
import AddPosDevice from '../../../components/settings/posDevice/AddPosDevice'

const PosDevice = () => {
  const [collapse, setCollapse] = useState([true, true]);
  const [fadePosDevice, setFadePosDevice] = useState(true);
  const [fadeAddPosDevice, setFadeAddPosDevice] = useState(false);
  const [timeout, setTimeout] = useState(300);
  const [selectedStoreId, setSelectedStoreId] = useState('')
  const dispatch = useDispatch()
  const posDevice = useSelector((state) => state.settingReducers.posDeviceReducer)
  const store = useSelector((state) => state.settingReducers.storeReducer)

  useEffect(() => {
    dispatch(get_pos_devices())
  }, [])

  const addNewPosDevice = () => {
    setFadePosDevice(false)
    setFadeAddPosDevice(true)
  }
  const goBack = () => {
    setFadePosDevice(true)
    setFadeAddPosDevice(false)
  }

  const storeHandleChange = (e) => {
    setSelectedStoreId(e.target.value)
    dispatch(get_store_pos_device(e.target.value))
  }
  const toggleCollapse = (tab) => {
    const state = collapse.map((x, index) => (
      tab === index
      ? !x
      : x));
    setCollapse(state)
  }
  return (<React.Fragment>
    <div className="animated fadeIn">
      {
        fadeAddPosDevice
          ? <CFade timeout={timeout} in={fadeAddPosDevice}>
              <AddPosDevice goBack={goBack} stores={store.stores_list}/>
            </CFade>
          : ""
      }
      {
        fadePosDevice
          ? <CFade timeout={timeout} in={fadePosDevice}>
              <CRow>
                <CCol xs="12" lg="12">
                  <CCard>
                    <CCardHeader>
                      Add Pos Device
                      <div className="card-header-actions">

                        <CLink className="card-header-action" onClick={() => toggleCollapse(0)}>
                          <CIcon name={collapse[0]
                              ? 'cil-chevron-bottom'
                              : 'cil-chevron-top'}/>
                        </CLink>

                      </div>
                    </CCardHeader>
                    <CCollapse show={collapse[0]}>
                      <CCardBody>
                        <CRow>
                          <CCol col="6" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                            <CButton block="block" variant="outline" color="primary" onClick={addNewPosDevice}>ADD POS DEVICE</CButton>
                          </CCol>
                         <CCol col="6" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
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
                                {store.stores_list.map((item) => {
                                  return <option value={item._id}>{item.title}</option>;
                                })}
                              </CSelect>
                            </CFormGroup>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCollapse>
                  </CCard>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm='12'>
                  <PosDeviceDatatable pos_devices={posDevice.pos_device_list} />
                </CCol>
              </CRow>
            </CFade>
          : ""
      }
    </div>
  </React.Fragment>);
}
export default PosDevice;
