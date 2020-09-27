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
import {
  delete_kitchen_printer,
  redirect_back_kitchen,
  get_kitchen_printers,
} from "../../../actions/settings/kitchenPrinterActions";
import { CIcon } from "@coreui/icons-react";

const KitchenPrinter = () => {
  const [fadeKitchenPrinter, setFadeKitchenPrinter] = useState(true);
  const [fadeAddKitchenPrinter, setFadeAddKitchenPrinter] = useState(false);
  const [timeout] = useState(300);
  const dispatch = useDispatch();
  const kitchenPrinter = useSelector(
    (state) => state.settingReducers.kitchenPrinterReducer
  );
  const category = useSelector((state) => state.items.categoryReducer);
  useEffect(() => {
    // if (
    //   kitchenPrinter.kitchen_printers === undefined ||
    //   kitchenPrinter.kitchen_printers.length === 0
    // ) {
    dispatch(get_kitchen_printers());
    // }
  }, [dispatch]);
  const addNewKitchenPrinter = () => {
    dispatch(redirect_back_kitchen(false));
    setFadeKitchenPrinter(false);
    setFadeAddKitchenPrinter(true);
  };
  const goBack = () => {
    dispatch(redirect_back_kitchen(true));

    setFadeKitchenPrinter(true);
    setFadeAddKitchenPrinter(false);
  };
  const deleteTaxes = () => {
    const deleteIds = kitchenPrinter.kitchen_printers
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    dispatch(delete_kitchen_printer(JSON.stringify(deleteIds)));
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
                      <CCol sm="8" md="8" xl="xl" className="mb-3 mb-xl-0">
                        <CButton color="success" onClick={addNewKitchenPrinter}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            class="c-icon c-icon-sm"
                            role="img"
                          >
                            <polygon
                              fill="var(--ci-primary-color, currentColor)"
                              points="440 240 272 240 272 72 240 72 240 240 72 240 72 272 240 272 240 440 272 440 272 272 440 272 440 240"
                              class="ci-primary"
                            ></polygon>
                          </svg>
                          ADD PRINTER GROUP
                        </CButton>
                        {kitchenPrinter.kitchen_printers.filter(
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
