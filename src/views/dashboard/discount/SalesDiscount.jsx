import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import ReportsFilters from "../../../components/reportFilters/ReportsFilters";
import {
  get_discount_summary
} from "../../../actions/reports/salesDiscountActions";
import { unmount_filter } from "../../../actions/dashboard/filterComponentActions";
import { useSelector, useDispatch } from "react-redux";
import SalesDiscountDatatableNew from "../../../datatables/reports/SalesDiscountDatatableNew";
import dateformat from "dateformat";
import { CSVLink } from "react-csv";

const SalesDiscount = () => {
  const dispatch = useDispatch();

  const sale_discount_summary = useSelector((state) => state.reports.salesDiscountReducer.sale_discount_summary)

  const [loading, setLoading] = useState(false);
  const [filterReset, setFilterReset] = useState(false);
  const [exportData, setExportData] = useState([])
  const [daysFilter, setDaysFilter] = useState([
    { days: 0, name: "Hours", disable: false, active: true },
    { days: 1, name: "Days", disable: true, active: false },
    { days: 6, name: "Weeks", disable: true, active: false },
    { days: 28, name: "Months", disable: true, active: false },
    { days: 120, name: "Quaters", disable: true, active: false },
    { days: 365, name: "Years", disable: true, active: false },
  ]);

  useEffect(() => {
    return () => {
      setLoading(false);
      dispatch(unmount_filter());
    };
  }, []);

  return (
    <>
    <ReportsFilters
        daysFilter={daysFilter}
        resetFilter={filterReset}
        filter={false}
        get_filter_record={get_discount_summary}
      />
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs="12" sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                {typeof sale_discount_summary !== "undefined" && sale_discount_summary.length > 0 ?
                <CSVLink data={sale_discount_summary.map(dis => {
                  return {
                    ["Name"]: dis.title,
                    ["Discounts applied"]: dis.applied,
                    ["Amount discounted"]: dis.total
                  }
                })}
                  filename={"SalesByDiscounts"+dateformat(new Date)+".csv"}
                  target="_blank"
                  >
                    <CButton
                      color="secondary"
                      className="btn-square"
                    >
                      EXPORT
                    </CButton>
                  </CSVLink>
                  : ""}
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <SalesDiscountDatatableNew sale_discount_summary={sale_discount_summary} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default SalesDiscount;
