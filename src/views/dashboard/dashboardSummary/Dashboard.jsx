import React, { lazy, useState, useEffect } from "react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import MainChartExample from "../charts/MainChartExample.js";
import { useSelector, useDispatch } from "react-redux";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import moment from "moment";
import DashboardFilter from "./DashboardFilter";
import { get_sales_summary } from "../../../actions/dashboard/salesSummaryActions";

const DashboardCard = lazy(() => import("./DashboardCard.jsx"));
const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("danger") || "#f86c6b";
const brandWarning = getStyle("warning") || "#e1a82d";
const brandPrimary = getStyle("primary") || "#4638c2";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  // States
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("Hours");
  const [daysFilter, setDaysFilter] = useState([
    { days: 0, name: "Hours", disable: false, active: true },
    { days: 1, name: "Days", disable: true, active: false },
    { days: 6, name: "Weeks", disable: true, active: false },
    { days: 28, name: "Months", disable: true, active: false },
    { days: 120, name: "Quaters", disable: true, active: false },
    { days: 365, name: "Years", disable: true, active: false },
  ]);
  const [salesFilter, setSalesFilter] = useState("All Sales");
  const [orginalSale, setOrginalSale] = useState([
    {
      data: [
        1,
        2,
        3,
        4,
        5,
        62,
        21,
        142,
        43,
        1,
        123,
        123,
        123,
        14,
        213,
        3,
        421,
        123,
        124,
        123,
        123,
        412,
        2312,
        1412,
        132,
        24,
        3435,
        23,
        12433,
        123,
        53,
      ],
      label: "Gross sales",
      backgroundColor: hexToRgba(brandSuccess, 10),
      borderColor: brandSuccess,
      pointHoverBackgroundColor: brandSuccess,
      borderWidth: 2,
    },
    {
      data: [
        1,
        344,
        3,
        6757,
        5,
        62,
        21,
        142,
        43,
        1,
        123,
        123,
        23,
        14,
        4545,
        3,
        131,
        643,
        124,
        123,
        12351,
        843,
        786,
        1412,
        132,
        24,
        511,
        23,
        9867,
        123,
        42,
      ],
      label: "Refunds",
      backgroundColor: hexToRgba(brandDanger, 10),
      borderColor: brandDanger,
      pointHoverBackgroundColor: brandDanger,
      borderWidth: 2,
    },
    {
      data: [
        1,
        32,
        3141,
        57,
        55,
        6241,
        4123,
        0,
        85,
        1,
        767,
        3453,
        23,
        341,
        4545,
        453,
        2234,
        453,
        9866,
        876,
        542,
        24,
        23,
        14243,
        2435,
        3454,
        764,
        456,
        4,
        234,
        87,
      ],
      label: "Discounts",
      backgroundColor: hexToRgba(brandWarning, 10),
      borderColor: brandWarning,
      pointHoverBackgroundColor: brandWarning,
      borderWidth: 2,
    },
    {
      data: [
        1,
        344,
        3,
        67,
        5213,
        5223,
        211,
        200,
        67,
        34,
        1256,
        634,
        23,
        598,
        235,
        0,
        4223,
        3456,
        123,
        345,
        875,
        56,
        45,
        2356,
        234,
        634,
        4562,
        4563,
        0,
        653,
        234,
      ],
      label: "Net Sales",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: brandInfo,
      borderWidth: 2,
    },
    {
      data: [
        1,
        344,
        3,
        757,
        534,
        4242,
        2126,
        0,
        5844,
        56,
        12433,
        1223,
        23,
        675,
        7674,
        234,
        2368,
        2346,
        345,
        123,
        3466,
        45,
        56,
        23624,
        345,
        234,
        2432,
        4325,
        234,
        546,
        345,
      ],
      label: "Gross profit",
      backgroundColor: hexToRgba(brandPrimary, 10),
      borderColor: brandPrimary,
      pointHoverBackgroundColor: brandPrimary,
      borderWidth: 2,
    },
  ]);
  const [sales, setSales] = useState([
    {
      data: [
        1,
        2,
        3,
        4,
        5,
        62,
        21,
        142,
        43,
        1,
        123,
        123,
        123,
        14,
        213,
        3,
        421,
        123,
        124,
        123,
        123,
        412,
        2312,
        1412,
        132,
        24,
        3435,
        23,
        12433,
        123,
        53,
      ],
      label: "Gross sales",
      backgroundColor: hexToRgba(brandSuccess, 10),
      borderColor: brandSuccess,
      pointHoverBackgroundColor: brandSuccess,
      borderWidth: 2,
    },
    {
      data: [
        1,
        344,
        3,
        6757,
        5,
        62,
        21,
        142,
        43,
        1,
        123,
        123,
        23,
        14,
        4545,
        3,
        131,
        643,
        124,
        123,
        12351,
        843,
        786,
        1412,
        132,
        24,
        511,
        23,
        9867,
        123,
        42,
      ],
      label: "Refunds",
      backgroundColor: hexToRgba(brandDanger, 10),
      borderColor: brandDanger,
      pointHoverBackgroundColor: brandDanger,
      borderWidth: 2,
    },
    {
      data: [
        1,
        32,
        3141,
        57,
        55,
        6241,
        4123,
        0,
        85,
        1,
        767,
        3453,
        23,
        341,
        4545,
        453,
        2234,
        453,
        9866,
        876,
        542,
        24,
        23,
        14243,
        2435,
        3454,
        764,
        456,
        4,
        234,
        87,
      ],
      label: "Discounts",
      backgroundColor: hexToRgba(brandWarning, 10),
      borderColor: brandWarning,
      pointHoverBackgroundColor: brandWarning,
      borderWidth: 2,
    },
    {
      data: [
        1,
        344,
        3,
        67,
        5213,
        5223,
        211,
        200,
        67,
        34,
        1256,
        634,
        23,
        598,
        235,
        0,
        4223,
        3456,
        123,
        345,
        875,
        56,
        45,
        2356,
        234,
        634,
        4562,
        4563,
        0,
        653,
        234,
      ],
      label: "Net Sales",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: brandInfo,
      borderWidth: 2,
    },
    {
      data: [
        1,
        344,
        3,
        757,
        534,
        4242,
        2126,
        0,
        5844,
        56,
        12433,
        1223,
        23,
        675,
        7674,
        234,
        2368,
        2346,
        345,
        123,
        3466,
        45,
        56,
        23624,
        345,
        234,
        2432,
        4325,
        234,
        546,
        345,
      ],
      label: "Gross profit",
      backgroundColor: hexToRgba(brandPrimary, 10),
      borderColor: brandPrimary,
      pointHoverBackgroundColor: brandPrimary,
      borderWidth: 2,
    },
  ]);

  // States
  // Reducer Functions
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const employee = useSelector(
    (state) => state.employeeReducers.employeeListReducer
  );
  const salesSummary = useSelector(
    (state) => state.reports.salesSummaryReducer
  );
  // End Reducer Functions
  // UseEffects Functions
  useEffect(() => {
    dispatch(get_sales_summary());
  }, []);
  //  End UseEffects Functions
  const usePrevious = (data) => {
    const ref = React.useRef();
    useEffect(() => {
      ref.current = data;
    }, [data]);
    return ref.current;
  };
  var prevSalesFilter = usePrevious(salesFilter);

  const changeFilter = (v) => {
    setDaysFilter(
      daysFilter.slice().map((item) => {
        if (item.name === v) {
          return {
            ...item,
            active: item.active === true ? true : false,
            // !item.active,
          };
        }
        return { ...item, active: false };
      })
    );
    setFilter(v);
    setLoading(true);
  };

  useEffect(() => {
    if (prevSalesFilter !== salesFilter && prevSalesFilter !== undefined) {
      if (salesFilter == "All Sales") {
        setSales(orginalSale);
      } else {
        const sales = orginalSale.filter((item) => {
          return item.label == salesFilter;
        });
        setSales(sales);
      }
    }
  }, [prevSalesFilter, salesFilter]);

  useEffect(() => {
    if (sales) {
      setLoading(true);
    }
  }, [sales]);
  const handleOnChangeSales = (e) => {
    setSalesFilter(e.trim());
  };

  const grossSales =
    salesSummary.sales_graph_data !== undefined &&
    salesSummary.sales_graph_data !== null
      ? salesSummary.sales_graph_data.SalesTotal !== undefined &&
        salesSummary.sales_graph_data.SalesTotal !== null
        ? salesSummary.sales_graph_data.SalesTotal.GrossSales !== undefined &&
          salesSummary.sales_graph_data.SalesTotal.GrossSales !== null
          ? parseInt(salesSummary.sales_graph_data.SalesTotal.GrossSales)
          : 0
        : 0
      : 0;
  const refunds =
    salesSummary.sales_graph_data !== undefined &&
    salesSummary.sales_graph_data !== null
      ? salesSummary.sales_graph_data.SalesTotal !== undefined &&
        salesSummary.sales_graph_data.SalesTotal !== null
        ? salesSummary.sales_graph_data.SalesTotal.Refunds !== undefined &&
          salesSummary.sales_graph_data.SalesTotal.Refunds !== null
          ? parseInt(salesSummary.sales_graph_data.SalesTotal.Refunds)
          : 0
        : 0
      : 0;
  const discounts =
    salesSummary.sales_graph_data !== undefined &&
    salesSummary.sales_graph_data !== null
      ? salesSummary.sales_graph_data.SalesTotal !== undefined &&
        salesSummary.sales_graph_data.SalesTotal !== null
        ? salesSummary.sales_graph_data.SalesTotal.discounts !== undefined &&
          salesSummary.sales_graph_data.SalesTotal.discounts !== null
          ? parseInt(salesSummary.sales_graph_data.SalesTotal.discounts)
          : 0
        : 0
      : 0;
  const netSales =
    salesSummary.sales_graph_data !== undefined &&
    salesSummary.sales_graph_data !== null
      ? salesSummary.sales_graph_data.SalesTotal !== undefined &&
        salesSummary.sales_graph_data.SalesTotal !== null
        ? salesSummary.sales_graph_data.SalesTotal.NetSales !== undefined &&
          salesSummary.sales_graph_data.SalesTotal.NetSales !== null
          ? parseInt(salesSummary.sales_graph_data.SalesTotal.NetSales)
          : 0
        : 0
      : 0;
  const grossProfit =
    salesSummary.sales_graph_data !== undefined &&
    salesSummary.sales_graph_data !== null
      ? salesSummary.sales_graph_data.SalesTotal !== undefined &&
        salesSummary.sales_graph_data.SalesTotal !== null
        ? salesSummary.sales_graph_data.SalesTotal.GrossProfit !== undefined &&
          salesSummary.sales_graph_data.SalesTotal.GrossProfit !== null
          ? parseInt(salesSummary.sales_graph_data.SalesTotal.GrossProfit)
          : 0
        : 0
      : 0;

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <>
      <DashboardCard
        grossSales={grossSales}
        refunds={refunds}
        discounts={discounts}
        netSales={netSales}
        grossProfit={grossProfit}
        handleOnChangeSales={handleOnChangeSales}
      />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="12">
              <DashboardFilter
                daysFilter={daysFilter}
                setDaysFilter={setDaysFilter}
                filter={filter}
                setFilter={setFilter}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" className="d-none d-md-block float-right">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download" />
              </CButton>
              <CButtonGroup className="float-right mr-3">
                {daysFilter.map((value, index) => (
                  <CButton
                    color="outline-secondary"
                    key={index}
                    className="mx-0"
                    onClick={() => changeFilter(value.name)}
                    active={value.name === filter}
                    disabled={value.disable}
                  >
                    {value.name}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          {loading ? (
            <MainChartExample
              sales={sales}
              labels={salesSummary.filter_days}
              style={{ height: "300px", marginTop: "40px" }}
            />
          ) : (
            "Loading..."
          )}
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0"
              onClick={() => handleOnChangeSales("Gross sales")}
            >
              <div
                className={
                  salesFilter === "Gross sales" ? "text-success" : "text-muted"
                }
              >
                Gross Sales
              </div>
              <strong>
                {formatter.format(grossSales)} (
                {grossSales === "0" || grossSales === 0 ? 0 : grossSales / 100})
              </strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={grossSales}
              />
            </CCol>
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0 d-md-down-none"
              onClick={() => handleOnChangeSales("Refunds")}
            >
              <div
                className={
                  salesFilter === "Refunds" ? "text-info" : "text-muted"
                }
              >
                Refunds
              </div>
              <strong>
                {" "}
                {formatter.format(refunds)} (
                {refunds === "0" || refunds === 0 ? 0 : refunds / 100})
              </strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={refunds}
              />
            </CCol>
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0"
              onClick={() => handleOnChangeSales("Discounts")}
            >
              <div
                className={
                  salesFilter === "Discounts" ? "text-warning" : "text-muted"
                }
              >
                Discounts
              </div>
              <strong>
                {formatter.format(discounts)} (
                {discounts === "0" || discounts === 0 ? 0 : discounts / 100})
              </strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="warning"
                value={discounts}
              />
            </CCol>
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0"
              onClick={() => handleOnChangeSales("Net Sales")}
            >
              <div
                className={
                  salesFilter === "Net Sales" ? "text-danger" : "text-muted"
                }
              >
                Net Sales
              </div>
              <strong>
                {formatter.format(netSales)} (
                {netSales === "0" || netSales === 0 ? 0 : netSales / 100})
              </strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="danger"
                value={netSales}
              />
            </CCol>
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0 d-md-down-none"
              onClick={() => handleOnChangeSales("Gross profit")}
            >
              <div
                className={
                  salesFilter === "Gross profit" ? "text-primary" : "text-muted"
                }
              >
                Gross Profit
              </div>
              <strong>
                {" "}
                {formatter.format(grossProfit)} (
                {grossProfit === "0" || grossProfit === 0
                  ? 0
                  : grossProfit / 100}
                )
              </strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="primary"
                value={grossProfit}
              />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  );
};
export default Dashboard;
// Traffic //{" "}
