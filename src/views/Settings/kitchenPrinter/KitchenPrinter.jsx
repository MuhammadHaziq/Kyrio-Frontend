import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFade,
} from "@coreui/react";
import KitchenPrinterDatatable from "../../../datatables/settings/kitchenPrinter/KitchenPrinterDatatable";
import { useSelector, useDispatch } from "react-redux";
import AddKitchenPrinter from "../../../components/settings/kitchenPrinter/AddKitchenPrinter";
import UpdateKitchenPrinter from "../../../components/settings/kitchenPrinter/UpdateKitchenPrinter";
import ConformationAlert from "../../../components/conformationAlert/ConformationAlert";
import {
  delete_kitchen_printer,
  redirect_back_kitchen,
  get_kitchen_printers,
} from "../../../actions/settings/kitchenPrinterActions";
import { get_category_list } from "../../../actions/items/categoryActions";

import { CIcon } from "@coreui/icons-react";

const KitchenPrinter = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [fadeKitchenPrinter, setFadeKitchenPrinter] = useState(true);
  const [fadeAddKitchenPrinter, setFadeAddKitchenPrinter] = useState(false);
  const [fadeUpdateKitchenPrinter, setFadeUpdateKitchenPrinter] = useState(
    false
  );
  const [timeout] = useState(300);
  const dispatch = useDispatch();
  const kitchenPrinter = useSelector(
    (state) => state.settingReducers.kitchenPrinterReducer
  );
  const update_row = useSelector(
    (state) => state.settingReducers.kitchenPrinterReducer.update_row
  );
  const category = useSelector((state) => state.items.categoryReducer);
  useEffect(() => {
    dispatch(get_kitchen_printers());
    dispatch(get_category_list());
  }, [dispatch]);

  useEffect(() => {
    if (
      kitchenPrinter.update_redirect !== undefined &&
      kitchenPrinter.update_redirect === true
    ) {
      setFadeKitchenPrinter(false);
      setFadeAddKitchenPrinter(false);
      setFadeUpdateKitchenPrinter(true);
    }
  }, [kitchenPrinter.update_redirect]);

  const addNewKitchenPrinter = () => {
    dispatch(redirect_back_kitchen(false));
    setFadeKitchenPrinter(false);
    setFadeAddKitchenPrinter(true);
    setFadeUpdateKitchenPrinter(false);
  };
  const goBack = () => {
    dispatch(redirect_back_kitchen(true));
    setFadeUpdateKitchenPrinter(false);
    setFadeKitchenPrinter(true);
    setFadeAddKitchenPrinter(false);
  };
  const delete_printer = () => {
    const deleteIds = kitchenPrinter.kitchen_printers
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    dispatch(delete_kitchen_printer(JSON.stringify(deleteIds)));
    setShowAlert(!showAlert);
  };

  const hideAlert = () => {
    setShowAlert(!showAlert);
  };

  return (
    <React.Fragment>
      <div className="animated fadeIn">
        {fadeUpdateKitchenPrinter ? (
          <CFade timeout={timeout} in={fadeUpdateKitchenPrinter}>
            <UpdateKitchenPrinter
              goBack={goBack}
              update_data={update_row}
              category={category.category_list}
            />
          </CFade>
        ) : (
          ""
        )}
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
                      <CCol sm="8" md="8" xl="xl" className="mb-3 mb-xl-0">
                        <CButton color="success" onClick={addNewKitchenPrinter}>
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
                          ADD PRINTER GROUP
                        </CButton>
                        {kitchenPrinter.kitchen_printers.filter(
                          (item) => item.isDeleted === true
                        ).length > 0 ? (
                          <ConformationAlert
                            button_text="Delete"
                            heading="Delete Printer Group"
                            section={`Are you sure you want to delete printer group (${kitchenPrinter.kitchen_printers
                              .filter((item) => item.isDeleted === true)
                              .map((item) => item.name)
                              .join(",")})`}
                            buttonAction={delete_printer}
                            show_alert={showAlert}
                            hideAlert={setShowAlert}
                            variant="outline"
                            color="danger"
                            className="btn-square pull-right ml-2"
                            block={false}
                          />
                        ) : (
                          ""
                        )}
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <KitchenPrinterDatatable
                      kitchen_printer_list={kitchenPrinter.kitchen_printers}
                    />
                  </CCardBody>
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
