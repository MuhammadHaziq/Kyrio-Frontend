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
import { get_sales_summary, delete_sales_summary } from '../../actions/dashboard/salesSummaryActions'
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import SalesSummaryDatatable from '../../datatables/sales/SalesSummaryDatatable'
import ConformationAlert from "../../components/conformationAlert/ConformationAlert";

const Dashboard = () => {
  const dispatch = useDispatch();
  const filterComponent = useSelector(
    (state) => state.dashBoard.filterComponentReducer
  );
  const salesSummary = useSelector((state) => state.dashBoard.salesSummaryReducer)

  const [Days, setDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [filter, setFilter] = useState("");
  const [salesFilter, setSalesFilter] = useState("Gross Sales");
  const [daysFilter, setDaysFilter] = useState([
    { days: 0, name: "Hours", disable: true },
    { days: 1, name: "Days", disable: true },
    { days: 6, name: "Weeks", disable: true },
    { days: 28, name: "Months", disable: true },
    { days: 120, name: "Quaters", disable: true },
    { days: 362, name: "Years", disable: true },
  ]);
  const usePrevious = (data) => {
    const ref = React.useRef();
    useEffect(() => {
      ref.current = data;
    }, [data]);
    return ref.current;
  };

  const getNatural = (num) => {
    return parseFloat(num.toString().split(".")[0]);
  };

  const days = (from, to) => {
    var d = from,
      a = [],
      i = 0;

    const daysDiff = moment.duration(moment(to).diff(moment(from))).asDays();
    var time = moment(to).toDate(); // This will return a copy of the Date that the moment uses
    time.setHours(0);
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    const monthDiff = moment.duration(moment(to).diff(moment(from))).asMonths();
    const diff = getNatural(monthDiff) === 0 ? 1 : getNatural(monthDiff);
    if (getNatural(daysDiff) > 0) {
      const dateGape =
        daysDiff >= 60 ? daysDiff / getNatural(monthDiff) : daysDiff;
      while (i < getNatural(dateGape)) {
        a.push(dateformat(d, "mmm dd"));
        d = moment(d, "DD-MM-YYYY").add(diff, "days");
        i++;
      }
      if (i === getNatural(daysDiff)) {
        // include last day
        a.push(dateformat(d, "mmm dd"));
      }
      setFilter("Days");
    } else if (getNatural(daysDiff) === 0) {
      const totalHours = 24;
      var i = 1;
      while (i <= totalHours) {
        a.push(moment(time).format("LT"));
        time = moment(time).add(1, "hours").format("YYYY-MM-DD HH:mm:ss");
        i++;
      }
      setFilter("Hours");
    }
    setDays(a);
  };

  const days_filter = (from, to, filterName) => {
    var d = from,
      a = [],
      i = 0;

    const daysDiff = moment.duration(moment(to).diff(moment(from))).asDays();
    var time = moment(to).toDate(); // This will return a copy of the Date that the moment uses
    time.setHours(0);
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    const monthDiff = moment.duration(moment(to).diff(moment(from))).asMonths();
    const diff = getNatural(monthDiff) === 0 ? 1 : getNatural(monthDiff);
    if (getNatural(daysDiff) > 0 && filterName === "Days") {
      const dateGape =
        daysDiff >= 60 ? daysDiff / getNatural(monthDiff) : daysDiff;
      while (i < getNatural(dateGape)) {
        a.push(dateformat(d, "mmm dd"));
        d = moment(d, "DD-MM-YYYY").add(diff, "days");
        i++;
      }
      if (i === getNatural(daysDiff)) {
        // include last day
        a.push(dateformat(d, "mmm dd"));
      }
      setFilter("Days");
    }
    // else if (getNatural(daysDiff) > 0 && filterName === "Weeks") {
    //   const diff = getNatural(monthDiff) === 0 ? 7 : getNatural(monthDiff);
    //   const dateGape =
    //     daysDiff >= 60 ? daysDiff / getNatural(monthDiff) : daysDiff;
    //   while (i < getNatural(dateGape)) {
    //     a.push(dateformat(d, "mmm dd"));
    //     d = moment(d, "DD-MM-YYYY").add(diff, "days");
    //     i++;
    //   }
    //   if (i === getNatural(daysDiff)) {
    //     // include last day
    //     a.push(dateformat(d, "mmm dd"));
    //   }
    // }
    else if (getNatural(daysDiff) === 0) {
      const totalHours = 24;
      var i = 1;
      while (i <= totalHours) {
        a.push(moment(time).format("LT"));
        time = moment(time).add(1, "hours").format("YYYY-MM-DD HH:mm:ss");
        i++;
      }
      setFilter("Hours");
    }
    setDays(a);
  };

  // Sales by Day full month
  const [sales, setSales] = useState({});
  var prevDateRange = usePrevious(filterComponent.filterDate);
  var prevDays = usePrevious(Days);
  var prevFilter = usePrevious(filter);


  useEffect(() => {
    dispatch(get_sales_summary())
    return () => {
      setDays([]);
      setLoading(false);
      setFilter("");
      setSalesFilter("Gross Sales");
      dispatch(unmount_filter());
    };
  }, []);

  useEffect(() => {
    if (prevDays !== Days && prevDays !== undefined) {
      setSales({
        grossSales: {
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
          data2: [
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
          data3: [
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
          data4: [
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
          data5: [
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
          labels: Days,
        },
      });
    }
  }, [prevDays, Days]);

  useEffect(() => {
    if (prevFilter !== filter && prevFilter !== undefined) {
      console.log("filter", filter);
      console.log("prevFilter", prevFilter);
    }
  }, [prevFilter, filter]);

  useEffect(() => {
    if (sales.grossSales) {
      setLoading(true);
    }
  }, [sales.grossSales]);

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
  }, [filterComponent.filterDate, prevDateRange]);

  const changeFilter = (v) => {
    setFilter(v);
    // if (v === "Hours") {
    //   setFilter("Hours");
    // } else if (v === "Days") {
    //   setFilter("Days");
    //   setLoading(false);
    //   var today = new Date();
    //   let last30days = [];
    //   for (let i = 0; i < 30; i++) {
    //     let date = dateformat(
    //       new Date(new Date().setDate(today.getDate() - i)),
    //       "mmm dd"
    //     );
    //     last30days.push(date);
    //   }
    //   setDays(last30days);
    //   setSales({
    //     grossSales: {
    //       data: [
    //         1,
    //         2,
    //         3,
    //         4,
    //         5,
    //         62,
    //         21,
    //         142,
    //         43,
    //         1,
    //         123,
    //         123,
    //         123,
    //         14,
    //         213,
    //         3,
    //         421,
    //         123,
    //         124,
    //         123,
    //         123,
    //         412,
    //         2312,
    //         1412,
    //         132,
    //         24,
    //         3435,
    //         23,
    //         12433,
    //         123,
    //         53,
    //       ],
    //       data2: [
    //         3453,
    //         344,
    //         3,
    //         6757,
    //         5,
    //         62,
    //         21,
    //         142,
    //         43,
    //         1,
    //         123,
    //         123,
    //         23,
    //         14,
    //         4545,
    //         3,
    //         131,
    //         643,
    //         124,
    //         123,
    //         12351,
    //         843,
    //         786,
    //         1412,
    //         132,
    //         24,
    //         511,
    //         23,
    //         9867,
    //         123,
    //         42,
    //       ],
    //       data3: [
    //         5000,
    //         32,
    //         3141,
    //         57,
    //         55,
    //         6241,
    //         4123,
    //         0,
    //         85,
    //         1,
    //         767,
    //         3453,
    //         23,
    //         341,
    //         4545,
    //         453,
    //         2234,
    //         453,
    //         9866,
    //         876,
    //         542,
    //         24,
    //         23,
    //         14243,
    //         2435,
    //         3454,
    //         764,
    //         456,
    //         4,
    //         234,
    //         87,
    //       ],
    //       data4: [
    //         12312,
    //         344,
    //         3,
    //         67,
    //         5213,
    //         5223,
    //         211,
    //         200,
    //         67,
    //         34,
    //         12563,
    //         634,
    //         23,
    //         598,
    //         235,
    //         0,
    //         4223,
    //         3456,
    //         123,
    //         345,
    //         875,
    //         56,
    //         45,
    //         2356,
    //         234,
    //         634,
    //         4562,
    //         4563,
    //         0,
    //         653,
    //         234,
    //       ],
    //       data5: [
    //         2342,
    //         344,
    //         3,
    //         757,
    //         534,
    //         4242,
    //         2126,
    //         0,
    //         5844,
    //         56,
    //         12433,
    //         1223,
    //         23,
    //         675,
    //         7674,
    //         234,
    //         2368,
    //         2346,
    //         345,
    //         123,
    //         3466,
    //         45,
    //         56,
    //         23624,
    //         345,
    //         234,
    //         2432,
    //         4325,
    //         234,
    //         546,
    //         345,
    //       ],
    //       labels: Days,
    //     },
    //   });
    //   setLoading(true);
    // }
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
    console.log(sales_id)
    dispatch(delete_sales_summary(JSON.stringify(sales_id)));
    setShowAlert(!showAlert);
  };


  console.log(filter);

  return (
    <>
      <FilterComponent />

      <CCard>
        <CCardHeader>
          <CRow className="text-center">
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0"
              onClick={() => handleOnChangeSales("Gross Sales")}
            >
              <div className="text-muted">Gross Sales</div>
              <strong>+29.703 (40%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={40}
              />
            </CCol>
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0 d-md-down-none"
              onClick={() => handleOnChangeSales("Refunds")}
            >
              <div className="text-muted">Refunds</div>
              <strong>+24.093 (20%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="danger"
                value={40}
              />
            </CCol>
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0"
              onClick={() => handleOnChangeSales("Discount")}
            >
              <div className="text-muted">Discounts</div>
              <strong>+78.706 (60%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="warning"
                value={40}
              />
            </CCol>
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0"
              onClick={() => handleOnChangeSales("Net Sales")}
            >
              <div className="text-muted">Net Sales</div>
              <strong>+22.123 (80%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={40}
              />
            </CCol>
            <CCol
              md
              sm="12"
              className="mb-sm-2 mb-0 d-md-down-none"
              onClick={() => handleOnChangeSales("Gross Profit")}
            >
              <div className="text-muted">Gross Profit</div>
              <strong>+970 (40.15%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                value={40}
              />
            </CCol>
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
                <CCol
                  xs="12"
                  sm="4"
                  md="4"
                  xl="xl"
                  className="mb-3 mb-xl-0"
                >
                  <CButton
                    color="success"
                    className="btn-square pull right"
                  >
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
                  {salesSummary.sales_summary.filter(
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
                    )}
                </CCol></CRow>
            </CCardHeader>
            <CCardBody>
              <SalesSummaryDatatable sales_summary={salesSummary.sales_summary} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
