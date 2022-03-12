import React, { useState, useEffect } from "react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CRow,
} from "@coreui/react";
import MainChartExample from "../charts/MainChartExample.js";
import { useSelector } from "react-redux";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import DashboardFilter from "./DashboardFilter";
import SalesCards from "./SalesCards";
import SalesSummaryDatatableNew from "../../../datatables/sales/SalesSummaryDatatableNew";
import dateformat from "dateformat";
import { CSVLink } from "react-csv";
import { amountFormat } from "../../../utils/helpers";
// const DashboardCard = lazy(() => import("./DashboardCard.jsx"));
const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("danger") || "#f86c6b";
const brandWarning = getStyle("warning") || "#e1a82d";
const brandPrimary = getStyle("primary") || "#4638c2";
const brandSecondary = getStyle("secondary") || "#8a93a2";

const Dashboard = (props) => {
  // States
  const decimal = useSelector((state) => state.auth.user.decimal);
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
  const [salesFilter, setSalesFilter] = useState("All sales");
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
      label: "Net sales",
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
      label: "Net sales",
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
  // const store = useSelector((state) => state.settingReducers.storeReducer);
  // const employee = useSelector(
  //   (state) => state.employeeReducers.employeeListReducer
  // );
  const salesSummary = useSelector(
    (state) => state.reports.salesSummaryReducer
  );
  // End Reducer Functions
  // UseEffects Functions
  // useEffect(() => {
  //   dispatch(get_sales_summary());
  // }, []);

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
          } else if (sale.label == "Net sales") {
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
        setSalesFilter("Gross sales");
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
      if (salesFilter == "All sales") {
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

  const grossSales =
    salesSummary.sales_graph_data !== undefined &&
    salesSummary.sales_graph_data !== null
      ? salesSummary.sales_graph_data.SalesTotal !== undefined &&
        salesSummary.sales_graph_data.SalesTotal !== null
        ? salesSummary.sales_graph_data.SalesTotal.GrossSales !== undefined &&
          salesSummary.sales_graph_data.SalesTotal.GrossSales !== null
          ? parseFloat(salesSummary.sales_graph_data.SalesTotal.GrossSales, 2)
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
          ? parseFloat(salesSummary.sales_graph_data.SalesTotal.Refunds, 2)
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
          ? parseFloat(salesSummary.sales_graph_data.SalesTotal.discounts, 2)
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
          ? parseFloat(salesSummary.sales_graph_data.SalesTotal.NetSales, 2)
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
          ? parseFloat(salesSummary.sales_graph_data.SalesTotal.CostOfGoods, 2)
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
          ? parseFloat(salesSummary.sales_graph_data.SalesTotal.GrossProfit, 2)
          : 0
        : 0
      : 0;

  return (
    <>
      <CRow>
        <CCol sm="12">
          <DashboardFilter
            daysFilter={daysFilter}
            setDaysFilter={setDaysFilter}
            filter={filter}
            setFilter={setFilter}
            resetFilter={filterReset}
            handleOnChangeSales={handleOnChangeSales}
          />
        </CCol>
      </CRow>
      <CCard>
        <CCardBody className="card-body">
          <CRow className="text-center table-row">
            <SalesCards
              title="Gross sales"
              value={grossSales}
              salesFilter={salesFilter}
              color="success"
              handleOnChangeSales={() => handleOnChangeSales("Gross sales")}
            />
            <SalesCards
              title="Refunds"
              value={refunds}
              salesFilter={salesFilter}
              color="danger"
              handleOnChangeSales={() => handleOnChangeSales("Refunds")}
            />
            <SalesCards
              title="Discounts"
              value={discounts}
              salesFilter={salesFilter}
              color="warning"
              handleOnChangeSales={() => handleOnChangeSales("Discounts")}
            />
            <SalesCards
              title="Net sales"
              value={netSales}
              salesFilter={salesFilter}
              color="info"
              handleOnChangeSales={() => handleOnChangeSales("Net sales")}
            />
            <SalesCards
              title="Gross profit"
              value={grossProfit}
              salesFilter={salesFilter}
              color="primary"
              handleOnChangeSales={() => handleOnChangeSales("Gross profit")}
            />
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="12" className="d-none d-md-block float-right">
              <h5 className="ml-4">{salesFilter}</h5>
              <CButtonGroup className="float-right mr-3">
                {daysFilter.map((value, index) => (
                  <CButton
                    color="outline-secondary"
                    key={index}
                    className="mx-0"
                    onClick={() => changeFilter(value.name)}
                    active={value.name === filter}
                    style={{
                      cursor: value.disable ? "not-allowed" : "pointer",
                    }}
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
      </CCard>
      <CCard>
        <CCardHeader>
          <CRow>
            {typeof salesSummary?.sales_graph_data?.summary !== "undefined" &&
            salesSummary?.sales_graph_data?.summary?.length > 0 ? (
              <CCol xs="12" sm="6" md="6" xl="xl" className="mb-3 mb-xl-0">
                <CSVLink
                  data={
                    salesSummary?.sales_graph_data?.summary?.length > 0
                      ? salesSummary?.sales_graph_data?.summary?.map((itm) => {
                          return {
                            ["Time"]: itm.Date,
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
                            ["Cost of Goods"]: amountFormat(
                              itm?.CostOfGoods,
                              parseInt(decimal)
                            ),
                            ["Gross profit"]: amountFormat(
                              itm?.GrossProfit,
                              parseInt(decimal)
                            ),
                            ["Margin"]:
                              parseFloat(itm?.Margin, parseInt(decimal)) + "%",
                            ["Taxes"]: amountFormat(
                              itm?.Tax,
                              parseInt(decimal)
                            ),
                          };
                        })
                      : []
                  }
                  filename={"SalesSummary" + dateformat(new Date()) + ".csv"}
                  target="_blank"
                >
                  <CButton color="secondary" className="btn-square">
                    EXPORT
                  </CButton>
                </CSVLink>
              </CCol>
            ) : (
              ""
            )}
          </CRow>
        </CCardHeader>
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
