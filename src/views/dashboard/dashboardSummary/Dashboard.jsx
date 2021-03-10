import React, { lazy, useState, useEffect } from "react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import MainChartExample from "../charts/MainChartExample.js";
import { useSelector, useDispatch } from "react-redux";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import DashboardFilter from "./DashboardFilter";
import { get_sales_summary } from "../../../actions/dashboard/salesSummaryActions";
import SalesSummaryDatatableNew from "../../../datatables/sales/SalesSummaryDatatableNew";

const DashboardCard = lazy(() => import("./DashboardCard.jsx"));
const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("danger") || "#f86c6b";
const brandWarning = getStyle("warning") || "#e1a82d";
const brandPrimary = getStyle("primary") || "#4638c2";
const brandSecondary = getStyle("secondary") || "#8a93a2";

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
  const [filterReset, setFilterReset] = useState(false);
  const [orginalSale, setOrginalSale] = useState([
    {
      data: [],
      label: "Gross sales",
      backgroundColor: hexToRgba(brandSuccess, 10),
      borderColor: brandSuccess,
      pointHoverBackgroundColor: brandSuccess,
      borderWidth: 2,
    },
    {
      data: [],
      label: "Refunds",
      backgroundColor: hexToRgba(brandDanger, 10),
      borderColor: brandDanger,
      pointHoverBackgroundColor: brandDanger,
      borderWidth: 2,
    },
    {
      data: [],
      label: "Discounts",
      backgroundColor: hexToRgba(brandWarning, 10),
      borderColor: brandWarning,
      pointHoverBackgroundColor: brandWarning,
      borderWidth: 2,
    },
    {
      data: [],
      label: "Net Sales",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: brandInfo,
      borderWidth: 2,
    },
    {
      data: [],
      label: "Cost Of Goods",
      backgroundColor: hexToRgba(brandSecondary, 10),
      borderColor: brandSecondary,
      pointHoverBackgroundColor: brandSecondary,
      borderWidth: 2,
    },
    {
      data: [],
      label: "Gross profit",
      backgroundColor: hexToRgba(brandPrimary, 10),
      borderColor: brandPrimary,
      pointHoverBackgroundColor: brandPrimary,
      borderWidth: 2,
    },
  ]);
  const [sales, setSales] = useState([
    {
      data: [],
      label: "Gross sales",
      backgroundColor: hexToRgba(brandSuccess, 10),
      borderColor: brandSuccess,
      pointHoverBackgroundColor: brandSuccess,
      borderWidth: 2,
    },
    {
      data: [],
      label: "Refunds",
      backgroundColor: hexToRgba(brandDanger, 10),
      borderColor: brandDanger,
      pointHoverBackgroundColor: brandDanger,
      borderWidth: 2,
    },
    {
      data: [],
      label: "Discounts",
      backgroundColor: hexToRgba(brandWarning, 10),
      borderColor: brandWarning,
      pointHoverBackgroundColor: brandWarning,
      borderWidth: 2,
    },
    {
      data: [],
      label: "Net Sales",
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: brandInfo,
      borderWidth: 2,
    },
    {
      data: [],
      label: "Cost Of Goods",
      backgroundColor: hexToRgba(brandSecondary, 10),
      borderColor: brandSecondary,
      pointHoverBackgroundColor: brandSecondary,
      borderWidth: 2,
    },
    {
      data: [],
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

  useEffect(() => {
    if (typeof salesSummary.sales_graph_data !== "undefined") {
      if (typeof salesSummary.sales_graph_data.graphRecord !== "undefined") {
        const {
          GrossSales,
          Refunds,
          discounts,
          NetSales,
          CostOfGoods,
          GrossProfit,
        } = salesSummary.sales_graph_data.graphRecord;
        let filterSale = orginalSale.slice().map((sale) => {
          if (sale.label == "Gross sales") {
            sale.data = GrossSales;
          } else if (sale.label == "Refunds") {
            sale.data = Refunds;
          } else if (sale.label == "Discounts") {
            sale.data = discounts;
          } else if (sale.label == "Net Sales") {
            sale.data = NetSales;
          } else if (sale.label == "Cost Of Goods") {
            sale.data = CostOfGoods;
          } else if (sale.label == "Gross profit") {
            sale.data = GrossProfit;
          }
          return sale;
        });
        setOrginalSale(filterSale);
        setSales(filterSale);
      }
    }
  }, [salesSummary.sales_graph_data]);
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
      setFilterReset(false);
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
  const reset_Filter = () => {
    setFilterReset(true);
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
  const CostOfGoods =
    salesSummary.sales_graph_data !== undefined &&
    salesSummary.sales_graph_data !== null
      ? salesSummary.sales_graph_data.SalesTotal !== undefined &&
        salesSummary.sales_graph_data.SalesTotal !== null
        ? salesSummary.sales_graph_data.SalesTotal.CostOfGoods !== undefined &&
          salesSummary.sales_graph_data.SalesTotal.CostOfGoods !== null
          ? parseInt(salesSummary.sales_graph_data.SalesTotal.CostOfGoods)
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
        CostOfGoods={CostOfGoods}
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
                resetFilter={filterReset}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" className="d-none d-md-block float-right">
              <CButton
                color="primary"
                className="float-right"
                onClick={reset_Filter}
              >
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
                {refunds === "0" || refunds === 0
                  ? "0%"
                  : parseInt((refunds / grossSales) * 100) + "%"}
                )
              </strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={parseInt((refunds / grossSales) * 100)}
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
                {discounts === "0" || discounts === 0
                  ? "0%"
                  : parseInt((discounts / grossSales) * 100) + "%"}
                )
              </strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="warning"
                value={parseInt((discounts / grossSales) * 100)}
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
                  salesFilter === "Net Sales" ? "text-info" : "text-muted"
                }
              >
                Net Sales
              </div>
              <strong>
                {formatter.format(netSales)} (
                {netSales === "0" || netSales === 0
                  ? "0%"
                  : parseInt((netSales / grossSales) * 100) + "%"}
                )
              </strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={parseInt((netSales / grossSales) * 100)}
              />
            </CCol>
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0"
              onClick={() => handleOnChangeSales("Cost Of Goods")}
            >
              <div
                className={
                  salesFilter === "Cost Of Goods" ? "text-danger" : "text-muted"
                }
              >
                Cost Of Goods
              </div>
              <strong>
                {formatter.format(CostOfGoods)} (
                {CostOfGoods === "0" || CostOfGoods === 0
                  ? "0%"
                  : parseInt((CostOfGoods / grossSales) * 100) + "%"}
                )
              </strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="danger"
                value={parseInt((CostOfGoods / grossSales) * 100)}
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
                  ? "0%"
                  : parseInt((grossProfit / grossSales) * 100) + "%"}
                )
              </strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="primary"
                value={parseInt((grossProfit / grossSales) * 100)}
              />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
      <CCard>
        <CCardBody>
          <SalesSummaryDatatableNew
            {...props}
            sales_summary={salesSummary.sales_graph_data.summary || []}
          />
        </CCardBody>
      </CCard>
    </>
  );
};
export default Dashboard;
// Traffic //{" "}
