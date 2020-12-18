import React, { useState, useEffect } from "react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CContainer,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import dateformat from "dateformat";
import FilterComponent from "../FilterComponent";
import { unmount_filter } from "../../../actions/dashboard/filterComponentActions";
import {
  get_tax_sale_summary,
  delete_tax_sale,
} from "../../../actions/reports/salesTaxesActions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import SalesTaxDatatable from "../../../datatables/reports/SalesTaxDatatable";
import ConformationAlert from "../../../components/conformationAlert/ConformationAlert";

const SalesTax = () => {
  const dispatch = useDispatch();
  const filterComponent = useSelector(
    (state) => state.dashBoard.filterComponentReducer
  );

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [daysFilter, setDaysFilter] = useState([
    { days: 0, name: "Hours", disable: true },
    { days: 1, name: "Days", disable: true },
    { days: 6, name: "Weeks", disable: true },
    { days: 28, name: "Months", disable: true },
    { days: 120, name: "Quaters", disable: true },
    { days: 365, name: "Years", disable: true },
  ]);
  const usePrevious = (data) => {
    const ref = React.useRef();
    useEffect(() => {
      ref.current = data;
    }, [data]);
    return ref.current;
  };
  // Sales by Day full month
  const [sales, setSales] = useState([]);
  const [orginalSale, setOrginalSale] = useState([]);
  var prevDateRange = usePrevious(filterComponent.filterDate);
  var changeInFilter = usePrevious(filterComponent);

  const getNatural = (num) => {
    return parseFloat(num.toString().split(".")[0]);
  };

  useEffect(() => {
    return () => {
      setLoading(false);
      dispatch(unmount_filter());
    };
  }, []);

  useEffect(() => {
    if (filterComponent !== changeInFilter && changeInFilter !== undefined) {
      console.log(changeInFilter, "PrevchangeInFilter");
      console.log(filterComponent, "vchangeInFilter");
    }
  }, [filterComponent, changeInFilter]);

  const deleteSalesTax = () => {
    console.log("Delete");
    setShowAlert(!showAlert);
  };

  return (
    <>
      <FilterComponent handleOnChangeSales={() => console.log("No Function")} />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="4" md="4" lg="4" style={{ textAlign: "center" }}>
              <h6>Taxable sales</h6>
              <h2>0.00</h2>
            </CCol>
            <CCol sm="4" md="4" lg="4" style={{ textAlign: "center" }}>
              <h6>Non-taxable sales</h6>
              <h2>0.00</h2>
            </CCol>
            <CCol sm="4" md="4" lg="4" style={{ textAlign: "center" }}>
              <h6>Total net sales</h6>
              <h2>0.00</h2>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs="12" sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                  <CButton color="success" className="btn-square pull right">
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
                    Export
                  </CButton>
                  {true ? (
                    <React.Fragment>
                      <ConformationAlert
                        button_text="Delete"
                        heading="Delete Sales"
                        section={`Are you sure you want to delete the Sales Summary?`}
                        buttonAction={deleteSalesTax}
                        show_alert={showAlert}
                        hideAlert={setShowAlert}
                        variant="outline"
                        className="ml-2 btn-square"
                        color="danger"
                        block={false}
                      />
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <SalesTaxDatatable taxes_sales_summary={[]} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default SalesTax;
