import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import { unmount_filter } from "../../../actions/dashboard/filterComponentActions";
import { get_shift_summary } from "../../../actions/reports/salesShiftActions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import SalesShiftDatatable from "../../../datatables/reports/SalesShiftDatatable";
import ReportsFilters from "../../../components/reportFilters/ReportsFilters";
import CancelReceipt from "./ShiftDetail";
import dateformat from "dateformat";
import { CSVLink } from "react-csv";

const SalesReceipts = () => {
  const dispatch = useDispatch();
  const sale_shift_summary = useSelector(
    (state) => state.reports.salesShiftReducer.sale_shift_summary
  );

  const [filterReset, setFilterReset] = useState(false);
  const [loading, setLoading] = useState(false);
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

  return (
    <>
      <ReportsFilters
        daysFilter={daysFilter}
        resetFilter={filterReset}
        filter={false}
        get_filter_record={get_shift_summary}
      />
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs="12" sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                  {typeof sale_shift_summary !== "undefined" &&
                  sale_shift_summary?.shifts?.length > 0 ? (
                    <CSVLink
                      data={[]}
                      filename={"ShiftReport" + dateformat(new Date()) + ".csv"}
                      target="_blank"
                    >
                      <CButton color="secondary" className="btn-square">
                        EXPORT
                      </CButton>
                    </CSVLink>
                  ) : (
                    ""
                  )}
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <SalesShiftDatatable
                sale_receipt_sumary={sale_shift_summary?.shifts}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CancelReceipt />
    </>
  );
};

export default SalesReceipts;
