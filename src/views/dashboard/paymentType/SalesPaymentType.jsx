import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from "@coreui/react";
import ReportsFilters from "../../../components/reportFilters/ReportsFilters";
import { unmount_filter } from "../../../actions/dashboard/filterComponentActions";
import {
  get_sales_payment_type_summary
} from "../../../actions/reports/salesPaymentTypeActions";
import { useSelector, useDispatch } from "react-redux";
import SalesPaymentTypeDatatableNew from "../../../datatables/reports/SalesPaymentTypeDatatableNew";
import dateformat from "dateformat";
import { CSVLink } from "react-csv";
import { amountFormat } from "../../../utils/helpers";

const SalesPaymentType = () => {
  const dispatch = useDispatch();
  const paymentType_sales_summary = useSelector((state) => state.reports.salesPaymentTypeReducer.paymentType_sales_summary);
  const decimal = useSelector((state) => state.auth.user.decimal);

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [filterReset, setFilterReset] = useState(false);
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
      {/* <FilterComponent handleOnChangeSales={() => console.log("No Function")} /> */}
      <ReportsFilters
        daysFilter={daysFilter}
        resetFilter={filterReset}
        filter={false}
        get_filter_record={get_sales_payment_type_summary}
      />
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs="12" sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                {typeof paymentType_sales_summary !== "undefined" && paymentType_sales_summary.length > 0 ?
                  <CSVLink data={paymentType_sales_summary.length > 0 ? paymentType_sales_summary.map(itm => {
                      return {
                        ["Payment type"]: itm.PaymentType,
                        ["Payment transactions"]: itm.ItemsSold,
                        ["Payment amount"]: amountFormat(itm?.GrossSales, parseInt(decimal)),
                        ["Refund transactions"]: itm.ItemsRefunded,
                        ["Refund amount"]: amountFormat(itm?.Refunds, parseInt(decimal)),
                        ["Net amount"]: amountFormat(itm?.NetSales, parseInt(decimal))
                      }
                    }) : []}
                    filename={"SalesByItem"+dateformat(new Date)+".csv"}
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
              <SalesPaymentTypeDatatableNew sales_by_paymentType_detail={paymentType_sales_summary} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default SalesPaymentType;
