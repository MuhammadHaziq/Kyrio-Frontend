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
import UpdateTax from "../../../components/settings/taxes/UpdateTax";
import {
  delete_item_taxes,
  get_store_item_taxes,
  redirect_back_taxes,
  get_item_taxes,
  get_tax_dining_options,
  get_catgeory_item,
} from "../../../actions/settings/taxesActions";

const Taxes = () => {
  const [collapse, setCollapse] = useState([true, true]);
  const [fadeTaxes, setFadeTaxes] = useState(true);
  const [fadeAddTaxes, setFadeAddTaxes] = useState(false);
  const [fadeUpdateTaxes, setFadeUpdateTaxes] = useState(false);
  const [timeout] = useState(300);
  const [selectedStoreId, setSelectedStoreId] = useState("");
  const dispatch = useDispatch();
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const taxes = useSelector((state) => state.settingReducers.taxesReducer);
  const diningOptions = useSelector(
    (state) => state.settingReducers.diningOptionReducer
  );
  useEffect(() => {
    dispatch(get_item_taxes());
  }, [dispatch]);

  useEffect(() => {
    const storeIds = store.stores_list.map((item) => item._id);

    if (storeIds.length > 0) {
      const data = {
        storeId: JSON.stringify(storeIds),
      };
      console.log(data);
      dispatch(get_tax_dining_options(data));
      dispatch(get_catgeory_item(data));
    }
  }, [dispatch, store.stores_list]);

  // useEffect(() => {
  //   const storeIds = store.stores_list.map((item) => item._id);
  //
  //   if (
  //     (taxes.tax_dining_list === undefined ||
  //       taxes.tax_dining_list.length === 0) &&
  //     storeIds.length > 0
  //   ) {
  //     const data = {
  //       storeId: JSON.stringify(storeIds),
  //     };
  //     console.log(data);
  //     dispatch(get_tax_dining_options(data));
  //   }
  // }, [dispatch, taxes.tax_dining_list]);
  useEffect(() => {
    if (taxes.update_redirect !== undefined && taxes.update_redirect === true) {
      setFadeTaxes(false);
      setFadeAddTaxes(false);
      setFadeUpdateTaxes(true);
    }
  }, [taxes.update_redirect]);

  const addNewTax = () => {
    dispatch(redirect_back_taxes(false));
    setFadeTaxes(false);
    setFadeAddTaxes(true);
    setFadeUpdateTaxes(false);
  };
  const goBack = () => {
    dispatch(redirect_back_taxes(true));
    setFadeTaxes(true);
    setFadeAddTaxes(false);
    setFadeUpdateTaxes(false);
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
        {fadeUpdateTaxes ? (
          <CFade timeout={timeout} in={fadeUpdateTaxes}>
            <UpdateTax goBack={goBack} />
          </CFade>
        ) : (
          ""
        )}
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
                          className="btn-square pull right"
                          color="success"
                          onClick={addNewTax}
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
                          ADD TAX
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
                            <CIcon name="cil-trash" />
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
                            <option value="0">All Stores</option>
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
                    <CCardBody>
                      <TaxesDatatable taxes={taxes.item_taxes} />
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
export default Taxes;
