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
} from "@coreui/react";
import KitchenPrinterDatatable from "../../../datatables/settings/kitchenPrinter/KitchenPrinterDatatable";
import { CIcon } from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";
import AddKitchenPrinter from "../../../components/settings/kitchenPrinter/AddKitchenPrinter";
const KitchenPrinter = () => {
  const [collapse, setCollapse] = useState([true, true]);
  const [checked, setChecked] = useState([true, true]);
  const [fadeKitchenPrinter, setFadeKitchenPrinter] = useState(true);
  const [fadeAddKitchenPrinter, setFadeAddKitchenPrinter] = useState(false);
  const [timeout, setTimeout] = useState(300);
  const dispatch = useDispatch();
  // const store = useSelector((state) => state.settingReducers.storeReducer);
  const category = useSelector((state) => state.items.categoryReducer);

  const addNewStore = () => {
    setFadeKitchenPrinter(false);
    setFadeAddKitchenPrinter(true);
  };
  const goBack = () => {
    setFadeKitchenPrinter(true);
    setFadeAddKitchenPrinter(false);
  };
  const toggleCollapse = (tab) => {
    const state = collapse.map((x, index) => (tab === index ? !x : x));
    setCollapse(state);
  };
  return (
    <React.Fragment>
      <div className="animated fadeIn">
        {fadeAddKitchenPrinter ? (
          <CFade timeout={timeout} in={fadeAddKitchenPrinter}>
            <AddKitchenPrinter
              goBack={goBack}
              category={category.category_list}
            />
          </CFade>
        ) : (
          ""
        )}
        {fadeKitchenPrinter ? (
          <CFade timeout={timeout} in={fadeKitchenPrinter}>
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
                  </CCardHeader>
                  <CCollapse show={collapse[0]}>
                    <CCardBody>
                      <KitchenPrinterDatatable kitchen_printer_list={[]} />
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
export default KitchenPrinter;
