import React, { useState, useEffect } from "react";
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import dateformat from "dateformat";
import MainChartExample from "../charts/MainChartExample.js";
import FilterComponent from "./FilterComponent";
import { unmount_filter } from "../../actions/dashboard/filterComponentActions";
import {
  get_sales_summary,
  delete_sales_summary,
  get_grap_sales_summary,
} from "../../actions/dashboard/salesSummaryActions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import SalesSummaryDatatable from "../../datatables/sales/SalesSummaryDatatable";
import ConformationAlert from "../../components/conformationAlert/ConformationAlert";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import {
  filterDatesAction,
  filterDaysAction,
} from "../../components/reportFilters/FilterFunction";

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("danger") || "#f86c6b";
const brandWarning = getStyle("warning") || "#e1a82d";
const brandPrimary = getStyle("primary") || "#4638c2";

const Dashboard = () => {
  const dispatch = useDispatch();
  const filterComponent = useSelector(
    (state) => state.dashBoard.filterComponentReducer
  );
  const salesSummary = useSelector(
    (state) => state.reports.salesSummaryReducer
  );
  const store = useSelector((state) => state.settingReducers.storeReducer);
  const employee = useSelector(
    (state) => state.employeeReducers.employeeListReducer
  );
  const [Days, setDays] = useState([]);
  const [daysDates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [filter, setFilter] = useState("");
  const [salesFilter, setSalesFilter] = useState("All Sales");
  const [daysFilter, setDaysFilter] = useState([
    { days: 0, name: "Hours", disable: true },
    { days: 1, name: "Days", disable: true },
    { days: 6, name: "Weeks", disable: true },
    { days: 28, name: "Months", disable: true },
    { days: 120, name: "Quaters", disable: true },
    { days: 365, name: "Years", disable: true },
  ]);
  const usePrevious = (data) => {
    const ref = React.useRef();
    useEffect(() => {
      ref.current = data;
    }, [data]);
    return ref.current;
  };
  // Sales by Day full month
  const [sales, setSales] = useState([]);
  const [orginalSale, setOrginalSale] = useState([]);
  var prevDateRange = usePrevious(filterComponent.filterDate);
  var changeInFilter = usePrevious(filterComponent);
  var prevDays = usePrevious(Days);
  var prevFilter = usePrevious(filter);
  var prevSalesFilter = usePrevious(salesFilter);
  var prevdaysDates = usePrevious(daysDates);

  const getNatural = (num) => {
    return parseFloat(num.toString().split(".")[0]);
  };

  const days = (from, to) => {
    const result = await filterDaysAction(from, to);
    setFilter(result.filter);
    setDays(result.days);
    setDates(result.dates);
  };

  const days_filter = (from, to, filterName) => {
    const result = await filterDatesAction(from, to, filterName);
    setFilter(result.filter);
    setDays(result.days);
    setDates(result.dates);
  };

  useEffect(() => {
    // dispatch(get_sales_summary());
    return () => {
      setDays([]);
      setLoading(false);
      setFilter("");
      dispatch(unmount_filter());
    };
  }, []);

  useEffect(() => {
    if (prevDays !== Days && prevDays !== undefined) {
      setSales([
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
          label: "Gross profit",
          backgroundColor: hexToRgba(brandPrimary, 10),
          borderColor: brandPrimary,
          pointHoverBackgroundColor: brandPrimary,
          borderWidth: 2,
        },
      ]);
      setOrginalSale([
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
          label: "Gross profit",
          backgroundColor: hexToRgba(brandPrimary, 10),
          borderColor: brandPrimary,
          pointHoverBackgroundColor: brandPrimary,
          borderWidth: 2,
        },
      ]);
    }
  }, [prevDays, Days]);

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
    if (prevFilter !== filter && prevFilter !== undefined) {
      days_filter(
        filterComponent.filterDate.startDate,
        filterComponent.filterDate.endDate,
        filter
      );
    }
    // prevFilter
  }, [filter]);

  useEffect(() => {
    if (sales) {
      setLoading(true);
    }
  }, [sales]);

  useEffect(() => {
    if (
      filterComponent.filterDate !== prevDateRange &&
      prevDateRange !== undefined
    ) {
      const timeDiff = moment
        .duration(
          moment(filterComponent.filterDate.endDate).diff(
            moment(filterComponent.filterDate.startDate)
          )
        )
        .asDays();
      setDaysFilter(
        daysFilter.map((item) => {
          if (parseInt(item.days) <= getNatural(timeDiff)) {
            return {
              ...item,
              disable:
                getNatural(timeDiff) == 0
                  ? false
                  : getNatural(timeDiff) >= 0 && parseInt(item.days) === 0
                  ? true
                  : false,
            };
          } else {
            return {
              ...item,
              disable: true,
            };
          }
        })
      );
      days(
        filterComponent.filterDate.startDate,
        filterComponent.filterDate.endDate
      );
    }
    // , prevDateRange
  }, [
    filterComponent.filterDate !== prevDateRange && prevDateRange !== undefined,
  ]);

  useEffect(() => {
    // if (filterComponent !== changeInFilter && changeInFilter !== undefined) {
    if (
      filterComponent.filterStores !== undefined &&
      filterComponent.filterStores !== "0" &&
      filterComponent.filterEmployees !== undefined &&
      filterComponent.filterEmployees !== "0"
    ) {
      // console.log(filterComponent, "vcwqwqhangeInFilter");
      const data = {
        startDate: dateformat(
          filterComponent.filterDate.startDate,
          "yyyy-mm-dd"
        ),
        endDate: dateformat(filterComponent.filterDate.endDate, "yyyy-mm-dd"),
        stores: filterComponent.filterStores,
        employees: filterComponent.filterEmployees,
        divider: filter,
        graph: Days,
        // need this formate with year to match with date filter exactly
        matches: daysDates,
      };
      dispatch(get_grap_sales_summary(data));
    }
  }, [
    filterComponent.filterStores,
    filterComponent.filterEmployees,
    filterComponent.filterTime,
  ]);

  useEffect(() => {
    if (
      prevdaysDates !== daysDates &&
      daysDates !== undefined &&
      filterComponent.filterStores !== undefined &&
      filterComponent.filterStores !== "0" &&
      filterComponent.filterEmployees !== undefined &&
      filterComponent.filterEmployees !== "0"
    ) {
      // console.log(changeInFilter, "PrevchangeInFilter");
      // console.log(filterComponent, "vchangeInFilter");
      // console.log(daysDates, "daysDates");
      const data = {
        startDate: dateformat(
          filterComponent.filterDate.startDate,
          "yyyy-mm-dd"
        ),
        endDate: dateformat(filterComponent.filterDate.endDate, "yyyy-mm-dd"),
        stores: filterComponent.filterStores,
        employees: filterComponent.filterEmployees,
        divider: filter,
        graph: Days,
        // need this formate with year to match with date filter exactly
        matches: daysDates,
      };
      dispatch(get_grap_sales_summary(data));
    }
    // daysDates
  }, [
    prevdaysDates !== daysDates &&
      daysDates !== undefined &&
      daysDates !== null,
  ]);

  const changeFilter = (v) => {
    setFilter(v);
    setLoading(true);
  };

  const handleOnChangeSales = (e) => {
    setSalesFilter(e.trim());
  };

  const deleteSalesSummary = () => {
    const sales_id = salesSummary.sales_summary
      .filter((item) => item.isDeleted === true)
      .map((item) => {
        return item._id;
      });
    // console.log(sales_id);
    dispatch(delete_sales_summary(JSON.stringify(sales_id)));
    setShowAlert(!showAlert);
  };
  // console.log("Dayss", Days);
  // console.log("Daysss", daysDates);
  const grossSales =
    salesSummary.sales_graph_data !== undefined &&
    salesSummary.sales_graph_data !== null
      ? salesSummary.sales_graph_data.SalesTotal !== undefined &&
        salesSummary.sales_graph_data.SalesTotal !== null
        ? salesSummary.sales_graph_data.SalesTotal.GrossSales !== undefined &&
          salesSummary.sales_graph_data.SalesTotal.GrossSales !== null
          ? salesSummary.sales_graph_data.SalesTotal.GrossSales
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
          ? salesSummary.sales_graph_data.SalesTotal.Refunds
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
          ? salesSummary.sales_graph_data.SalesTotal.discounts
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
          ? salesSummary.sales_graph_data.SalesTotal.NetSales
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
          ? salesSummary.sales_graph_data.SalesTotal.GrossProfit
          : 0
        : 0
      : 0;

  return (
    <>
      {/* <FilterComponent
        handleOnChangeSales={() => handleOnChangeSales("All Sales")}
      /> */}

      <CCard>
        <CCardHeader>
          <CRow className="text-center">
            {salesSummary.sales_graph_data !== undefined &&
            salesSummary.sales_graph_data !== null ? (
              salesSummary.sales_graph_data.SalesTotal !== undefined &&
              salesSummary.sales_graph_data.SalesTotal !== null ? (
                <>
                  <CCol
                    md
                    sm="12"
                    className="mb-sm-2 mb-0"
                    onClick={() => handleOnChangeSales("Gross sales")}
                  >
                    <div className="text-muted">Gross Sales</div>
                    <strong
                      style={{
                        color: salesFilter === "Gross sales" ? "#45a164" : "",
                      }}
                    >
                      +{grossSales}(
                      {grossSales === "0" || grossSales === 0
                        ? 0
                        : grossSales / 100}{" "}
                      %)
                    </strong>
                    <CProgress
                      className="progress-xs mt-2"
                      precision={1}
                      color="success"
                      value={grossSales}
                    />
                  </CCol>
                </>
              ) : (
                <>
                  <CCol
                    md
                    sm="12"
                    className="mb-sm-2 mb-0"
                    onClick={() => handleOnChangeSales("Gross sales")}
                  >
                    <div className="text-muted">Gross Sales</div>
                    <strong
                      style={{
                        color: salesFilter === "Gross sales" ? "#45a164" : "",
                      }}
                    >
                      +0 (0%)
                    </strong>
                    <CProgress
                      className="progress-xs mt-2"
                      precision={1}
                      color="success"
                      value={0}
                    />
                  </CCol>
                </>
              )
            ) : (
              <>
                <CCol
                  md
                  sm="12"
                  className="mb-sm-2 mb-0"
                  onClick={() => handleOnChangeSales("Gross sales")}
                >
                  <div className="text-muted">Gross Sales</div>
                  <strong
                    style={{
                      color: salesFilter === "Gross sales" ? "#45a164" : "",
                    }}
                  >
                    +0 (0%)
                  </strong>
                  <CProgress
                    className="progress-xs mt-2"
                    precision={1}
                    color="success"
                    value={0}
                  />
                </CCol>
              </>
            )}
            {salesSummary.sales_graph_data !== undefined &&
            salesSummary.sales_graph_data !== null ? (
              salesSummary.sales_graph_data.SalesTotal !== undefined &&
              salesSummary.sales_graph_data.SalesTotal !== null ? (
                <>
                  <CCol
                    md
                    sm="12"
                    className="mb-sm-2 mb-0"
                    onClick={() => handleOnChangeSales("Refunds")}
                  >
                    <div className="text-muted">Refunds</div>
                    <strong
                      style={{
                        color: salesFilter === "Refunds" ? "#d16767" : "",
                      }}
                    >
                      +{refunds}(
                      {refunds === "0" || refunds === 0 ? 0 : refunds / 100} %)
                    </strong>
                    <CProgress
                      className="progress-xs mt-2"
                      precision={1}
                      color="success"
                      value={refunds}
                    />
                  </CCol>
                </>
              ) : (
                <>
                  <CCol
                    md
                    sm="12"
                    className="mb-sm-2 mb-0"
                    onClick={() => handleOnChangeSales("Refunds")}
                  >
                    <div className="text-muted">Refunds</div>
                    <strong
                      style={{
                        color: salesFilter === "Refunds" ? "#d16767" : "",
                      }}
                    >
                      +0 (0%)
                    </strong>
                    <CProgress
                      className="progress-xs mt-2"
                      precision={1}
                      color="success"
                      value={0}
                    />
                  </CCol>
                </>
              )
            ) : (
              <>
                <CCol
                  md
                  sm="12"
                  className="mb-sm-2 mb-0"
                  onClick={() => handleOnChangeSales("Refunds")}
                >
                  <div className="text-muted">Refunds</div>
                  <strong
                    style={{
                      color: salesFilter === "Refunds" ? "#d16767" : "",
                    }}
                  >
                    +0 (0%)
                  </strong>
                  <CProgress
                    className="progress-xs mt-2"
                    precision={1}
                    color="success"
                    value={0}
                  />
                </CCol>
              </>
            )}
            {/*
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0 d-md-down-none"
              onClick={() => handleOnChangeSales("Refunds")}
            >
              <div className="text-muted">Refunds</div>
              <strong
                style={{
                  color: salesFilter === "Refunds" ? "#d16767" : "",
                }}
              >
                +24.093 (20%)
              </strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="danger"
                value={40}
              />
            </CCol>
            */}
            {salesSummary.sales_graph_data !== undefined &&
            salesSummary.sales_graph_data !== null ? (
              salesSummary.sales_graph_data.SalesTotal !== undefined &&
              salesSummary.sales_graph_data.SalesTotal !== null ? (
                <>
                  <CCol
                    md
                    sm="12"
                    className="mb-sm-2 mb-0"
                    onClick={() => handleOnChangeSales("Discounts")}
                  >
                    <div className="text-muted">Discounts</div>
                    <strong
                      style={{
                        color: salesFilter === "Discounts" ? "#e1a82d" : "",
                      }}
                    >
                      +{discounts}(
                      {discounts === "0" || discounts === 0
                        ? 0
                        : discounts / 100}{" "}
                      %)
                    </strong>
                    <CProgress
                      className="progress-xs mt-2"
                      precision={1}
                      color="success"
                      value={discounts}
                    />
                  </CCol>
                </>
              ) : (
                <>
                  <CCol
                    md
                    sm="12"
                    className="mb-sm-2 mb-0"
                    onClick={() => handleOnChangeSales("Discounts")}
                  >
                    <div className="text-muted">Discounts</div>
                    <strong
                      style={{
                        color: salesFilter === "Discounts" ? "#e1a82d" : "",
                      }}
                    >
                      +0 (0%)
                    </strong>
                    <CProgress
                      className="progress-xs mt-2"
                      precision={1}
                      color="success"
                      value={0}
                    />
                  </CCol>
                </>
              )
            ) : (
              <>
                <CCol
                  md
                  sm="12"
                  className="mb-sm-2 mb-0"
                  onClick={() => handleOnChangeSales("Discounts")}
                >
                  <div className="text-muted">Discounts</div>
                  <strong
                    style={{
                      color: salesFilter === "Discounts" ? "#e1a82d" : "",
                    }}
                  >
                    +0 (0%)
                  </strong>
                  <CProgress
                    className="progress-xs mt-2"
                    precision={1}
                    color="success"
                    value={0}
                  />
                </CCol>
              </>
            )}
            {/*
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0"
              onClick={() => handleOnChangeSales("Discounts")}
            >
              <div className="text-muted">Discounts</div>
              <strong
                style={{
                  color: salesFilter === "Discounts" ? "#e1a82d" : "",
                }}
              >
                +78.706 (60%)
              </strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="warning"
                value={40}
              />
            </CCol>
            */}
            {salesSummary.sales_graph_data !== undefined &&
            salesSummary.sales_graph_data !== null ? (
              salesSummary.sales_graph_data.SalesTotal !== undefined &&
              salesSummary.sales_graph_data.SalesTotal !== null ? (
                <>
                  <CCol
                    md
                    sm="12"
                    className="mb-sm-2 mb-0"
                    onClick={() => handleOnChangeSales("Net Sales")}
                  >
                    <div className="text-muted">Net Sales</div>
                    <strong
                      style={{
                        color: salesFilter === "Net Sales" ? "#4799eb" : "",
                      }}
                    >
                      +{netSales}(
                      {netSales === "0" || netSales === 0 ? 0 : netSales / 100}{" "}
                      %)
                    </strong>
                    <CProgress
                      className="progress-xs mt-2"
                      precision={1}
                      color="success"
                      value={netSales}
                    />
                  </CCol>
                </>
              ) : (
                <>
                  <CCol
                    md
                    sm="12"
                    className="mb-sm-2 mb-0"
                    onClick={() => handleOnChangeSales("Net Sales")}
                  >
                    <div className="text-muted">Net Sales</div>
                    <strong
                      style={{
                        color: salesFilter === "Net Sales" ? "#4799eb" : "",
                      }}
                    >
                      +0 (0%)
                    </strong>
                    <CProgress
                      className="progress-xs mt-2"
                      precision={1}
                      color="success"
                      value={0}
                    />
                  </CCol>
                </>
              )
            ) : (
              <>
                <CCol
                  md
                  sm="12"
                  className="mb-sm-2 mb-0"
                  onClick={() => handleOnChangeSales("Net Sales")}
                >
                  <div className="text-muted">Net Sales</div>
                  <strong
                    style={{
                      color: salesFilter === "Net Sales" ? "#4799eb" : "",
                    }}
                  >
                    +0 (0%)
                  </strong>
                  <CProgress
                    className="progress-xs mt-2"
                    precision={1}
                    color="success"
                    value={0}
                  />
                </CCol>
              </>
            )}
            {/*
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0"
              onClick={() => handleOnChangeSales("Net Sales")}
            >
              <div className="text-muted">Net Sales</div>
              <strong
                style={{
                  color: salesFilter === "Net Sales" ? "#4799eb" : "",
                }}
              >
                +22.123 (80%)
              </strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={40}
              />
            </CCol>
            */}
            {salesSummary.sales_graph_data !== undefined &&
            salesSummary.sales_graph_data !== null ? (
              salesSummary.sales_graph_data.SalesTotal !== undefined &&
              salesSummary.sales_graph_data.SalesTotal !== null ? (
                <>
                  <CCol
                    md
                    sm="12"
                    className="mb-sm-2 mb-0 d-md-down-none"
                    onClick={() => handleOnChangeSales("Gross profit")}
                  >
                    <div className="text-muted">Gross Profit</div>
                    <strong
                      style={{
                        color: salesFilter === "Gross profit" ? "#4638c2" : "",
                      }}
                    >
                      +{grossProfit}(
                      {grossProfit === "0" || grossProfit === 0
                        ? 0
                        : grossProfit / 100}{" "}
                      %)
                    </strong>
                    <CProgress
                      className="progress-xs mt-2"
                      precision={1}
                      color="success"
                      value={grossProfit}
                    />
                  </CCol>
                </>
              ) : (
                <>
                  <CCol
                    md
                    sm="12"
                    className="mb-sm-2 mb-0 d-md-down-none"
                    onClick={() => handleOnChangeSales("Gross profit")}
                  >
                    <div className="text-muted">Gross Profit</div>
                    <strong
                      style={{
                        color: salesFilter === "Gross profit" ? "#4638c2" : "",
                      }}
                    >
                      +0 (0%)
                    </strong>
                    <CProgress
                      className="progress-xs mt-2"
                      precision={1}
                      color="success"
                      value={0}
                    />
                  </CCol>
                </>
              )
            ) : (
              <>
                <CCol
                  md
                  sm="12"
                  className="mb-sm-2 mb-0 d-md-down-none"
                  onClick={() => handleOnChangeSales("Gross profit")}
                >
                  <div className="text-muted">Gross Profit</div>
                  <strong
                    style={{
                      color: salesFilter === "Gross profit" ? "#4638c2" : "",
                    }}
                  >
                    +0 (0%)
                  </strong>
                  <CProgress
                    className="progress-xs mt-2"
                    precision={1}
                    color="success"
                    value={0}
                  />
                </CCol>
              </>
            )}
            {/*
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0 d-md-down-none"
              onClick={() => handleOnChangeSales("Gross profit")}
            >
              <div className="text-muted">Gross Profit</div>
              <strong
                style={{
                  color: salesFilter === "Gross profit" ? "#4638c2" : "",
                }}
              >
                +970 (40.15%)
              </strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                value={40}
              />
            </CCol>
            */}
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                {salesFilter}
              </h4>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
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
              labels={Days}
              style={{ height: "300px", marginTop: "40px" }}
            />
          ) : (
            "Loading..."
          )}
        </CCardBody>
      </CCard>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs="12" sm="4" md="4" xl="xl" className="mb-3 mb-xl-0">
                  <CButton color="success" className="btn-square pull right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="c-icon c-icon-sm"
                      role="img"
                    >
                      <polygon
                        fill="var(--ci-primary-color, currentColor)"
                        points="440 240 272 240 272 72 240 72 240 240 72 240 72 272 240 272 240 440 272 440 272 272 440 272 440 240"
                        className="ci-primary"
                      ></polygon>
                    </svg>
                    Export
                  </CButton>
                  {typeof salesSummary !== "undefined" ? (
                    salesSummary.sales_summary.filter(
                      (item) => item.isDeleted === true
                    ).length > 0 ? (
                      <React.Fragment>
                        <ConformationAlert
                          button_text="Delete"
                          heading="Delete Sales"
                          section={`Are you sure you want to delete the Sales Summary?`}
                          buttonAction={deleteSalesSummary}
                          show_alert={showAlert}
                          hideAlert={setShowAlert}
                          variant="outline"
                          className="ml-2 btn-square"
                          color="danger"
                          block={false}
                        />
                      </React.Fragment>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <SalesSummaryDatatable
                sales_summary={
                  typeof salesSummary !== "undefined"
                    ? salesSummary.sales_summary
                    : []
                }
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
