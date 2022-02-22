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
import { get_sales_employee_summary } from "../../../actions/reports/salesEmployeeActions";
import { useSelector, useDispatch } from "react-redux";
import SalesEmployeeDatatable from "../../../datatables/reports/SalesEmployeeDatatable";
import ReportsFilters from "../../../components/reportFilters/ReportsFilters";
import dateformat from "dateformat";
import { CSVLink } from "react-csv";
import { amountFormat } from "../../../utils/helpers";

const SalesEmployee = () => {
  const dispatch = useDispatch();
  const employee_sales_summary = useSelector(
    (state) => state.reports.salesEmployeeReducer.employee_sales_summary
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
        get_filter_record={get_sales_employee_summary}
      />
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs="12" sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                  {typeof employee_sales_summary !== "undefined" &&
                  employee_sales_summary.length > 0 ? (
                    <CSVLink
                      data={
                        employee_sales_summary.length > 0
                          ? employee_sales_summary.map((itm) => {
                              return {
                                ["Employee name"]: itm.Name,
                                ["Gross sales"]: amountFormat(
                                  itm?.GrossSales,
                                  parseInt(decimal)
                                ),
                                ["Refunds"]: amountFormat(
                                  itm?.Refunds,
                                  parseInt(decimal)
                                ),
                                ["Discounts"]: amountFormat(
                                  itm?.discounts,
                                  parseInt(decimal)
                                ),
                                ["Net sales"]: amountFormat(
                                  itm?.NetSales,
                                  parseInt(decimal)
                                ),
                                ["Receipts"]: itm?.Receipts,
                                ["AverageSale"]: amountFormat(
                                  itm?.AverageSale,
                                  parseInt(decimal)
                                ),
                                ["Tips"]: "",
                                ["Customer signed up"]: "",
                              };
                            })
                          : []
                      }
                      filename={
                        "SalesByEmployee" + dateformat(new Date()) + ".csv"
                      }
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
              <SalesEmployeeDatatable
                sales_by_employee_detail={employee_sales_summary}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default SalesEmployee;
