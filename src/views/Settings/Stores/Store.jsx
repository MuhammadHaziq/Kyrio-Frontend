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
  CLink
} from "@coreui/react";
import StoreDatatable from '../../../datatables/stores/StoreDatatable'
import {CIcon} from "@coreui/icons-react";
import {useSelector, useDispatch} from "react-redux";
import {get_stores} from "../../../actions/settings/storeActions";
import AddStore from '../../../components/settings/stores/AddStore'
const Stores = () => {
  const [collapse, setCollapse] = useState([true, true]);
  const [checked, setChecked] = useState([true, true]);
  const [fadeStore, setFadeStore] = useState(true);
  const [fadeAddStore, setFadeAddStore] = useState(false);
  const [timeout, setTimeout] = useState(300);
  const dispatch = useDispatch()
  const store = useSelector((state) => state.settingReducers.storeReducer)

  useEffect(() => {
    dispatch(get_stores())
  }, [])

  const editBillingDetails = () => {
    setFadeStore(false)
    setFadeAddStore(true)
  }
  const goBack = () => {
    setFadeStore(true)
    setFadeAddStore(false)
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
        fadeAddStore
          ? <CFade timeout={timeout} in={fadeAddStore}>
              <AddStore goBack={goBack} />
            </CFade>
          : ""
      }
      {
        fadeStore
          ? <CFade timeout={timeout} in={fadeStore}>
              <CRow>
                <CCol xs="12" lg="12">
                  <CCard>
                    <CCardHeader>
                      Add New Store
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
                            <CButton block="block" variant="outline" color="primary" onClick={editBillingDetails}>ADD STORE</CButton>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCollapse>
                  </CCard>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm='12'>
                  <StoreDatatable stores={store.stores_list}/>
                </CCol>
              </CRow>
            </CFade>
          : ""
      }
    </div>
  </React.Fragment>);
}
export default Stores;
