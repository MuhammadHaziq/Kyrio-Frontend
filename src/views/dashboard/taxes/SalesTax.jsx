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
import { unmount_filter } from "../../../actions/dashboard/filterComponentActions";
import {
  get_tax_sale_summary,
} from "../../../actions/reports/salesTaxesActions";
import { useSelector, useDispatch } from "react-redux";
import SalesTaxDatatableNew from "../../../datatables/reports/SalesTaxDatatableNew";
import dateformat from "dateformat";
import { CSVLink } from "react-csv";
import Amount from "../../../components/utils/Amount";

const SalesTax = () => {
  const dispatch = useDispatch();
  const taxes_sales_summary = useSelector((state) => state.reports.salesTaxesReducer.taxes_sales_summary)

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

  useEffect(() => {
    if(taxes_sales_summary?.taxes?.length > 0){
      let exortData = []
      taxes_sales_summary.taxes.map(itm => {
          exortData.push({
            ["Tax name"]: itm.title,
            ["Tax rate"]: itm.tax_rate,
            ["Taxable sales"]: itm.taxableSale,
            ["Tax amount"]: itm.taxAmount
          })
      });
      setExportData(exortData)
    }
  }, [taxes_sales_summary]);

  return (
    <>
      <ReportsFilters
        daysFilter={daysFilter}
        resetFilter={filterReset}
        filter={false}
        get_filter_record={get_tax_sale_summary}
      />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="4" md="4" lg="4" style={{ textAlign: "center" }}>
              <h6>Taxable sales</h6>
              <h2><Amount value={taxes_sales_summary.taxableSales} /></h2>
            </CCol>
            <CCol sm="4" md="4" lg="4" style={{ textAlign: "center" }}>
              <h6>Non-taxable sales</h6>
              <h2><Amount value={taxes_sales_summary.NonTaxableSales} /></h2>
            </CCol>
            <CCol sm="4" md="4" lg="4" style={{ textAlign: "center" }}>
              <h6>Total net sales</h6>
              <h2><Amount value={taxes_sales_summary.NetSales} /></h2>
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
                {typeof taxes_sales_summary.taxes !== "undefined" && taxes_sales_summary.taxes.length > 0 ?
                <CSVLink data={exportData}
                  filename={"SalesByTaxes"+dateformat(new Date)+".csv"}
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
              <SalesTaxDatatableNew taxes_sales_summary={taxes_sales_summary.taxes} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default SalesTax;
