import React, { useState, useEffect } from "react";
import {
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownHeader,
  CDropdownMenu,
  CDropdownItem,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import { unmount_filter } from "../../../actions/dashboard/filterComponentActions";
import {
  get_receipt_summary,
  delete_receipt_summary,
} from "../../../actions/reports/salesReceiptActions";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment'
import SalesReceiptDatatable from "../../../datatables/reports/SalesReceiptDatatable";
import ConformationAlert from "../../../components/conformationAlert/ConformationAlert";
import ReportsFilters from "../../../components/reportFilters/ReportsFilters";
import CancelReceipt from './CancelReceipt'
import dateformat from "dateformat";
import { CSVLink, CSVDownload } from "react-csv";

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
    setShowAlert(!showAlert);
  };
  const ExportCSVReceipts = () => {
    return <CSVLink data={sale_receipt_summary.receipts.length > 0 ? sale_receipt_summary.receipts.map(item => {
      return {
        ["Date"]: moment(item.sale_timestamp).format('MM/DD/YYYY h:mm a'),
        ["Receipt number"]: item.receipt_number,
        ["Receipt type"]: item.receipt_type,
        ["Gross sales"]: parseFloat(item.sub_total).toFixed(2),
        ["Discounts"]: parseFloat(item.total_discount).toFixed(2),
        ["Net Sales"]: parseFloat(item.sub_total - item.total_discount).toFixed(2),
        ["Taxes"]: parseFloat(item.total_tax).toFixed(2),
        ["Total collected"]: parseFloat(item.total_price).toFixed(2),
        ["Cost of Goods"]: parseFloat(item.cost_of_goods).toFixed(2),
        ["Gross profit"]: parseFloat(item.total_price - item.cost_of_goods).toFixed(2),
        ["Payment type"]: item.payment_method,
        ["Discription"]: item.items.map( ite => { return " "+ite.quantity + " X " + ite.name }),
        ["Dining option"]: typeof item.dining_option !== "undefined" ? item.dining_option.name : '',
        ["POS"]: item.device.name,
        ["Cashier name"]: item.cashier.name,
        ["Customer name"]: typeof item.customer !== "undefined" && item.customer !== null ? item.customer.name : '',
        ["Customer contact"]: typeof item.customer !== "undefined" && item.customer !== null ? item.customer.email : '',
        ["Status"]: item.open ? 'Open' : 'Closed'
      }
    }) : []}
    filename={"Receipts"+dateformat(new Date)+".csv"}
    >
      <h6>Receipts</h6>
    </CSVLink>
  }
  const ExportCSVReceiptsByItem = () => {
    const csvData = []
    if(sale_receipt_summary.receipts.length > 0){
      sale_receipt_summary.receipts.map(sale => { 
        sale.items.map(item => {
          let modifiers = []
          item.modifiers.map(mod => mod.options.map(op => modifiers.push(op.option_name)))
          csvData.push({
            ["Date"]: moment(sale.sale_timestamp).format('MM/DD/YYYY h:mm a'),
            ["Receipt number"]: sale.receipt_number,
            ["Receipt type"]: sale.receipt_type,
            ["Category"]: '',
            ["SKU"]: '',
            ["Item"]: item.name,
            ["Modifiers applied"]: modifiers,
            ["Quantity"]: item.quantity,
            ["Gross sales"]: parseFloat((item.price * item.quantity)+item.total_modifiers).toFixed(2),
            ["Discounts"]: parseFloat(item.total_discount).toFixed(2),
            ["Net Sales"]: parseFloat(item.total_price - item.total_discount).toFixed(2),
            ["Taxes"]: parseFloat(item.total_tax).toFixed(2),
            ["Cost of Goods"]: parseFloat(item.quantity * item.cost).toFixed(2),
            ["Gross profit"]: parseFloat(item.total_price - (item.cost * item.quantity)).toFixed(2),
            ["Dining option"]: typeof sale.dining_option !== "undefined" ? sale.dining_option.name : '',
            ["POS"]: sale.device.name,
            ["Cashier name"]: sale.cashier.name,
            ["Customer name"]: typeof sale.customer !== "undefined" && sale.customer !== null ? sale.customer.name : '',
            ["Customer contact"]: typeof sale.customer !== "undefined" && sale.customer !== null ? sale.customer.email : '',
            ["Status"]: sale.open ? 'Open' : 'Closed'
          })
        })
      })
    }
    return <CSVLink data={csvData}
    filename={"ReceiptsByItem"+dateformat(new Date)+".csv"}
    >
     <h6>Receipts by item</h6>
    </CSVLink>
  }

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
                {typeof sale_receipt_summary.receipts !== "undefined" && sale_receipt_summary.receipts.length > 0 ?
                  <>
                  
                    <CDropdown>
                      <CDropdownToggle color="secondary">EXPORT</CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownHeader><ExportCSVReceipts /></CDropdownHeader>
                        <CDropdownHeader><ExportCSVReceiptsByItem /></CDropdownHeader>
                      </CDropdownMenu>
                    </CDropdown>
                  </>
                  : ""}
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <SalesReceiptDatatable sale_receipt_sumary={sale_receipt_summary !== undefined && sale_receipt_summary !== null ? (sale_receipt_summary.receipts || []) : []} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CancelReceipt />
    </>
  );
};

export default SalesReceipts;
