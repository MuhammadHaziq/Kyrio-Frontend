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
import TaxesDatatable from "../../../datatables/settings/taxes/TaxesDatatable";
import { CIcon } from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";
import AddTax from "../../../components/settings/taxes/AddTax";
import {
  delete_item_taxes,
  get_store_item_taxes,
} from "../../../actions/settings/taxesActions";
const Taxes = () => {
  const [collapse, setCollapse] = useState([true, true]);
  const [checked, setChecked] = useState([true, true]);
  const [fadeTaxes, setFadeTaxes] = useState(true);
  const [fadeAddTaxes, setFadeAddTaxes] = useState(false);
  const [timeout, setTimeout] = useState(300);
  const [selectedStoreId, setSelectedStoreId] = useState("");
  const dispatch = useDispatch();
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const taxes = useSelector((state) => state.settingReducers.taxesReducer);
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
    const data = {
      storeId: e.target.value,
    };
    dispatch(get_store_item_taxes(data));
  };
  const deleteTaxes = () => {
    const deleteIds = taxes.item_taxes
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    dispatch(delete_item_taxes(JSON.stringify(deleteIds)));
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
                    <CRow>
                      <CCol sm="4" md="6" xl="xl" className="mb-3 mb-xl-0">
                        <CButton
                          variant="outline"
                          color="success"
                          className="btn-square pull-right"
                          onClick={addNewTax}
                        >
                          ADD TAXES
                        </CButton>
                        {taxes.item_taxes.filter(
                          (item) => item.isDeleted === true
                        ).length > 0 ? (
                          <CButton
                            variant="outline"
                            color="danger"
                            className="btn-square pull-right ml-2"
                            onClick={deleteTaxes}
                          >
                            DELETE
                          </CButton>
                        ) : (
                          ""
                        )}
                      </CCol>

                      <CCol sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                        <CFormGroup className="btn-square pull-right">
                          <CSelect
                            custom
                            size="md"
                            name="selectedStoreId"
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
                      </CLink>
                    </div> */}
                  </CCardHeader>
                  <CCollapse show={collapse[0]}>
                    <CCardBody></CCardBody>
                    <TaxesDatatable taxes={taxes.item_taxes} />
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
export default Taxes;
