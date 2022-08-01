import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import dateformat from "dateformat";
import { CSVLink } from "react-csv";
import { unmount_filter } from "../../../actions/dashboard/filterComponentActions";
import {
  get_shift_summary,
  toggle_loading,
} from "../../../actions/reports/salesShiftActions";
import SalesShiftDatatable from "../../../datatables/reports/SalesShiftDatatable";
import ReportsFilters from "../../../components/reportFilters/ReportsFilters";
import { amountFormat } from "../../../utils/helpers";
import ShiftDetail from "./ShiftDetail";

const SalesReceipts = () => {
  const dispatch = useDispatch();
  const sale_shift_summary = useSelector(
    (state) => state.reports.salesShiftReducer.sale_shift_summary
  );
  const sales_shift_data = useSelector(
    (state) => state.reports.salesShiftReducer.sales_shift_data
  );
  const loadingFilter = useSelector(
    (state) => state.reports.salesShiftReducer.loading
  );
  const decimal = useSelector((state) => state.auth.user.decimal);

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
        hideFilter={true}
        get_filter_record={get_shift_summary}
        toggle_loading={toggle_loading}
        loading={loadingFilter}
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
                      data={
                        sale_shift_summary?.shifts?.length > 0
                          ? sale_shift_summary?.shifts?.map((item) => {
                              // 2/27/2022 14:49
                              return {
                                ["POS"]: item?.pos_device?.title,
                                ["Shift opening time"]: dateformat(
                                  item?.opened_at,
                                  "mm/dd/yyyy hh:mm"
                                ),
                                ["Shfit opened"]:
                                  item?.opened_by_employee?.name,
                                ["Shift closing time"]: dateformat(
                                  item?.closed_at,
                                  "mm/dd/yyyy hh:mm"
                                ),
                                ["Shift closed"]:
                                  item?.closed_by_employee?.name,
                                ["Starting cash"]: amountFormat(
                                  item?.starting_cash,
                                  parseInt(decimal)
                                ),
                                ["Cash payments"]: amountFormat(
                                  item?.cash_payments,
                                  parseInt(decimal)
                                ),
                                ["Cash refunds"]: amountFormat(
                                  item?.cash_refunds,
                                  parseInt(decimal)
                                ),
                                ["Paid in"]: amountFormat(
                                  item?.paid_in,
                                  parseInt(decimal)
                                ),
                                ["Paid out"]: amountFormat(
                                  item?.paid_out,
                                  parseInt(decimal)
                                ),
                                ["Expected cash amount"]: amountFormat(
                                  item?.expected_cash,
                                  parseInt(decimal)
                                ),
                                ["Actual cash amount"]: amountFormat(
                                  item?.actual_cash,
                                  parseInt(decimal)
                                ),
                                ["Difference"]: amountFormat(
                                  item?.expected_cash - item?.actual_cash,
                                  parseInt(decimal)
                                ),
                              };
                            })
                          : []
                      }
                      filename={"shifts-" + dateformat(new Date()) + ".csv"}
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
      {Object.keys(sales_shift_data).length > 0 ? <ShiftDetail /> : ""}
    </>
  );
};

export default SalesReceipts;
