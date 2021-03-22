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
} from "@coreui/react";
import { unmount_filter } from "../../../actions/dashboard/filterComponentActions";
import {
  get_receipt_summary,
  delete_receipt_summary,
} from "../../../actions/reports/salesReceiptActions";
import { useSelector, useDispatch } from "react-redux";
import SalesReceiptDatatable from "../../../datatables/reports/SalesReceiptDatatable";
import ConformationAlert from "../../../components/conformationAlert/ConformationAlert";
import ReportsFilters from "../../../components/reportFilters/ReportsFilters";

const SalesReceipts = () => {
  const dispatch = useDispatch();
  const sale_receipt_summary = useSelector((state) => state.reports.salesReceiptReducer.sale_receipt_summary)

  const user = useSelector((state) => state.auth.user);
  const [filterReset, setFilterReset] = useState(false);
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

  // Sales by Day full month


  useEffect(() => {
    return () => {
      setLoading(false);
      dispatch(unmount_filter());
    };
  }, []);


  const deleteSalesReceipt = () => {
    console.log("Delete");
    setShowAlert(!showAlert);
  };

  return (
    <>
      <ReportsFilters
        daysFilter={daysFilter}
        resetFilter={filterReset}
        filter={false}
        get_filter_record={get_receipt_summary}
      />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="4" md="4" lg="4" style={{ textAlign: "center" }}>
              <h6>All Receipts</h6>
              <h2>{sale_receipt_summary !== undefined && sale_receipt_summary !== null ? sale_receipt_summary.totalReceipts !== undefined && sale_receipt_summary.totalReceipts !== null ? sale_receipt_summary.totalReceipts : 0 : 0}</h2>
            </CCol>
            <CCol sm="4" md="4" lg="4" style={{ textAlign: "center" }}>
              <h6>Sales</h6>
              <h2>{sale_receipt_summary !== undefined && sale_receipt_summary !== null ? sale_receipt_summary.totalSales !== undefined && sale_receipt_summary.totalSales !== null ? sale_receipt_summary.totalSales : 0 : 0}</h2>
            </CCol>
            <CCol sm="4" md="4" lg="4" style={{ textAlign: "center" }}>
              <h6>Refunds</h6>
              <h2>{sale_receipt_summary !== undefined && sale_receipt_summary !== null ? sale_receipt_summary.totalRefunds !== undefined && sale_receipt_summary.totalRefunds !== null ? sale_receipt_summary.totalRefunds : 0 : 0}</h2>
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
                  <CButton
                    color="success"
                    className="btn-square"
                    variant="outline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="c-icon c-icon-sm"
                      role="img"
                      style={{
                        width: "1rem",
                        height: "1rem",
                        fontSize: "1rem",
                      }}
                    >
                      <polygon
                        fill="var(--ci-primary-color, currentColor)"
                        points="440 240 272 240 272 72 240 72 240 240 72 240 72 272 240 272 240 440 272 440 272 272 440 272 440 240"
                        className="ci-primary"
                      ></polygon>
                    </svg>
                    Export
                  </CButton>
                  {user._id === user.owner_id ? (
                    <React.Fragment>
                      <ConformationAlert
                        button_text="Delete"
                        heading="Delete Sales"
                        section={`Are you sure you want to delete the Sales Summary?`}
                        buttonAction={deleteSalesReceipt}
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
              <SalesReceiptDatatable sale_receipt_sumary={sale_receipt_summary !== undefined && sale_receipt_summary !== null ? (sale_receipt_summary.receipts || []) : []} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default SalesReceipts;
