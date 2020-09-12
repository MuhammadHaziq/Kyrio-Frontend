import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFade,
  CCollapse,
} from "@coreui/react";
import StoreDatatable from "../../../datatables/settings/stores/StoreDatatable";
import { CIcon } from "@coreui/icons-react";
import { useSelector } from "react-redux";
import AddStore from "../../../components/settings/stores/AddStore";
const Stores = () => {
  const [collapse, setCollapse] = useState([true, true]);
  const [fadeStore, setFadeStore] = useState(true);
  const [fadeAddStore, setFadeAddStore] = useState(false);
  const [timeout] = useState(300);
  const store = useSelector((state) => state.settingReducers.storeReducer);

  const addNewStore = () => {
    setFadeStore(false);
    setFadeAddStore(true);
  };
  const goBack = () => {
    setFadeStore(true);
    setFadeAddStore(false);
  };
  const toggleCollapse = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };
  return (
    <React.Fragment>
      <div className="animated fadeIn">
        {fadeAddStore ? (
          <CFade timeout={timeout} in={fadeAddStore}>
            <AddStore goBack={goBack} />
          </CFade>
        ) : (
          ""
        )}
        {fadeStore ? (
          <CFade timeout={timeout} in={fadeStore}>
            <CRow>
              <CCol xs="12" lg="12">
                <CCard>
                  <CCardHeader>
                    <CRow>
                      <CCol
                        col="6"
                        sm="4"
                        md="4"
                        xl="xl"
                        className="mb-3 mb-xl-0"
                      >
                        <CButton color="success" onClick={addNewStore}>
                          ADD STORE
                        </CButton>
                      </CCol>
                    </CRow>
                    {/*  <div className="card-header-actions">
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
                      </CLink>}
                    </div>*/}
                  </CCardHeader>
                  <CCollapse show={collapse[0]}>
                    <CCardBody>
                      <StoreDatatable stores={store.stores_list} />
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
export default Stores;
