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
import { useSelector, useDispatch } from "react-redux";
import AddStore from "../../../components/settings/stores/AddStore";
import UpdateStore from "../../../components/settings/stores/UpdateStore";
import {
  redirect_back_store,
  get_stores,
} from "../../../actions/settings/storeActions";
const Stores = () => {
  const [collapse, setCollapse] = useState([true, true]);
  const [fadeStore, setFadeStore] = useState(true);
  const [fadeUpdateStore, setUpdateStore] = useState(false);
  const [fadeAddStore, setFadeAddStore] = useState(false);
  const [timeout] = useState(300);
  const dispatch = useDispatch();
  const store = useSelector((state) => state.settingReducers.storeReducer);

  useEffect(() => {
    dispatch(get_stores());
  }, [dispatch]);

  useEffect(() => {
    if (store.redirect_update !== undefined && store.redirect_update === true) {
      setUpdateStore(true);
      setFadeStore(false);
      setFadeAddStore(false);
    }
  }, [store.redirect_update]);

  const addNewStore = () => {
    setFadeStore(false);
    setFadeAddStore(true);
    setUpdateStore(false);
    dispatch(redirect_back_store(false));
  };
  const goBack = () => {
    setFadeStore(true);
    setFadeAddStore(false);
    setUpdateStore(false);
    dispatch(redirect_back_store(true));
  };
  const toggleCollapse = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };
  return (
    <React.Fragment>
      <div className="animated fadeIn">
        {fadeUpdateStore ? (
          <CFade timeout={timeout} in={fadeUpdateStore}>
            <UpdateStore
              goBack={goBack}
              update_store_data={store.update_store_data}
            />
          </CFade>
        ) : (
          ""
        )}
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
