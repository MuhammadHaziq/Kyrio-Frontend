import React, { useState, useEffect } from "react";
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
  CSelect,
} from "@coreui/react";
import TaxesDatatable from "../../../datatables/settings/taxes/TaxesDatatable";
import { CIcon } from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";
import AddTax from "../../../components/settings/taxes/AddTax";
const Taxes = () => {
  const [collapse, setCollapse] = useState([true, true]);
  const [checked, setChecked] = useState([true, true]);
  const [fadeTaxes, setFadeTaxes] = useState(true);
  const [fadeAddTaxes, setFadeAddTaxes] = useState(false);
  const [timeout, setTimeout] = useState(300);
  const [selectedStoreId, setSelectedStoreId] = useState("");
  const dispatch = useDispatch();
  const store = useSelector((state) => state.settingReducers.storeReducer);

  const addNewTax = () => {
    setFadeTaxes(false);
    setFadeAddTaxes(true);
  };
  const goBack = () => {
    setFadeTaxes(true);
    setFadeAddTaxes(false);
  };
  const toggleCollapse = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };
  const storeHandleChange = (e) => {
    setSelectedStoreId(e.target.value);
  };
  return (
    <React.Fragment>
      <div className="animated fadeIn">
        {fadeAddTaxes ? (
          <CFade timeout={timeout} in={fadeAddTaxes}>
            <AddTax goBack={goBack} />
          </CFade>
        ) : (
          ""
        )}
        {fadeTaxes ? (
          <CFade timeout={timeout} in={fadeTaxes}>
            <CRow>
              <CCol xs="12" lg="12">
                <CCard>
                  <CCardHeader>
                    Add New Tax
                    <div className="card-header-actions">
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
                    </div>
                  </CCardHeader>
                  <CCollapse show={collapse[0]}>
                    <CCardBody>
                      <CRow>
                        <CCol
                          col="6"
                          sm="4"
                          md="3"
                          xl="xl"
                          className="mb-3 mb-xl-0"
                        >
                          <CButton
                            block="block"
                            variant="outline"
                            color="primary"
                            className='float-left'
                            onClick={addNewTax}
                          >
                            ADD TAXES
                          </CButton>
                        </CCol>
                        <CCol
                          col="6"
                          sm="8"
                          md="9"
                          xl="xl"
                          className="mb-3 mb-xl-0"
                        >
                          <CFormGroup className='float-right'>
                            <CSelect
                              custom
                              size="md"
                              name="selectedStoreId"
                              id="selectStore"
                              value={selectedStoreId}
                              onChange={storeHandleChange}
                            >
                              <option value="0">Select Store</option>
                              {store.stores_list.map((item) => {
                                return (
                                  <option value={item._id}>{item.title}</option>
                                );
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
              <CCol sm="12">
                <TaxesDatatable taxes={[]} />
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
export default Taxes;
